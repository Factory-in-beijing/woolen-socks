import { describe, expect, it } from "vitest";
import Fastify from "fastify";
import { AppError } from "../errors.ts";
import type { TokenVerifier } from "../auth/token-verifier.ts";
import { createAuthenticator } from "./auth.ts";

const verifier: TokenVerifier = {
  verify: async (t) => {
    if (t === "good") return { uid: "u1" };
    throw new AppError("unauthenticated", "Invalid token");
  },
};

async function principalFor(headers: Record<string, string>) {
  const app = Fastify();
  const auth = createAuthenticator(verifier);
  app.get("/p", async (req) => auth.principalOf(req));
  app.setErrorHandler((e, _req, reply) =>
    reply.status(e instanceof AppError ? 401 : 500).send({ code: (e as AppError).code }),
  );
  return app.inject({ method: "GET", url: "/p", headers });
}

describe("authenticator (lazy: public routes never see a bad token)", () => {
  it("no header → anonymous guest", async () => {
    expect((await principalFor({})).json()).toEqual({ kind: "anonymous" });
  });
  it("valid Bearer token → user principal", async () => {
    expect((await principalFor({ authorization: "Bearer good" })).json()).toEqual({
      kind: "user",
      id: "u1",
    });
  });
  it("invalid token, wrong scheme or empty token → 401 unauthenticated, all alike", async () => {
    for (const authorization of ["Bearer bad", "Basic good", "Bearer "]) {
      const res = await principalFor({ authorization });
      expect(res.statusCode).toBe(401);
      expect(res.json().code).toBe("unauthenticated");
    }
  });
});
