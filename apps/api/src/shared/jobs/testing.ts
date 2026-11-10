import type { Tx, UnitOfWork } from "../domain/tx.ts";
import type { Job } from "./job.ts";
import type { JobDispatcher, JobStore } from "./ports.ts";

/** Test doubles. The in-memory unit of work is atomic: writes are buffered and dropped if the work throws. */
export class InMemoryJobStore implements JobStore {
  private jobs = new Map<string, Job>();
  private pending: Array<() => void> | undefined;

  all(): Job[] {
    return [...this.jobs.values()];
  }
  replace(job: Job): void {
    this.jobs.set(job.id, job);
  }
  begin(): void {
    this.pending = [];
  }
  commit(): void {
    for (const apply of this.pending ?? []) apply();
    this.pending = undefined;
  }
  rollback(): void {
    this.pending = undefined;
  }
  private write(apply: () => void): void {
    if (this.pending) this.pending.push(apply);
    else apply();
  }
  create(_tx: Tx, job: Job): void {
    this.write(() => {
      if (this.jobs.has(job.id)) throw new Error("ALREADY_EXISTS");
      this.jobs.set(job.id, job);
    });
  }
  async get(_tx: Tx, id: string): Promise<Job | undefined> {
    return this.jobs.get(id);
  }
  put(_tx: Tx, job: Job): void {
    this.write(() => void this.jobs.set(job.id, job));
  }
  async markDispatched(id: string, at: Date): Promise<void> {
    const job = this.jobs.get(id);
    if (job) this.jobs.set(id, { ...job, dispatchedAt: at });
  }
  async listUndispatched(createdBefore: Date, limit: number): Promise<Job[]> {
    return this.all()
      .filter(
        (j) => j.state === "pending" && j.dispatchedAt === null && j.createdAt < createdBefore,
      )
      .slice(0, limit);
  }
}

export class InMemoryUnitOfWork implements UnitOfWork {
  constructor(private readonly store?: InMemoryJobStore) {}
  async run<T>(work: (tx: Tx) => Promise<T>): Promise<T> {
    this.store?.begin();
    try {
      const result = await work({} as Tx);
      this.store?.commit();
      return result;
    } catch (error) {
      this.store?.rollback();
      throw error;
    }
  }
}

export class RecordingDispatcher implements JobDispatcher {
  readonly dispatched: Array<Pick<Job, "id" | "runAt">> = [];
  failNext = false;
  async dispatch(job: Pick<Job, "id" | "runAt">): Promise<void> {
    if (this.failNext) {
      this.failNext = false;
      throw new Error("queue unavailable");
    }
    this.dispatched.push(job);
  }
}
