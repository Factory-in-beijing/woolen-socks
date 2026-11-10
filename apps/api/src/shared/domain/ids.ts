import { AppError } from "../errors.ts";

declare const brand: unique symbol;
/** Nominal typing: a `PrincipalId` can never be passed where a `WorkspaceId` is expected (principle 19). */
export type Brand<T, B extends string> = T & { readonly [brand]: B };

export type PrincipalId = Brand<string, "PrincipalId">;
export type WorkspaceId = Brand<string, "WorkspaceId">;

const ID_PATTERN = /^[^/\s]{1,128}$/;

/** Ids end up inside Firestore document paths, so `/` and whitespace are rejected at the boundary. */
export function parseId(value: string): string {
  if (!ID_PATTERN.test(value)) throw new AppError("validation_failed", "Invalid identifier");
  return value;
}

export const principalId = (value: string): PrincipalId => parseId(value) as PrincipalId;
export const workspaceId = (value: string): WorkspaceId => parseId(value) as WorkspaceId;
