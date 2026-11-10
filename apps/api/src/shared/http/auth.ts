import type { FastifyRequest } from "fastify";
import { AppError } from "../errors.ts";
import { principalId } from "../domain/ids.ts";
import { anonymous, userPrincipal, type Principal } from "../auth/principal.ts";
import type { TokenVerifier } from "../auth/token-verifier.ts";

export interface Authenticator {
  /** Verifies the Bearer token on first use and caches the result for the request. Throws 401 unauthenticated. */
  principalOf(req: FastifyRequest): Promise<Principal>;
}

/**
 * Authentication is lazy on purpose: only handlers that ask for the principal pay for (and can fail on) token checks,
 * so an expired token never breaks public endpoints such as /v1/config (kill switch, minimum version).
 */
export function createAuthenticator(verifier: TokenVerifier): Authenticator {
  const cache = new WeakMap<FastifyRequest, Promise<Principal>>();

  const resolve = async (req: FastifyRequest): Promise<Principal> => {
    const header = req.headers.authorization;
    if (header === undefined) return anonymous;
    const match = /^Bearer (\S+)$/.exec(header);
    if (!match?.[1]) throw new AppError("unauthenticated", "Authentication required");
    const token = await verifier.verify(match[1]);
    return userPrincipal(principalId(token.uid));
  };

  return {
    principalOf(req) {
      let pending = cache.get(req);
      if (!pending) {
        pending = resolve(req);
        cache.set(req, pending);
      }
      return pending;
    },
  };
}
