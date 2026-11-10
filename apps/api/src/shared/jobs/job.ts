import type { WorkspaceId } from "../domain/ids.ts";
import { defineStateMachine } from "../domain/state-machine.ts";

/**
 * pending → running → succeeded | failed, with running → pending as a retry.
 * `failed` is terminal and always accompanied by an alert; business operations are never silently dropped (principle 8).
 */
export const jobMachine = defineStateMachine({
  pending: { start: "running" },
  running: { succeed: "succeeded", retry: "pending", fail: "failed" },
  succeeded: {},
  failed: {},
} as const);

export type JobState = "pending" | "running" | "succeeded" | "failed";

export interface Job {
  /** Deterministic, chosen by the use case (e.g. `payout:<lessonId>`): create-only makes enqueueing idempotent. */
  readonly id: string;
  readonly type: string;
  readonly payload: Readonly<Record<string, unknown>>;
  /** Owning workspace (owner field for support/admin queries); null for platform-level jobs. */
  readonly workspaceId: WorkspaceId | null;
  readonly state: JobState;
  readonly attempts: number;
  readonly createdAt: Date;
  readonly runAt: Date;
  /** null until a Cloud Task was created; the sweeper re-dispatches jobs that stay null. */
  readonly dispatchedAt: Date | null;
  readonly leaseUntil: Date | null;
  /** Error class name only — messages may contain PII (principle 15). */
  readonly lastError: string | null;
}

export interface JobSpec {
  readonly id: string;
  readonly type: string;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly workspaceId?: WorkspaceId;
  /** Defaults to "now". Used for delayed work such as hold expiry. */
  readonly runAt?: Date;
}

export function newJob(spec: JobSpec, now: Date): Job {
  return {
    id: spec.id,
    type: spec.type,
    payload: spec.payload,
    workspaceId: spec.workspaceId ?? null,
    state: "pending",
    attempts: 0,
    createdAt: now,
    runAt: spec.runAt ?? now,
    dispatchedAt: null,
    leaseUntil: null,
    lastError: null,
  };
}
