import { describe, expect, it } from "vitest";
import { AppError } from "../errors.ts";
import { principalId, workspaceId } from "../domain/ids.ts";
import { anonymous, userPrincipal } from "./principal.ts";
import { authorize, can, type PolicyTable } from "./policy.ts";
import { resolveContext, type MembershipReader } from "./workspace.ts";

type Action = "lesson.read" | "lesson.cancel" | "admin.approve";

const u1 = userPrincipal(principalId("u1"));
const ws1 = workspaceId("ws1");
const ws2 = workspaceId("ws2");

const table: PolicyTable<Action> = {
  "lesson.read": () => true,
  "lesson.cancel": (ctx, r) => ctx.principal.kind === "user" && r.ownerId === ctx.principal.id,
  "admin.approve": () => false,
};

describe("can(principal, action, resource) — one place for permissions (principle 2)", () => {
  it("applies the rule for the action", () => {
    expect(
      can(table, { principal: u1, workspaceId: ws1 }, "lesson.cancel", {
        type: "lesson",
        workspaceId: ws1,
        ownerId: principalId("u1"),
      }),
    ).toBe(true);
    expect(
      can(table, { principal: u1, workspaceId: ws1 }, "lesson.cancel", {
        type: "lesson",
        workspaceId: ws1,
        ownerId: principalId("u2"),
      }),
    ).toBe(false);
  });

  it("denies by default: an action with no rule is forbidden", () => {
    expect(
      can({} as PolicyTable<Action>, { principal: u1 }, "lesson.read", { type: "lesson" }),
    ).toBe(false);
  });

  it("tenant isolation is an invariant: a rule that says yes cannot cross workspaces", () => {
    const allowAll: PolicyTable<Action> = {
      "lesson.read": () => true,
      "lesson.cancel": () => true,
      "admin.approve": () => true,
    };
    expect(
      can(allowAll, { principal: u1, workspaceId: ws1 }, "lesson.read", {
        type: "lesson",
        workspaceId: ws2,
      }),
    ).toBe(false);
    expect(
      can(allowAll, { principal: u1 }, "lesson.read", { type: "lesson", workspaceId: ws2 }),
    ).toBe(false);
  });

  it("authorize throws 401 for anonymous and 403 for a signed-in user who is denied", () => {
    const run = (p: typeof u1 | typeof anonymous) => () =>
      authorize(table, { principal: p }, "admin.approve", { type: "application" });
    expect(run(anonymous)).toThrowError(expect.objectContaining({ code: "unauthenticated" }));
    expect(run(u1)).toThrowError(expect.objectContaining({ code: "forbidden" }));
  });
});

describe("workspace resolution (X-Workspace-Id is verified, never trusted)", () => {
  const memberships: MembershipReader = {
    isMember: async (p, w) => p === "u1" && w === "ws1",
  };

  it("returns a context without a workspace when no header is sent", async () => {
    expect(await resolveContext(memberships, u1, undefined)).toEqual({ principal: u1 });
  });
  it("accepts a workspace the principal belongs to", async () => {
    expect(await resolveContext(memberships, u1, "ws1")).toEqual({
      principal: u1,
      workspaceId: ws1,
    });
  });
  it("rejects a workspace the principal does not belong to with 403", async () => {
    await expect(resolveContext(memberships, u1, "ws2")).rejects.toMatchObject({
      code: "forbidden",
    });
  });
  it("rejects anonymous callers with 401 and malformed ids with 400", async () => {
    await expect(resolveContext(memberships, anonymous, "ws1")).rejects.toMatchObject({
      code: "unauthenticated",
    });
    await expect(resolveContext(memberships, u1, "a/b")).rejects.toBeInstanceOf(AppError);
  });
});
