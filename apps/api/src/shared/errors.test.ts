import { describe, expect, it } from "vitest";
import { z, type ZodError } from "zod";
import { AppError, toProblem } from "./errors.ts";

describe("AppError → problem+json (principle 13)", () => {
  it("derives status and retryable from the code", () => {
    const p = toProblem(new AppError("slot_taken", "Slot is taken"), "trace-1");
    expect(p).toMatchObject({
      status: 409,
      code: "slot_taken",
      retryable: false,
      traceId: "trace-1",
    });
    expect(toProblem(new AppError("payment_unavailable", "x"), "t").retryable).toBe(true);
  });

  it("maps zod failures to validation_failed with per-field errors", () => {
    const result = z.object({ phone: z.string().min(9) }).safeParse({ phone: "1" });
    const err = result.error as ZodError;
    const p = toProblem(AppError.fromZod(err), "t");
    expect(p.status).toBe(400);
    expect(p.code).toBe("validation_failed");
    expect(p.errors?.[0]?.path).toBe("phone");
  });

  it("never leaks the message of an unexpected exception", () => {
    const p = toProblem(new Error("db password is hunter2"), "t");
    expect(p).toMatchObject({ status: 500, code: "internal_error" });
    expect(JSON.stringify(p)).not.toContain("hunter2");
  });
});
