import { describe, expect, it } from "vitest";
import { parseId, type PrincipalId, type WorkspaceId, principalId, workspaceId } from "./ids.ts";

describe("branded ids (principle 19)", () => {
  it("rejects empty or oversized ids", () => {
    expect(() => principalId("")).toThrow();
    expect(() => workspaceId("x".repeat(129))).toThrow();
    expect(principalId("u-1")).toBe("u-1");
  });
  it("rejects path separators so an id can never address another document path", () => {
    expect(() => parseId("a/b")).toThrow();
  });
  it("ids of different kinds are not interchangeable at compile time", () => {
    const p: PrincipalId = principalId("u-1");
    // @ts-expect-error a PrincipalId is not a WorkspaceId
    const w: WorkspaceId = p;
    expect(w).toBe("u-1");
  });
});
