import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { AppError } from "../errors.ts";
import type { TokenVerifier } from "../auth/token-verifier.ts";

/** Firebase Auth adapter for the TokenVerifier port. Every failure collapses into one 401 (no reason leaks). */
export class FirebaseTokenVerifier implements TokenVerifier {
  async verify(idToken: string) {
    try {
      const decoded = await getAuth(getApps()[0] ?? initializeApp()).verifyIdToken(idToken);
      return { uid: decoded.uid };
    } catch {
      throw new AppError("unauthenticated", "Authentication required");
    }
  }
}
