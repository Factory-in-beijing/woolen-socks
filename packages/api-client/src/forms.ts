import type { ApiError } from "./errors.ts";

type FieldError = { path: string; message: string };

/**
 * Binds a server `validation_failed` response to form fields. `setError` is react-hook-form's, passed structurally so
 * this package does not depend on it. Returns the errors that match no known field (show them as a form-level message).
 */
export function applyServerFieldErrors<N extends string>(
  setError: (name: N, error: { type: "server"; message: string }) => void,
  error: ApiError,
  knownFields: readonly N[],
): FieldError[] {
  if (error.problem.code !== "validation_failed") return [];
  const unmatched: FieldError[] = [];
  for (const fe of error.problem.errors ?? []) {
    const field = knownFields.find((f) => f === fe.path);
    if (field === undefined) unmatched.push(fe);
    else setError(field, { type: "server", message: fe.message });
  }
  return unmatched;
}
