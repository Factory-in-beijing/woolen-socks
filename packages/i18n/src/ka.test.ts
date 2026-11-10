import { test } from "node:test";
import assert from "node:assert/strict";
import { ERROR_CODES } from "@drivenet/schemas";
import { en } from "./en.ts";
import { ka } from "./ka.ts";

const keys = (o: object, prefix = ""): string[] =>
  Object.entries(o).flatMap(([k, v]) =>
    typeof v === "string" ? [`${prefix}${k}`] : keys(v as object, `${prefix}${k}.`),
  );

test("every error code of the contract has an English message", () => {
  for (const code of ERROR_CODES) {
    assert.ok(en.errors[code] && en.errors[code].length > 0, `missing message for ${code}`);
  }
});

test("the Georgian translation has exactly the same keys as English", () => {
  assert.deepEqual(keys(ka).sort(), keys(en).sort());
});
