import { describe, expect, it } from "vitest";
import type {
  IdempotencyScope,
  IdempotencyStore,
} from "../../src/shared/idempotency/idempotency.ts";
import { principalId } from "../../src/shared/domain/ids.ts";

let counter = 0;
const freshScope = (): IdempotencyScope => ({
  principalId: principalId("u1"),
  route: "POST /v1/x",
  key: `key-${Date.now()}-${counter++}`,
});

/** Behaviour every IdempotencyStore (in-memory and Firestore) must have. */
export function idempotencyStoreContract(name: string, create: () => IdempotencyStore): void {
  describe(`IdempotencyStore contract: ${name}`, () => {
    it("first begin starts; the same request while running is in_progress", async () => {
      const store = create();
      const scope = freshScope();
      expect(await store.begin(scope, "h1")).toEqual({ kind: "started" });
      expect(await store.begin(scope, "h1")).toEqual({ kind: "in_progress" });
    });

    it("a different payload under the same key is a mismatch", async () => {
      const store = create();
      const scope = freshScope();
      await store.begin(scope, "h1");
      expect(await store.begin(scope, "h2")).toEqual({ kind: "mismatch" });
    });

    it("after complete, the same request replays the stored outcome", async () => {
      const store = create();
      const scope = freshScope();
      await store.begin(scope, "h1");
      await store.complete(scope, {
        kind: "ok",
        status: 201,
        body: { id: "b-1", n: 1, nested: { a: [1, 2] } },
      });
      expect(await store.begin(scope, "h1")).toEqual({
        kind: "replay",
        outcome: { kind: "ok", status: 201, body: { id: "b-1", n: 1, nested: { a: [1, 2] } } },
      });
    });

    it("abandon lets the client retry with the same key", async () => {
      const store = create();
      const scope = freshScope();
      await store.begin(scope, "h1");
      await store.abandon(scope);
      expect(await store.begin(scope, "h1")).toEqual({ kind: "started" });
    });

    it("scopes are independent per principal, route and key", async () => {
      const store = create();
      const a = freshScope();
      await store.begin(a, "h1");
      expect(await store.begin({ ...a, principalId: principalId("u2") }, "h1")).toEqual({
        kind: "started",
      });
      expect(await store.begin({ ...a, route: "POST /v1/y" }, "h1")).toEqual({ kind: "started" });
    });

    it("exactly one of many concurrent begins wins (create-only)", async () => {
      const store = create();
      const scope = freshScope();
      const results = await Promise.all(Array.from({ length: 20 }, () => store.begin(scope, "h1")));
      expect(results.filter((r) => r.kind === "started")).toHaveLength(1);
      expect(results.filter((r) => r.kind === "in_progress")).toHaveLength(19);
    });
  });
}
