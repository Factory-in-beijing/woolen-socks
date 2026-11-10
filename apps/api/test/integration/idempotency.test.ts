import { beforeAll, describe, expect, it } from "vitest";
import { systemClock } from "../../src/shared/clock.ts";
import { fixedClock } from "../../src/shared/clock.ts";
import { principalId } from "../../src/shared/domain/ids.ts";
import { FirestoreIdempotencyStore } from "../../src/shared/infrastructure/firestore-idempotency-store.ts";
import { firestore } from "../../src/shared/infrastructure/firebase.ts";
import { idempotencyStoreContract } from "../support/idempotency-store-contract.ts";

beforeAll(() => {
  process.env["GCLOUD_PROJECT"] = "demo-drivenet";
});

idempotencyStoreContract(
  "firestore",
  () => new FirestoreIdempotencyStore(firestore(), systemClock, 60_000),
);

describe("FirestoreIdempotencyStore expiry", () => {
  it("treats an expired record as absent (TTL deletion can lag)", async () => {
    const clock = fixedClock("2027-01-01T00:00:00Z");
    const store = new FirestoreIdempotencyStore(firestore(), clock, 1_000);
    const scope = {
      principalId: principalId("u-exp"),
      route: "POST /v1/x",
      key: `expiry-${Date.now()}`,
    };
    expect(await store.begin(scope, "h1")).toEqual({ kind: "started" });
    expect(await store.begin(scope, "h1")).toEqual({ kind: "in_progress" });
    clock.advanceMs(2_000);
    expect(await store.begin(scope, "h2")).toEqual({ kind: "started" });
  });
});
