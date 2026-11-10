import { z } from "zod";

/**
 * One error model for every client (principle 13, BE base "Errors"):
 * AppError → problem+json {code, traceId, retryable}. Clients react to `code`, never to message text.
 */
export const ERROR_CODES = [
  "validation_failed",
  "unauthenticated",
  "forbidden",
  "not_found",
  "slot_taken",
  "hold_expired",
  "invalid_transition",
  // Not in the document's list: same Idempotency-Key reused with a different request, or still in flight.
  "idempotency_conflict",
  "version_mismatch",
  "rate_limited",
  "dependency_unavailable",
  "payment_unavailable",
  // Not in the document's list: a bug-only fallback so an unexpected exception still yields problem+json.
  "internal_error",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export const ERROR_STATUS: Readonly<Record<ErrorCode, number>> = {
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
  internal_error: 500,
};

/** The document marks only 503 dependency/payment outages as retryable; 429 is left false until decided. */
export const ERROR_RETRYABLE: Readonly<Record<ErrorCode, boolean>> = {
  validation_failed: false,
  unauthenticated: false,
  forbidden: false,
  not_found: false,
  slot_taken: false,
  hold_expired: false,
  invalid_transition: false,
  idempotency_conflict: false,
  version_mismatch: false,
  rate_limited: false,
  dependency_unavailable: true,
  payment_unavailable: true,
  internal_error: false,
};

export const ErrorCodeSchema = z.enum(ERROR_CODES);

export const FieldErrorSchema = z.object({
  path: z.string(),
  message: z.string(),
});

export const ProblemSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number().int(),
  code: ErrorCodeSchema,
  traceId: z.string().min(1),
  retryable: z.boolean(),
  detail: z.string().optional(),
  errors: z.array(FieldErrorSchema).optional(),
});

export type Problem = z.infer<typeof ProblemSchema>;
