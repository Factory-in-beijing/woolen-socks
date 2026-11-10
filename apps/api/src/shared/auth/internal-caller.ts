/**
 * Port: who may call /internal/* (Cloud Tasks, Cloud Scheduler). The Cloud Run service is public (clients use Firebase JWT),
 * so internal endpoints verify the caller's Google OIDC token themselves.
 */
export interface InternalCallerVerifier {
  /** Throws AppError("unauthenticated") unless the Authorization header carries a valid token of an allowed service account. */
  verify(authorizationHeader: string | undefined): Promise<void>;
}
