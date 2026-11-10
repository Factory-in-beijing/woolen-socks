import type { Tx } from "../domain/tx.ts";
import type { Job } from "./job.ts";

export interface JobStore {
  /** Create-only (unique constraint by id). Called inside the business transaction. A duplicate id aborts that transaction. */
  create(tx: Tx, job: Job): void;
  get(tx: Tx, id: string): Promise<Job | undefined>;
  put(tx: Tx, job: Job): void;
  /** Outside a transaction: stamp a job as dispatched. */
  markDispatched(id: string, at: Date): Promise<void>;
  /** Pending jobs that never reached the queue (created before `createdBefore`). */
  listUndispatched(createdBefore: Date, limit: number): Promise<Job[]>;
}

/** Port: the queue (Cloud Tasks). `dispatch` must treat "already exists" as success. */
export interface JobDispatcher {
  dispatch(job: Pick<Job, "id" | "runAt">): Promise<void>;
}
