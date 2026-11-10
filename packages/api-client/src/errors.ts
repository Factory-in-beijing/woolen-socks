import { type ErrorCode, type Problem } from "@drivenet/schemas";
import { parseProblem } from "./problem.ts";

export class ApiError extends Error {
  readonly problem: Problem;
  constructor(problem: Problem) {
    super(problem.code);
    this.name = "ApiError";
    this.problem = problem;
  }
}

/** What a screen should do for an error. Text comes from the i18n catalog (`ka.errors[code]`), never from the server. */
export type UiBehavior =
  | { readonly kind: "fix_fields" }
  | { readonly kind: "sign_in" }
  | { readonly kind: "forbidden" }
  | { readonly kind: "not_found" }
  | { readonly kind: "offer_alternatives" }
  | { readonly kind: "restart_selection" }
  | { readonly kind: "reload" }
  | { readonly kind: "check_status" }
  | { readonly kind: "slow_down" }
  | { readonly kind: "retry" }
  | { readonly kind: "contact_support" };

// A Record over ErrorCode: adding a code to the contract fails compilation here until a behaviour is chosen.
const BEHAVIOR: Readonly<Record<ErrorCode, UiBehavior>> = {
  validation_failed: { kind: "fix_fields" },
  unauthenticated: { kind: "sign_in" },
  forbidden: { kind: "forbidden" },
  not_found: { kind: "not_found" },
  slot_taken: { kind: "offer_alternatives" },
  hold_expired: { kind: "restart_selection" },
  invalid_transition: { kind: "reload" },
  idempotency_conflict: { kind: "check_status" },
  version_mismatch: { kind: "reload" },
  rate_limited: { kind: "slow_down" },
  dependency_unavailable: { kind: "retry" },
  payment_unavailable: { kind: "retry" },
  internal_error: { kind: "contact_support" },
};

export const behaviorFor = (code: ErrorCode): UiBehavior => BEHAVIOR[code];

/**
 * Normalises whatever a query/mutation threw into an ApiError: a problem+json body, a network failure
 * (retryable), or anything else (internal_error). Screens never inspect raw errors.
 */
export function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  const problem = parseProblem(error);
  if (problem) return new ApiError(problem);
  const network = error instanceof TypeError;
  return new ApiError({
    type: "about:blank",
    title: network ? "Network error" : "Unexpected error",
    status: network ? 503 : 500,
    code: network ? "dependency_unavailable" : "internal_error",
    traceId: "client",
    retryable: network,
  });
}
