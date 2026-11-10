import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { AppError } from "../errors.ts";
import { balancedTransaction, reversalOf, type LedgerEntry } from "./ledger.ts";
import { allocate, tetri } from "./money.ts";

const entry = (account: string, amount: number): LedgerEntry => ({
  account,
  amount: tetri(amount),
});

describe("append-only double-entry ledger (principle 10)", () => {
  it("accepts only transactions whose entries sum to zero", () => {
    expect(
      balancedTransaction([
        entry("customer", -1000),
        entry("partner", 900),
        entry("drivenet", 100),
      ]),
    ).toHaveLength(3);
    expect(() => balancedTransaction([entry("a", -1000), entry("b", 999)])).toThrow(AppError);
  });

  it("needs at least two entries and no zero-amount noise", () => {
    expect(() => balancedTransaction([entry("a", 0)])).toThrow();
    expect(() => balancedTransaction([entry("a", 5), entry("b", -5), entry("c", 0)])).toThrow();
  });

  it("a correction is a reversal entry set, never an edit (property)", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 1_000_000 }),
        fc.array(fc.integer({ min: 1, max: 100 }), { minLength: 1, maxLength: 6 }),
        (total, weights) => {
          const shares = allocate(tetri(total), weights)
            .map((amount, i) => ({ account: `p${i}`, amount }))
            .filter((e) => e.amount !== 0);
          const tx = balancedTransaction([
            { account: "customer", amount: tetri(-total) },
            ...shares,
          ]);
          const reversal = reversalOf(tx);
          const net = new Map<string, number>();
          for (const e of [...tx, ...reversal])
            net.set(e.account, (net.get(e.account) ?? 0) + e.amount);
          expect([...net.values()].every((v) => v === 0)).toBe(true);
          expect(reversal.reduce((s, e) => s + e.amount, 0)).toBe(0);
        },
      ),
    );
  });
});
