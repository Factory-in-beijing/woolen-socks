import type { Clock } from "../clock.ts";
import type { Tx, UnitOfWork } from "../domain/tx.ts";
import type { Logger } from "../logger.ts";
import { jobMachine, newJob, type Job, type JobSpec } from "./job.ts";
import type { JobDispatcher, JobStore } from "./ports.ts";

export type JobHandler = (
  payload: Readonly<Record<string, unknown>>,
  ctx: { jobId: string; attempt: number },
) => Promise<void>;
export type JobHandlers = Readonly<Record<string, JobHandler>>;

export interface RunnerDeps {
  uow: UnitOfWork;
  store: JobStore;
  dispatcher: JobDispatcher;
  clock: Clock;
  logger: Logger;
  handlers: JobHandlers;
  /** Keep in sync with the Cloud Tasks queue retry config (Terraform). */
  maxAttempts: number;
  /** How long a running job is considered owned by one worker before it may be reclaimed after a crash. */
  leaseMs: number;
}

export type RunOutcome = "done" | "retry" | "failed" | "skipped";

/**
 * Runs a use case and lets it enqueue jobs *in the same transaction* as its business change.
 * After the commit the jobs are dispatched; a dispatch outage is logged and healed by the sweeper, never surfaced
 * as a business failure (the effect is already committed).
 */
export async function runWithJobs<T>(
  deps: Pick<RunnerDeps, "uow" | "store" | "dispatcher" | "clock" | "logger">,
  work: (tx: Tx, enqueue: (spec: JobSpec) => void) => Promise<T>,
): Promise<T> {
  const created: Job[] = [];
  const result = await deps.uow.run(async (tx) => {
    created.length = 0; // the transaction body may be re-run on contention
    return work(tx, (spec) => {
      const job = newJob(spec, deps.clock.now());
      deps.store.create(tx, job);
      created.push(job);
    });
  });
  for (const job of created) await dispatchOne(deps, job);
  return result;
}

async function dispatchOne(
  deps: Pick<RunnerDeps, "store" | "dispatcher" | "clock" | "logger">,
  job: Pick<Job, "id" | "runAt">,
): Promise<boolean> {
  try {
    await deps.dispatcher.dispatch(job);
    await deps.store.markDispatched(job.id, deps.clock.now());
    return true;
  } catch (err) {
    deps.logger.warn({ err, jobId: job.id }, "job dispatch failed; the sweeper will retry");
    return false;
  }
}

/** Scheduler-driven: re-dispatches pending jobs that never made it to the queue. Returns how many were dispatched. */
export async function sweepUndispatched(
  deps: Pick<RunnerDeps, "store" | "dispatcher" | "clock" | "logger">,
  opts: { olderThanMs: number; limit: number },
): Promise<number> {
  const cutoff = new Date(deps.clock.now().getTime() - opts.olderThanMs);
  let dispatched = 0;
  for (const job of await deps.store.listUndispatched(cutoff, opts.limit)) {
    if (await dispatchOne(deps, job)) dispatched += 1;
  }
  return dispatched;
}

/**
 * Handler entry point for one delivery of one job. Idempotent: terminal jobs are skipped, a live lease defers to the
 * other worker, and an expired lease (crashed worker) is reclaimed. External calls happen outside any transaction.
 */
export async function runJob(deps: RunnerDeps, jobId: string): Promise<RunOutcome> {
  const claimed = await deps.uow.run(async (tx): Promise<{ job: Job } | RunOutcome> => {
    const job = await deps.store.get(tx, jobId);
    if (!job || job.state === "succeeded" || job.state === "failed") return "skipped";
    const now = deps.clock.now();
    let current = job;
    if (current.state === "running") {
      if (current.leaseUntil !== null && current.leaseUntil.getTime() > now.getTime())
        return "retry";
      current = { ...current, state: jobMachine.next("running", "retry"), leaseUntil: null };
    }
    const started: Job = {
      ...current,
      state: jobMachine.next(current.state, "start"),
      attempts: current.attempts + 1,
      leaseUntil: new Date(now.getTime() + deps.leaseMs),
    };
    deps.store.put(tx, started);
    return { job: started };
  });
  if (typeof claimed === "string") return claimed;
  const { job } = claimed;

  const handler = deps.handlers[job.type];
  if (!handler) return finish(deps, job, "fail", new Error("UnknownJobType"));
  try {
    await handler(job.payload, { jobId: job.id, attempt: job.attempts });
  } catch (err) {
    return finish(deps, job, job.attempts >= deps.maxAttempts ? "fail" : "retry", err);
  }
  return finish(deps, job, "succeed");
}

async function finish(
  deps: RunnerDeps,
  job: Job,
  event: "succeed" | "retry" | "fail",
  err?: unknown,
): Promise<RunOutcome> {
  const lastError = err instanceof Error ? err.name : err === undefined ? null : "UnknownError";
  await deps.uow.run(async (tx) => {
    const fresh = (await deps.store.get(tx, job.id)) ?? job;
    deps.store.put(tx, {
      ...fresh,
      state: jobMachine.next("running", event),
      leaseUntil: null,
      lastError,
    });
  });
  if (event === "succeed") return "done";
  if (event === "retry") {
    deps.logger.warn({ err, jobId: job.id, attempt: job.attempts }, "job failed; will be retried");
    return "retry";
  }
  // Terminal failure: a log-based alert fires on this exact field (principle 8: failure → alert, never silent).
  deps.logger.error(
    { err, jobId: job.id, jobType: job.type, attempts: job.attempts, alert: "job_failed" },
    "job failed permanently",
  );
  return "failed";
}
