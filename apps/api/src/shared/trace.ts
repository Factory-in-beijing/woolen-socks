import { randomUUID } from "node:crypto";

const VALID_TRACE_ID = /^[A-Za-z0-9_-]{8,64}$/;

/** Accepts a client-supplied trace id only if it is a short safe token; otherwise issues a new one (log-injection guard). */
export function resolveTraceId(incoming: string | string[] | undefined): string {
  const value = Array.isArray(incoming) ? incoming[0] : incoming;
  return value !== undefined && VALID_TRACE_ID.test(value) ? value : randomUUID();
}
