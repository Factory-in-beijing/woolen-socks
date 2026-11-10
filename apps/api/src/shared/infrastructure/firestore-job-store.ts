import type { Firestore, Timestamp } from "firebase-admin/firestore";
import type { WorkspaceId } from "../domain/ids.ts";
import type { Tx } from "../domain/tx.ts";
import type { Job, JobState } from "../jobs/job.ts";
import type { JobStore } from "../jobs/ports.ts";
import { asFirestoreTx } from "./firestore-uow.ts";

const COLLECTION = "jobs";

interface JobDoc {
  type: string;
  payload: Record<string, unknown>;
  workspaceId?: string | null;
  state: JobState;
  attempts: number;
  createdAt: Timestamp;
  runAt: Timestamp;
  dispatchedAt: Timestamp | null;
  leaseUntil: Timestamp | null;
  lastError: string | null;
}

const toJob = (id: string, d: JobDoc): Job => ({
  id,
  type: d.type,
  payload: d.payload,
  // Documents written before the field existed read as null (schema evolution: optional + default).
  workspaceId: (d.workspaceId ?? null) as WorkspaceId | null,
  state: d.state,
  attempts: d.attempts,
  createdAt: d.createdAt.toDate(),
  runAt: d.runAt.toDate(),
  dispatchedAt: d.dispatchedAt?.toDate() ?? null,
  leaseUntil: d.leaseUntil?.toDate() ?? null,
  lastError: d.lastError,
});

const toDoc = (job: Job) => ({
  type: job.type,
  payload: { ...job.payload },
  workspaceId: job.workspaceId,
  state: job.state,
  attempts: job.attempts,
  createdAt: job.createdAt,
  runAt: job.runAt,
  // Stored as an explicit null (not a missing field) so the sweeper query can filter on it.
  dispatchedAt: job.dispatchedAt,
  leaseUntil: job.leaseUntil,
  lastError: job.lastError,
});

/** Jobs live in a root collection; id = the use case's deterministic job id, so `create` is a unique constraint (principle 6). */
export class FirestoreJobStore implements JobStore {
  constructor(private readonly db: Firestore) {}

  private ref(id: string) {
    return this.db.collection(COLLECTION).doc(id);
  }

  create(tx: Tx, job: Job): void {
    asFirestoreTx(tx).create(this.ref(job.id), toDoc(job));
  }

  async get(tx: Tx, id: string): Promise<Job | undefined> {
    const snap = await asFirestoreTx(tx).get(this.ref(id));
    return snap.exists ? toJob(id, snap.data() as JobDoc) : undefined;
  }

  put(tx: Tx, job: Job): void {
    asFirestoreTx(tx).set(this.ref(job.id), toDoc(job));
  }

  async markDispatched(id: string, at: Date): Promise<void> {
    await this.ref(id).update({ dispatchedAt: at });
  }

  /** Needs the composite index in firestore.indexes.json: state ASC, dispatchedAt ASC, createdAt ASC. */
  async listUndispatched(createdBefore: Date, limit: number): Promise<Job[]> {
    const snap = await this.db
      .collection(COLLECTION)
      .where("state", "==", "pending")
      .where("dispatchedAt", "==", null)
      .where("createdAt", "<", createdBefore)
      .orderBy("createdAt")
      .limit(limit)
      .get();
    return snap.docs.map((d) => toJob(d.id, d.data() as JobDoc));
  }
}
