import Fastify from "fastify";
import { describe, expect, it } from "vitest";
import { idempotencyStoreContract } from "../../../test/support/idempotency-store-contract.ts";
import { AppError } from "../errors.ts";
import { principalId } from "../domain/ids.ts";
import {
  hashRequest,
  readIdempotencyKey,
  withIdempotency,
  type IdempotencyScope,
} from "./idempotency.ts";
import { InMemoryIdempotencyStore } from "./in-memory-store.ts";

idempotencyStoreContract("in-memory", () => new InMemoryIdempotencyStore());

const scope: IdempotencyScope = {
  principalId: principalId("u1"),
  route: "POST /v1/bookings",
  key: "key-12345678",
};

describe("withIdempotency (principle 6)", () => {
  it("double submit = one effect and the same response", async () => {
    const store = new InMemoryIdempotencyStore();
    let effects = 0;
    const run = async () => {
      effects += 1;
      return { status: 201, body: { bookingId: "b-1" } };
    };
    const first = await withIdempotency(store, scope, { slot: 1 }, run);
    const second = await withIdempotency(store, scope, { slot: 1 }, run);
    expect(effects).toBe(1);
    expect(second).toEqual(first);
  });

  it("key order in the body does not matter; a changed body is a conflict", async () => {
    expect(hashRequest({ a: 1, b: { c: 2, d: 3 } })).toBe(hashRequest({ b: { d: 3, c: 2 }, a: 1 }));
    const store = new InMemoryIdempotencyStore();
    await withIdempotency(store, scope, { slot: 1 }, async () => ({ status: 200, body: {} }));
    await expect(
      withIdempotency(store, scope, { slot: 2 }, async () => ({ status: 200, body: {} })),
    ).rejects.toMatchObject({
      code: "idempotency_conflict",
    });
  });

  it("a second request while the first is still running is a conflict, not a second effect", async () => {
    const store = new InMemoryIdempotencyStore();
    let release: () => void = () => undefined;
    const gate = new Promise<void>((r) => (release = r));
    let effects = 0;
    const slow = withIdempotency(store, scope, {}, async () => {
      effects += 1;
      await gate;
      return { status: 200, body: {} };
    });
    await expect(
      withIdempotency(store, scope, {}, async () => ({ status: 200, body: {} })),
    ).rejects.toMatchObject({
      code: "idempotency_conflict",
    });
    release();
    await slow;
    expect(effects).toBe(1);
  });

  it("expected business failures are replayed identically (slot_taken stays slot_taken)", async () => {
    const store = new InMemoryIdempotencyStore();
    let runs = 0;
    const run = async () => {
      runs += 1;
      throw new AppError("slot_taken", "Slot is taken");
    };
    await expect(withIdempotency(store, scope, {}, run)).rejects.toMatchObject({
      code: "slot_taken",
    });
    await expect(withIdempotency(store, scope, {}, run)).rejects.toMatchObject({
      code: "slot_taken",
    });
    expect(runs).toBe(1);
  });

  it("outages and bugs are not stored: the same key may be retried", async () => {
    const store = new InMemoryIdempotencyStore();
    let runs = 0;
    const flaky = async () => {
      runs += 1;
      if (runs === 1) throw new AppError("payment_unavailable", "Bank is down");
      if (runs === 2) throw new Error("bug");
      return { status: 200, body: { ok: true } };
    };
    await expect(withIdempotency(store, scope, {}, flaky)).rejects.toMatchObject({
      code: "payment_unavailable",
    });
    await expect(withIdempotency(store, scope, {}, flaky)).rejects.toThrow("bug");
    expect(await withIdempotency(store, scope, {}, flaky)).toEqual({
      status: 200,
      body: { ok: true },
    });
  });
});

describe("Idempotency-Key header", () => {
  const read = async (headers: Record<string, string>) => {
    const app = Fastify();
    app.post("/x", async (req) => ({ key: readIdempotencyKey(req) }));
    app.setErrorHandler((e, _r, reply) => reply.status(400).send({ code: (e as AppError).code }));
    return app.inject({ method: "POST", url: "/x", headers });
  };
  it("is required and must look like a key", async () => {
    expect((await read({ "idempotency-key": "abcdefgh-1234" })).json()).toEqual({
      key: "abcdefgh-1234",
    });
    for (const headers of [
      {},
      { "idempotency-key": "short" },
      { "idempotency-key": "has space in it!" },
    ]) {
      expect((await read(headers)).json()).toEqual({ code: "validation_failed" });
    }
  });
});
