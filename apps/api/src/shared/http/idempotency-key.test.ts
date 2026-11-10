import Fastify from "fastify";
import { describe, expect, it } from "vitest";
import type { AppError } from "../errors.ts";
import { readIdempotencyKey } from "./idempotency-key.ts";

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
