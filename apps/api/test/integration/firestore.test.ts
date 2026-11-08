import { readFileSync } from "node:fs";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { initializeTestEnvironment, type RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { firestore } from "../../src/shared/infrastructure/firebase.ts";

const PROJECT_ID = "demo-drivenet";
const [host = "127.0.0.1", port = "8081"] = (
  process.env["FIRESTORE_EMULATOR_HOST"] ?? "127.0.0.1:8081"
).split(":");

let env: RulesTestEnvironment;

beforeAll(async () => {
  process.env["GCLOUD_PROJECT"] = PROJECT_ID;
  env = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      host,
      port: Number(port),
      rules: readFileSync(new URL("../../../../firestore.rules", import.meta.url), "utf8"),
    },
  });
});

afterAll(async () => {
  await env.cleanup();
});

describe("Security Rules = deny-all (principle 4)", () => {
  it("denies reads and writes for anonymous and signed-in clients alike", async () => {
    const { assertFails } = await import("@firebase/rules-unit-testing");
    for (const ctx of [env.unauthenticatedContext(), env.authenticatedContext("user-1")]) {
      const db = ctx.firestore();
      await assertFails(db.doc("slots/a").get());
      await assertFails(db.doc("slots/a").set({ x: 1 }));
      await assertFails(db.collection("ledger").get());
    }
  });
});

describe("Admin SDK against the emulator (principles 6, 7)", () => {
  it("create-only documents give a unique constraint: the second create fails", async () => {
    const ref = firestore().doc("slots/instructor-1_2027-01-01_10");
    await ref.create({ applicationId: "app-1" });
    await expect(ref.create({ applicationId: "app-2" })).rejects.toMatchObject({ code: 6 }); // ALREADY_EXISTS
    expect((await ref.get()).data()).toEqual({ applicationId: "app-1" });
  });

  it("reads before writes inside one small transaction", async () => {
    const db = firestore();
    const ref = db.doc("counters/probe");
    await ref.set({ version: 1 });
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      tx.update(ref, { version: (snap.get("version") as number) + 1 });
    });
    expect((await ref.get()).get("version")).toBe(2);
  });
});
