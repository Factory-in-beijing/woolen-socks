import type { Brand } from "./ids.ts";

/**
 * Opaque handle of "the current transaction". Use cases receive it from the UnitOfWork and pass it to repositories;
 * only infrastructure knows it is a Firestore transaction. This keeps application code SDK-free (principle 18)
 * while letting a job record be written in the same transaction as the business change (principles 7, 8).
 */
export type Tx = Brand<object, "Tx">;

export interface UnitOfWork {
  /** One use case = one small transaction: reads first, then writes, no external calls inside (principle 7). */
  run<T>(work: (tx: Tx) => Promise<T>): Promise<T>;
}
