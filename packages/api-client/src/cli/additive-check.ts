/* eslint-disable no-console */
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { findBreakingChanges, type OpenApiDoc } from "../additive.ts";

// CI gate "api diff": compare the contract on this branch with the base branch. Usage: API_BASE_REF=origin/main
const baseRef = process.env["API_BASE_REF"] ?? "origin/main";
const file = "packages/api-client/openapi/v1.yaml";
const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();

let baseText: string;
try {
  baseText = execFileSync("git", ["show", `${baseRef}:${file}`], {
    encoding: "utf8",
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
  });
} catch {
  console.log(
    `api diff: no ${file} on ${baseRef} yet (first version of the contract) — nothing to compare.`,
  );
  process.exit(0);
}

const problems = findBreakingChanges(
  parse(baseText) as OpenApiDoc,
  parse(readFileSync(`${root}/${file}`, "utf8")) as OpenApiDoc,
);
if (problems.length > 0) {
  console.error(
    `api diff: ${problems.length} non-additive change(s) vs ${baseRef}:\n - ${problems.join("\n - ")}`,
  );
  process.exit(1);
}
console.log(`api diff: contract is additive-only vs ${baseRef}.`);
