import { toApiError, type ApiError } from "./errors.ts";

/** Every screen is exactly one of these. An impossible UI state is a compile error (principle 19, FE base). */
export type ScreenState<T> =
  | { readonly status: "loading" }
  | { readonly status: "empty" }
  | { readonly status: "error"; readonly error: ApiError }
  | { readonly status: "ready"; readonly data: T };

/** The slice of a TanStack Query result we read, so this works for useQuery and the openapi-react-query hooks. */
export interface QueryLike<T> {
  isPending: boolean;
  isError: boolean;
  error: unknown;
  data: T | undefined;
}

export function toScreenState<T>(
  query: QueryLike<T>,
  isEmpty: (data: T) => boolean,
): ScreenState<T> {
  if (query.isError) return { status: "error", error: toApiError(query.error) };
  if (query.isPending || query.data === undefined) return { status: "loading" };
  return isEmpty(query.data) ? { status: "empty" } : { status: "ready", data: query.data };
}
