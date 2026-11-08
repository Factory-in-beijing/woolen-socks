import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parse } from "yaml";
import { ERROR_CODES } from "@drivenet/schemas";
import { createApiClient, newIdempotencyKey, parseProblem } from "./index.ts";

describe("contract consistency", () => {
  it("OpenAPI ErrorCode enum equals the schemas package error codes", () => {
    const doc = parse(readFileSync(new URL("../openapi/v1.yaml", import.meta.url), "utf8"));
    expect([...doc.components.schemas.ErrorCode.enum].sort()).toEqual([...ERROR_CODES].sort());
  });

  it("requires Idempotency-Key on every POST/PUT operation", () => {
    const doc = parse(readFileSync(new URL("../openapi/v1.yaml", import.meta.url), "utf8"));
    for (const [path, item] of Object.entries<Record<string, { parameters?: { $ref?: string }[] }>>(
      doc.paths,
    )) {
      for (const method of ["post", "put"]) {
        const op = item[method];
        if (op) {
          const refs = (op.parameters ?? []).map((p) => p.$ref);
          expect(refs, `${method.toUpperCase()} ${path}`).toContain(
            "#/components/parameters/IdempotencyKey",
          );
        }
      }
    }
  });
});

describe("api client", () => {
  it("adds Bearer token, workspace and trace id to every request", async () => {
    let seen: Request | undefined;
    const client = createApiClient({
      baseUrl: "https://api.test",
      getToken: async () => "tok-123",
      getWorkspaceId: () => "ws-1",
      fetch: async (req) => {
        seen = req;
        return Response.json({ status: "ok" });
      },
    });
    const { data } = await client.GET("/v1/health");
    expect(data).toEqual({ status: "ok" });
    expect(seen?.headers.get("authorization")).toBe("Bearer tok-123");
    expect(seen?.headers.get("x-workspace-id")).toBe("ws-1");
    expect(seen?.headers.get("x-trace-id")).toMatch(/^[\w-]{8,}$/);
  });

  it("omits Authorization when signed out", async () => {
    let seen: Request | undefined;
    const client = createApiClient({
      baseUrl: "https://api.test",
      getToken: async () => undefined,
      fetch: async (req) => {
        seen = req;
        return Response.json({ status: "ok" });
      },
    });
    await client.GET("/v1/health");
    expect(seen?.headers.has("authorization")).toBe(false);
  });

  it("parses problem+json and rejects anything else", () => {
    const problem = {
      type: "about:blank",
      title: "x",
      status: 409,
      code: "slot_taken",
      traceId: "t-1",
      retryable: false,
    };
    expect(parseProblem(problem)?.code).toBe("slot_taken");
    expect(parseProblem({ message: "boom" })).toBeUndefined();
  });

  it("generates distinct idempotency keys", () => {
    expect(newIdempotencyKey()).not.toBe(newIdempotencyKey());
  });
});
