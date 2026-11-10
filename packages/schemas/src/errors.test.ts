import { describe, expect, it } from "vitest";
import { ERROR_CODES, ERROR_RETRYABLE, ERROR_STATUS, ProblemSchema } from "./errors.ts";

describe("error model (principle 13)", () => {
  it("defines HTTP status and retryability for every code", () => {
    for (const code of ERROR_CODES) {
      expect(ERROR_STATUS[code]).toBeGreaterThanOrEqual(400);
      expect(typeof ERROR_RETRYABLE[code]).toBe("boolean");
    }
  });

  it("matches the statuses fixed by the architecture document", () => {
    expect(ERROR_STATUS).toMatchObject({
      validation_failed: 400,
      unauthenticated: 401,
      forbidden: 403,
      not_found: 404,
      slot_taken: 409,
      hold_expired: 409,
      invalid_transition: 409,
      idempotency_conflict: 409,
      version_mismatch: 412,
      rate_limited: 429,
      dependency_unavailable: 503,
      payment_unavailable: 503,
    });
  });

  it("marks only dependency/payment outages as retryable", () => {
    const retryable = ERROR_CODES.filter((c) => ERROR_RETRYABLE[c]);
    expect(retryable.sort()).toEqual(["dependency_unavailable", "payment_unavailable"]);
  });

  it("requires code, traceId and retryable in a problem document", () => {
    const ok = ProblemSchema.safeParse({
      type: "about:blank",
      title: "Not found",
      status: 404,
      code: "not_found",
      traceId: "t-1",
      retryable: false,
    });
    expect(ok.success).toBe(true);
    expect(ProblemSchema.safeParse({ status: 404, code: "not_found" }).success).toBe(false);
    expect(
      ProblemSchema.safeParse({
        ...{ type: "x", title: "x", status: 404, traceId: "t", retryable: false },
        code: "nope",
      }).success,
    ).toBe(false);
  });
});
