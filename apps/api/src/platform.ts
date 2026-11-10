import { CloudTasksClient } from "@google-cloud/tasks";
import type { Env } from "./config.ts";
import type { InternalJobsDeps } from "./http/internal-jobs.ts";
import type { Authenticator } from "./shared/http/auth.ts";
import { createAuthenticator } from "./shared/http/auth.ts";
import type { MembershipReader } from "./shared/auth/workspace.ts";
import { denyAllMemberships } from "./shared/auth/workspace.ts";
import type { Clock } from "./shared/clock.ts";
import type { UnitOfWork } from "./shared/domain/tx.ts";
import { CloudTasksDispatcher } from "./shared/infrastructure/cloud-tasks-dispatcher.ts";
import { firestore } from "./shared/infrastructure/firebase.ts";
import { FirebaseTokenVerifier } from "./shared/infrastructure/firebase-token-verifier.ts";
import { FirestoreIdempotencyStore } from "./shared/infrastructure/firestore-idempotency-store.ts";
import { FirestoreJobStore } from "./shared/infrastructure/firestore-job-store.ts";
import { FirestoreUnitOfWork } from "./shared/infrastructure/firestore-uow.ts";
import { GoogleOidcVerifier } from "./shared/infrastructure/google-oidc-verifier.ts";
import type { IdempotencyStore } from "./shared/idempotency/idempotency.ts";
import type { JobDispatcher, JobStore } from "./shared/jobs/ports.ts";
import type { JobHandlers } from "./shared/jobs/runner.ts";
import type { Logger } from "./shared/logger.ts";

/** Everything modules need from the outside world, assembled once at the edge (principle 20: effects at the edge). */
export interface Platform {
  clock: Clock;
  uow: UnitOfWork;
  jobStore: JobStore;
  jobDispatcher: JobDispatcher | undefined;
  idempotency: IdempotencyStore;
  authenticator: Authenticator;
  /** M1 replaces this with the memberships repository. Until then nobody belongs to any workspace (default-deny). */
  memberships: MembershipReader;
  internalJobs: InternalJobsDeps | undefined;
}

/** Job handlers are registered by modules as their use cases appear (e.g. "payout", "hold-expiry"). None exist yet. */
export const JOB_HANDLERS: JobHandlers = {};

export function createPlatform(env: Env, clock: Clock, logger: Logger): Platform {
  const db = firestore();
  const uow = new FirestoreUnitOfWork(db);
  const jobStore = new FirestoreJobStore(db);

  let jobDispatcher: JobDispatcher | undefined;
  let internalJobs: InternalJobsDeps | undefined;
  if (env.SERVICE_URL && env.TASKS_QUEUE_PATH && env.TASKS_INVOKER_SA) {
    const tasks = new CloudTasksClient();
    jobDispatcher = new CloudTasksDispatcher(
      { createTask: (request) => tasks.createTask(request) },
      {
        queuePath: env.TASKS_QUEUE_PATH,
        serviceUrl: env.SERVICE_URL,
        invokerServiceAccount: env.TASKS_INVOKER_SA,
      },
      () => clock.now(),
    );
    internalJobs = {
      verifier: new GoogleOidcVerifier(env.SERVICE_URL, [env.TASKS_INVOKER_SA]),
      runner: {
        uow,
        store: jobStore,
        dispatcher: jobDispatcher,
        clock,
        logger,
        handlers: JOB_HANDLERS,
        maxAttempts: env.JOB_MAX_ATTEMPTS,
        leaseMs: env.JOB_LEASE_SECONDS * 1000,
      },
      sweep: { olderThanMs: env.JOB_SWEEP_AFTER_SECONDS * 1000, limit: env.JOB_SWEEP_LIMIT },
    };
  } else {
    logger.warn("Cloud Tasks is not configured: /internal/jobs is not mounted (local development)");
  }

  return {
    clock,
    uow,
    jobStore,
    jobDispatcher,
    idempotency: new FirestoreIdempotencyStore(db, clock, env.IDEMPOTENCY_TTL_HOURS * 3_600_000),
    authenticator: createAuthenticator(new FirebaseTokenVerifier()),
    memberships: denyAllMemberships,
    internalJobs,
  };
}
