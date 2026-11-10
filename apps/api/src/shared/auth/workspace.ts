import { AppError } from "../errors.ts";
import { workspaceId, type PrincipalId, type WorkspaceId } from "../domain/ids.ts";
import type { AuthContext } from "./policy.ts";
import type { Principal } from "./principal.ts";

/** Port implemented by M1 (memberships collection). The client names a workspace; the server decides whether it may use it. */
export interface MembershipReader {
  isMember(principal: PrincipalId, workspace: WorkspaceId): Promise<boolean>;
}

/** Builds the AuthContext for a request from `X-Workspace-Id`. Never takes a workspace from a request body (invariant). */
export async function resolveContext(
  memberships: MembershipReader,
  principal: Principal,
  headerValue: string | undefined,
): Promise<AuthContext> {
  if (headerValue === undefined || headerValue === "") return { principal };
  if (principal.kind === "anonymous")
    throw new AppError("unauthenticated", "Authentication required");
  const id = workspaceId(headerValue);
  if (!(await memberships.isMember(principal.id, id)))
    throw new AppError("forbidden", "Not allowed");
  return { principal, workspaceId: id };
}

/** Placeholder until M1 ships memberships: nobody is a member of anything, so every workspace-scoped call is 403. */
export const denyAllMemberships: MembershipReader = { isMember: async () => false };
