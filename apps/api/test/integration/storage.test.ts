import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, it } from "vitest";
import {
  assertFails,
  initializeTestEnvironment,
  type RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { ref, uploadString, getBytes } from "firebase/storage";

const [host = "127.0.0.1", port = "9199"] = (
  process.env["FIREBASE_STORAGE_EMULATOR_HOST"] ?? "127.0.0.1:9199"
).split(":");
let env: RulesTestEnvironment;

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: "demo-drivenet",
    storage: {
      host,
      port: Number(port),
      rules: readFileSync(new URL("../../../../storage.rules", import.meta.url), "utf8"),
    },
  });
});

afterAll(async () => {
  await env.cleanup();
});

describe("Storage rules = deny-all (files only via signed URLs, principle 15)", () => {
  it("denies upload and download for anonymous and signed-in clients", async () => {
    for (const ctx of [env.unauthenticatedContext(), env.authenticatedContext("user-1")]) {
      const storage = ctx.storage();
      await assertFails(uploadString(ref(storage, "documents/a.txt"), "hello"));
      await assertFails(getBytes(ref(storage, "documents/a.txt")));
    }
  });
});
