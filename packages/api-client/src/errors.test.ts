import { describe, expect, it } from "vitest";
import { ERROR_CODES } from "@drivenet/schemas";
import { ApiError, behaviorFor, toApiError } from "./errors.ts";

const problem = (code: string, extra: object = {}) => ({
  type: "about:blank",
  title: "t",
  status: 409,
  code,
  traceId: "trace-123",
  retryable: false,
  ...extra,
});

describe("client error handling (principle 13: every client reacts to `code`)", () => {
  it("has a defined behaviour for every error code (compile-time and runtime)", () => {
    for (const code of ERROR_CODES) {
      expect(behaviorFor(code).kind).toBeTruthy();
    }
  });

  it("maps the documented codes to the documented behaviour", () => {
    expect(behaviorFor("slot_taken").kind).toBe("offer_alternatives");
    expect(behaviorFor("hold_expired").kind).toBe("restart_selection");
    expect(behaviorFor("unauthenticated").kind).toBe("sign_in");
    expect(behaviorFor("dependency_unavailable").kind).toBe("retry");
    expect(behaviorFor("payment_unavailable").kind).toBe("retry");
  });

  it("normalises a problem+json body into an ApiError carrying traceId and retryable", () => {
    const err = toApiError(problem("slot_taken"));
    expect(err).toBeInstanceOf(ApiError);
    expect(err.problem).toMatchObject({
      code: "slot_taken",
      traceId: "trace-123",
      retryable: false,
    });
  });

  it("turns a network failure into a retryable dependency_unavailable", () => {
    const err = toApiError(new TypeError("fetch failed"));
    expect(err.problem).toMatchObject({ code: "dependency_unavailable", retryable: true });
  });

  it("turns anything unrecognised into internal_error (never throws, never shows raw data)", () => {
    expect(toApiError({ weird: true }).problem.code).toBe("internal_error");
    expect(toApiError(undefined).problem.code).toBe("internal_error");
  });

  it("passes an existing ApiError through unchanged", () => {
    const original = toApiError(problem("forbidden"));
    expect(toApiError(original)).toBe(original);
  });
});
