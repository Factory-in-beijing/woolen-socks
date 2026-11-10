import type { PrincipalId } from "../domain/ids.ts";

/**
 * Who is calling. `anonymous` is the guest: read-only by default; whether a guest may book is an open question (#1)
 * that will live in a policy rule/config, not here.
 */
export type Principal =
  { readonly kind: "anonymous" } | { readonly kind: "user"; readonly id: PrincipalId };

export const anonymous: Principal = { kind: "anonymous" };
export const userPrincipal = (id: PrincipalId): Principal => ({ kind: "user", id });
