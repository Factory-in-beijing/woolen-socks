/**
 * API conventions that the architecture documents do NOT specify. Every number here is a WORKING ASSUMPTION
 * (principle 12: no unexplained numbers in code) kept in one place so a product decision changes one file; the
 * OpenAPI contract is tested against it. Change by addition-compatible steps only (principle 1).
 */
export const API_DEFINITION = {
  pageSize: { default: 20, max: 100 },
  idempotencyKey: { minLength: 8, maxLength: 128 },
} as const;
