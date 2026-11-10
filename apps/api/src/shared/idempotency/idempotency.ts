import { createHash } from "node:crypto";
import type { FastifyRequest } from "fastify";
import { AppError } from "../errors.ts";
import type { PrincipalId } from "../domain/ids.ts";
import type { ErrorCode } from "@drivenet/schemas";

export interface IdempotencyScope {
  readonly principalId: PrincipalId;
  /** e.g. "POST /v1/bookings" — the same key on another route is a different request. */
  readonly route: string;
  readonly key: string;
}

export type StoredOutcome =
  | { readonly kind: "ok"; readonly status: number; readonly body: unknown }
  | { readonly kind: "app_error"; readonly code: ErrorCode; readonly message: string };

export type BeginResult =
  | { readonly kind: "started" }
  | { readonly kind: "replay"; readonly outcome: StoredOutcome }
  | { readonly kind: "in_progress" }
  | { readonly kind: "mismatch" };

/** Port: Idempotency-Key → stored outcome. The Firestore adapter uses a create-only document per key (principle 6). */
export interface IdempotencyStore {
  begin(scope: IdempotencyScope, requestHash: string): Promise<BeginResult>;
  complete(scope: IdempotencyScope, outcome: StoredOutcome): Promise<void>;
  abandon(scope: IdempotencyScope): Promise<void>;
}

const KEY_PATTERN = /^[A-Za-z0-9_.:-]{8,128}$/;

/** `Idempotency-Key` is required on every POST/PUT (contract); missing or malformed → 400. */
export function readIdempotencyKey(req: FastifyRequest): string {
  const raw = req.headers["idempotency-key"];
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (value === undefined || !KEY_PATTERN.test(value)) {
    throw new AppError(
      "validation_failed",
      "Idempotency-Key header is required (8–128 safe characters)",
    );
  }
  return value;
}

function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}

export const hashRequest = (body: unknown): string =>
  createHash("sha256").update(canonical(body)).digest("hex");

/** Stable document id for a scope. Hashing keeps client-chosen keys out of document paths. */
export const scopeId = (s: IdempotencyScope): string =>
  createHash("sha256").update(`${s.principalId}\n${s.route}\n${s.key}`).digest("hex");

export interface IdempotentResult<T> {
  readonly status: number;
  readonly body: T;
}

/**
 * Same key + same request = same response, effect happens once (principle 6).
 *  - replay: the stored outcome is returned (expected failures are replayed as the same AppError);
 *  - same key, different payload, or the first request still running: 409 idempotency_conflict;
 *  - unexpected failures (5xx, bugs, outages) are NOT stored, so the client may retry with the same key.
 */
export async function withIdempotency<T>(
  store: IdempotencyStore,
  scope: IdempotencyScope,
  requestBody: unknown,
  run: () => Promise<IdempotentResult<T>>,
): Promise<IdempotentResult<T>> {
  const begun = await store.begin(scope, hashRequest(requestBody));
  switch (begun.kind) {
    case "replay":
      if (begun.outcome.kind === "app_error")
        throw new AppError(begun.outcome.code, begun.outcome.message);
      return { status: begun.outcome.status, body: begun.outcome.body as T };
    case "mismatch":
      throw new AppError(
        "idempotency_conflict",
        "Idempotency-Key was already used with a different request",
      );
    case "in_progress":
      throw new AppError(
        "idempotency_conflict",
        "A request with this Idempotency-Key is still being processed",
      );
    case "started":
      break;
  }
  try {
    const result = await run();
    await store.complete(scope, { kind: "ok", status: result.status, body: result.body });
    return result;
  } catch (error) {
    if (error instanceof AppError && error.code !== "internal_error" && !isServerSide(error.code)) {
      await store.complete(scope, { kind: "app_error", code: error.code, message: error.message });
    } else {
      await store.abandon(scope);
    }
    throw error;
  }
}

const isServerSide = (code: ErrorCode): boolean =>
  code === "dependency_unavailable" || code === "payment_unavailable";
