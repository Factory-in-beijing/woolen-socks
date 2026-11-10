/**
 * Client data-layer defaults (principle 22: retry with backoff, only reads; writes never auto-retry because a retry
 * needs the same Idempotency-Key). The documents give no numbers, so these are WORKING ASSUMPTIONS in one place,
 * shared by web and mobile (principle 12).
 */
export const QUERY_DEFAULTS = {
  readRetries: 2,
  retryBaseMs: 1_000,
  retryMaxMs: 8_000,
  staleMs: 30_000,
} as const;

/** Exponential backoff for read retries, capped. `attempt` is 0 for the first retry. */
export const retryDelayMs = (attempt: number): number =>
  Math.min(QUERY_DEFAULTS.retryBaseMs * 2 ** attempt, QUERY_DEFAULTS.retryMaxMs);
