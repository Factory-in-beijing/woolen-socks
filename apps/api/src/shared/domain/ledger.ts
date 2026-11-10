import { AppError } from "../errors.ts";
import type { Brand } from "./ids.ts";
import { negate, type Tetri } from "./money.ts";

/** One side of a double entry. Positive and negative amounts are the two sides; accounts are opaque strings owned by M4. */
export interface LedgerEntry {
  readonly account: string;
  readonly amount: Tetri;
}

/** Entries that were checked to sum to zero. Only such transactions may be appended (principle 10). */
export type BalancedTransaction = Brand<readonly LedgerEntry[], "BalancedTransaction">;

export function balancedTransaction(entries: readonly LedgerEntry[]): BalancedTransaction {
  if (entries.length < 2 || entries.some((e) => e.amount === 0)) {
    throw new AppError(
      "validation_failed",
      "A ledger transaction needs at least two non-zero entries",
    );
  }
  const sum = entries.reduce((total, e) => total + e.amount, 0);
  if (sum !== 0) throw new AppError("validation_failed", "Ledger transaction does not sum to zero");
  return entries as BalancedTransaction;
}

/** Corrections never edit history: they append the exact opposite entries. */
export function reversalOf(tx: BalancedTransaction): BalancedTransaction {
  return balancedTransaction(tx.map((e) => ({ account: e.account, amount: negate(e.amount) })));
}
