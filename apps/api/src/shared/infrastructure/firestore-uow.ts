import type { Firestore, Transaction } from "firebase-admin/firestore";
import type { Tx, UnitOfWork } from "../domain/tx.ts";

/** Unit of work over a Firestore transaction. Retries on contention are done by Firestore, so `work` must be re-runnable. */
export class FirestoreUnitOfWork implements UnitOfWork {
  constructor(private readonly db: Firestore) {}

  run<T>(work: (tx: Tx) => Promise<T>): Promise<T> {
    return this.db.runTransaction((t) => work(t as unknown as Tx));
  }
}

/** Repositories (infrastructure only) recover the Firestore transaction from the opaque handle. */
export const asFirestoreTx = (tx: Tx): Transaction => tx as unknown as Transaction;
