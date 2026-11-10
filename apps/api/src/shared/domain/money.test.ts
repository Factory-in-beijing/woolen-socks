import fc from "fast-check";
import { describe, expect, it } from "vitest";
import type { Tetri as SharedTetri } from "@drivenet/schemas";
import { add, allocate, isZero, negate, subtract, tetri } from "./money.ts";

describe("Money (principle 10): integer tetri only", () => {
  it("is the same Tetri type that i18n and clients use (single definition)", () => {
    const shared: SharedTetri = tetri(5);
    expect(shared).toBe(5);
  });

  it("rejects fractions, NaN and unsafe integers", () => {
    expect(() => tetri(1.5)).toThrow();
    expect(() => tetri(Number.NaN)).toThrow();
    expect(() => tetri(2 ** 60)).toThrow();
  });

  it("arithmetic stays exact", () => {
    expect(add(tetri(10), tetri(5))).toBe(15);
    expect(subtract(tetri(10), tetri(15))).toBe(-5);
    expect(isZero(add(tetri(7), negate(tetri(7))))).toBe(true);
  });

  it("allocate always sums to the total, for any amount and weights (property)", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -1_000_000_000, max: 1_000_000_000 }),
        fc.array(fc.integer({ min: 1, max: 10_000 }), { minLength: 1, maxLength: 12 }),
        (total, weights) => {
          const parts = allocate(tetri(total), weights);
          expect(parts).toHaveLength(weights.length);
          expect(parts.reduce((a, b) => a + b, 0)).toBe(total);
        },
      ),
    );
  });

  it("allocate is within one tetri of the exact proportion and deterministic", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 1_000_000 }),
        fc.array(fc.integer({ min: 1, max: 1000 }), { minLength: 1, maxLength: 8 }),
        (total, weights) => {
          const sum = weights.reduce((a, b) => a + b, 0);
          const parts = allocate(tetri(total), weights);
          parts.forEach((p, i) => {
            expect(Math.abs(p - (total * (weights[i] ?? 0)) / sum)).toBeLessThan(1);
          });
          expect(allocate(tetri(total), weights)).toEqual(parts);
        },
      ),
    );
  });

  it("rejects empty or non-positive weights", () => {
    expect(() => allocate(tetri(100), [])).toThrow();
    expect(() => allocate(tetri(100), [1, 0])).toThrow();
    expect(() => allocate(tetri(100), [1, 1.5])).toThrow();
  });
});
