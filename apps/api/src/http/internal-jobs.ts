import type { FastifyInstance } from "fastify";
import { z } from "zod";
import type { InternalCallerVerifier } from "../shared/auth/internal-caller.ts";
import { AppError } from "../shared/errors.ts";
import { runJob, sweepUndispatched, type RunnerDeps } from "../shared/jobs/runner.ts";

export interface InternalJobsDeps {
  verifier: InternalCallerVerifier;
  runner: RunnerDeps;
  sweep: { olderThanMs: number; limit: number };
}

const RunBody = z.object({ jobId: z.string().min(1).max(512) });

/**
 * /internal/jobs — called only by Cloud Tasks and Cloud Scheduler (not part of the client contract).
 * 2xx stops Cloud Tasks retries; a retryable outcome answers 503 so Cloud Tasks retries with backoff (principle 22).
 */
export function registerInternalJobs(app: FastifyInstance, deps: InternalJobsDeps): void {
  app.post("/internal/jobs/run", async (req) => {
    await deps.verifier.verify(req.headers.authorization);
    const parsed = RunBody.safeParse(req.body);
    if (!parsed.success) throw AppError.fromZod(parsed.error);
    const outcome = await runJob(deps.runner, parsed.data.jobId);
    if (outcome === "retry") throw new AppError("dependency_unavailable", "Job will be retried");
    return { outcome };
  });

  app.post("/internal/jobs/sweep", async (req) => {
    await deps.verifier.verify(req.headers.authorization);
    return { dispatched: await sweepUndispatched(deps.runner, deps.sweep) };
  });
}
