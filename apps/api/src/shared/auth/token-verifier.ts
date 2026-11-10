/** Port (principles 3, 11): the identity provider is behind an interface; Firebase is just the adapter. */
export interface VerifiedToken {
  readonly uid: string;
}

export interface TokenVerifier {
  /** Throws AppError("unauthenticated") for every kind of failure — the reason is never revealed to the client. */
  verify(idToken: string): Promise<VerifiedToken>;
}
