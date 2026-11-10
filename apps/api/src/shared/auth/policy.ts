import { AppError } from "../errors.ts";
import type { PrincipalId, WorkspaceId } from "../domain/ids.ts";
import type { Principal } from "./principal.ts";

export interface AuthContext {
  readonly principal: Principal;
  /** Set only by `resolveContext`, i.e. after membership was verified on the server. */
  readonly workspaceId?: WorkspaceId;
}

export interface Resource {
  readonly type: string;
  readonly workspaceId?: WorkspaceId;
  readonly ownerId?: PrincipalId;
}

export type Rule = (ctx: AuthContext, resource: Resource) => boolean;
export type PolicyTable<A extends string> = Readonly<Record<A, Rule>>;

/**
 * The single permission function: can(principal, action, resource) (principle 2, M1).
 * Two invariants hold no matter what a rule says: default-deny, and tenant isolation —
 * a resource of workspace X is never reachable from a context that is not verified for workspace X.
 */
export function can<A extends string>(
  table: PolicyTable<A>,
  ctx: AuthContext,
  action: A,
  resource: Resource,
): boolean {
  if (resource.workspaceId !== undefined && resource.workspaceId !== ctx.workspaceId) return false;
  const rule = (table as Partial<Record<string, Rule>>)[action];
  return rule !== undefined && rule(ctx, resource);
}

/** 401 when nobody is signed in, 403 when a signed-in principal is not allowed. */
export function authorize<A extends string>(
  table: PolicyTable<A>,
  ctx: AuthContext,
  action: A,
  resource: Resource,
): void {
  if (can(table, ctx, action, resource)) return;
  if (ctx.principal.kind === "anonymous")
    throw new AppError("unauthenticated", "Authentication required");
  throw new AppError("forbidden", "Not allowed");
}
