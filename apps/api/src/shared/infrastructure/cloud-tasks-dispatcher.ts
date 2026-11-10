import { createHash } from "node:crypto";
import { AppError } from "../errors.ts";
import type { Job } from "../jobs/job.ts";
import type { JobDispatcher } from "../jobs/ports.ts";

/** The slice of CloudTasksClient we use, so the adapter can be tested with a fake (principle 11). */
export interface TasksClient {
  createTask(request: {
    parent: string;
    task: {
      name: string;
      scheduleTime?: { seconds: number };
      httpRequest: {
        httpMethod: "POST";
        url: string;
        headers: Record<string, string>;
        body: string;
        oidcToken: { serviceAccountEmail: string; audience: string };
      };
    };
  }): Promise<unknown>;
}

export interface CloudTasksConfig {
  /** projects/<p>/locations/<l>/queues/<q> */
  queuePath: string;
  /** Public URL of this Cloud Run service; also the OIDC audience. */
  serviceUrl: string;
  /** Service account whose OIDC token Cloud Tasks attaches. */
  invokerServiceAccount: string;
}

const ALREADY_EXISTS = 6;

export class CloudTasksDispatcher implements JobDispatcher {
  constructor(
    private readonly client: TasksClient,
    private readonly config: CloudTasksConfig,
    private readonly now: () => Date,
  ) {}

  async dispatch(job: Pick<Job, "id" | "runAt">): Promise<void> {
    const { queuePath, serviceUrl, invokerServiceAccount } = this.config;
    // Task names allow only [A-Za-z0-9_-]; hashing the job id also makes re-dispatch of the same job deduplicate.
    const name = `${queuePath}/tasks/job-${createHash("sha256").update(job.id).digest("hex").slice(0, 40)}`;
    const delayed = job.runAt.getTime() > this.now().getTime();
    try {
      await this.client.createTask({
        parent: queuePath,
        task: {
          name,
          ...(delayed ? { scheduleTime: { seconds: Math.ceil(job.runAt.getTime() / 1000) } } : {}),
          httpRequest: {
            httpMethod: "POST",
            url: `${serviceUrl}/internal/jobs/run`,
            headers: { "Content-Type": "application/json" },
            body: Buffer.from(JSON.stringify({ jobId: job.id })).toString("base64"),
            oidcToken: { serviceAccountEmail: invokerServiceAccount, audience: serviceUrl },
          },
        },
      });
    } catch (err) {
      if ((err as { code?: number }).code === ALREADY_EXISTS) return; // same job already queued: success
      throw new AppError("dependency_unavailable", "Job queue is unavailable", { cause: err });
    }
  }
}
