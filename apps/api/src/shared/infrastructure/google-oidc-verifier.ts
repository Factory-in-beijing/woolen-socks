import { OAuth2Client } from "google-auth-library";
import { AppError } from "../errors.ts";
import type { InternalCallerVerifier } from "../auth/internal-caller.ts";

export class GoogleOidcVerifier implements InternalCallerVerifier {
  private readonly client = new OAuth2Client();

  constructor(
    private readonly audience: string,
    private readonly allowedServiceAccounts: readonly string[],
  ) {}

  async verify(authorizationHeader: string | undefined): Promise<void> {
    const token = /^Bearer (\S+)$/.exec(authorizationHeader ?? "")?.[1];
    try {
      if (!token) throw new Error("missing token");
      const ticket = await this.client.verifyIdToken({ idToken: token, audience: this.audience });
      const payload = ticket.getPayload();
      if (
        !payload?.email_verified ||
        !payload.email ||
        !this.allowedServiceAccounts.includes(payload.email)
      ) {
        throw new Error("caller not allowed");
      }
    } catch {
      throw new AppError("unauthenticated", "Authentication required");
    }
  }
}
