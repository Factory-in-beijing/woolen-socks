import { describe, expect, it } from "vitest";
import { toApiError } from "./errors.ts";
import { applyServerFieldErrors } from "./forms.ts";

const validation = toApiError({
  type: "about:blank",
  title: "t",
  status: 400,
  code: "validation_failed",
  traceId: "trace-123",
  retryable: false,
  errors: [
    { path: "phone", message: "bad phone" },
    { path: "address.city", message: "required" },
    { path: "unknownField", message: "??" },
  ],
});

describe("server 400 → form fields (FE base: react-hook-form + zod, server validation binds to fields)", () => {
  it("sets errors on known fields and reports the rest", () => {
    const set: Array<[string, string]> = [];
    const rest = applyServerFieldErrors(
      (name: "phone" | "address.city", e) => void set.push([name, e.message]),
      validation,
      ["phone", "address.city"],
    );
    expect(set).toEqual([
      ["phone", "bad phone"],
      ["address.city", "required"],
    ]);
    expect(rest).toEqual([{ path: "unknownField", message: "??" }]);
  });

  it("does nothing for non-validation errors", () => {
    const other = toApiError({
      type: "x",
      title: "t",
      status: 409,
      code: "slot_taken",
      traceId: "t-1234",
      retryable: false,
    });
    expect(applyServerFieldErrors(() => undefined, other, [])).toEqual([]);
  });
});
