import { describe, expect, it } from "vitest";
import { Writable } from "node:stream";
import { buildApp } from "./app.ts";
import { fixedClock } from "./shared/clock.ts";
import { createLogger } from "./shared/logger.ts";
import { AppError } from "./shared/errors.ts";

const silent = () => createLogger({ level: "silent" });

describe("HTTP skeleton", () => {
  it("serves /v1/health with a trace id header", async () => {
    const app = buildApp({ clock: fixedClock("2026-11-08T17:00:00Z"), logger: silent() });
    const res = await app.inject({ method: "GET", url: "/v1/health" });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: "ok" });
    expect(res.headers["x-trace-id"]).toBeTruthy();
  });

  it("echoes a well-formed incoming trace id and replaces a malformed one", async () => {
    const app = buildApp({ clock: fixedClock("2026-11-08T17:00:00Z"), logger: silent() });
    const good = await app.inject({
      method: "GET",
      url: "/v1/health",
      headers: { "x-trace-id": "abc12345-trace" },
    });
    expect(good.headers["x-trace-id"]).toBe("abc12345-trace");
    const bad = await app.inject({
      method: "GET",
      url: "/v1/health",
      headers: { "x-trace-id": "a b\nc<script>" },
    });
    expect(bad.headers["x-trace-id"]).not.toContain("script");
  });

  it("answers unknown routes with problem+json not_found and a traceId", async () => {
    const app = buildApp({ clock: fixedClock("2026-11-08T17:00:00Z"), logger: silent() });
    const res = await app.inject({ method: "GET", url: "/v1/nope" });
    expect(res.statusCode).toBe(404);
    expect(res.headers["content-type"]).toContain("application/problem+json");
    expect(res.json()).toMatchObject({
      code: "not_found",
      retryable: false,
      traceId: res.headers["x-trace-id"],
    });
  });

  it("maps AppError thrown in a handler to its problem document", async () => {
    const app = buildApp({ clock: fixedClock("2026-11-08T17:00:00Z"), logger: silent() });
    app.get("/v1/_test/taken", async () => {
      throw new AppError("slot_taken", "Slot is taken");
    });
    const res = await app.inject({ method: "GET", url: "/v1/_test/taken" });
    expect(res.statusCode).toBe(409);
    expect(res.json()).toMatchObject({ code: "slot_taken" });
  });

  it("turns malformed JSON into validation_failed, and bugs into internal_error without leaking", async () => {
    const app = buildApp({ clock: fixedClock("2026-11-08T17:00:00Z"), logger: silent() });
    app.post("/v1/_test/echo", async (req) => req.body);
    app.get("/v1/_test/boom", async () => {
      throw new Error("secret stack detail");
    });
    const bad = await app.inject({
      method: "POST",
      url: "/v1/_test/echo",
      headers: { "content-type": "application/json" },
      payload: "{oops",
    });
    expect(bad.statusCode).toBe(400);
    expect(bad.json().code).toBe("validation_failed");
    const boom = await app.inject({ method: "GET", url: "/v1/_test/boom" });
    expect(boom.statusCode).toBe(500);
    expect(boom.body).not.toContain("secret stack detail");
  });
});

describe("logging (principle 15, 23)", () => {
  it("writes structured logs with traceId and redacts credentials/PII", async () => {
    const lines: string[] = [];
    const sink = new Writable({
      write(chunk, _enc, cb) {
        lines.push(String(chunk));
        cb();
      },
    });
    const logger = createLogger({ level: "info", destination: sink });
    const app = buildApp({ clock: fixedClock("2026-11-08T17:00:00Z"), logger });
    app.get("/v1/_test/log", async (req) => {
      req.log.info(
        { phone: "+995555123456", code: "123456", authorization: "Bearer xyz", token: "t0k" },
        "login attempt",
      );
      return { ok: true };
    });
    const res = await app.inject({
      method: "GET",
      url: "/v1/_test/log",
      headers: { authorization: "Bearer super-secret" },
    });
    const out = lines.join("");
    expect(out).toContain(String(res.headers["x-trace-id"]));
    for (const secret of ["+995555123456", "123456", "xyz", "t0k", "super-secret"]) {
      expect(out).not.toContain(secret);
    }
  });
});
