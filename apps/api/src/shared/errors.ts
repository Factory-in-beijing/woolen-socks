import type { ZodError } from "zod";
import { ERROR_RETRYABLE, ERROR_STATUS, type ErrorCode, type Problem } from "@drivenet/schemas";

type FieldError = { path: string; message: string };

/**
 * The only error type use cases throw on purpose (principle 13).
 * `message` is shown to clients as `detail`, so it must be safe to expose; user-facing text comes from the i18n catalog by `code`.
 * Expected failures (slot_taken, hold_expired, ...) are AppErrors; any other exception is a bug.
 */
export class AppError extends Error {
  readonly code: ErrorCode;
  readonly fieldErrors: readonly FieldError[] | undefined;

  constructor(
    code: ErrorCode,
    message: string,
    options?: { fieldErrors?: readonly FieldError[]; cause?: unknown },
  ) {
    super(message, options?.cause === undefined ? undefined : { cause: options.cause });
    this.name = "AppError";
    this.code = code;
    this.fieldErrors = options?.fieldErrors;
  }

  static fromZod(error: ZodError): AppError {
    return new AppError("validation_failed", "Request validation failed", {
      fieldErrors: error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
    });
  }
}

const TITLES: Readonly<Record<ErrorCode, string>> = {
  validation_failed: "Validation failed",
  unauthenticated: "Unauthenticated",
  forbidden: "Forbidden",
  not_found: "Not found",
  slot_taken: "Slot taken",
  hold_expired: "Hold expired",
  invalid_transition: "Invalid transition",
  version_mismatch: "Version mismatch",
  rate_limited: "Rate limited",
  dependency_unavailable: "Dependency unavailable",
  payment_unavailable: "Payment unavailable",
  internal_error: "Internal error",
};

/** Anything that is not an AppError is a bug: it becomes internal_error and its message is never sent to the client. */
export function toProblem(error: unknown, traceId: string): Problem {
  const app =
    error instanceof AppError ? error : new AppError("internal_error", "Unexpected error");
  const code = app.code;
  return {
    type: "about:blank",
    title: TITLES[code],
    status: ERROR_STATUS[code],
    code,
    traceId,
    retryable: ERROR_RETRYABLE[code],
    detail: app.message,
    ...(app.fieldErrors ? { errors: [...app.fieldErrors] } : {}),
  };
}
