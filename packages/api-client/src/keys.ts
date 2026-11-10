export const newTraceId = (): string => crypto.randomUUID();

/**
 * One key per user action (e.g. one form submit). Idempotency-Key is required by the contract on POST/PUT,
 * so callers pass it explicitly; generating it here would change the key on every retry and defeat its purpose.
 */
export const newIdempotencyKey = (): string => crypto.randomUUID();
