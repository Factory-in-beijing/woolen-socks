import { AppError } from "../errors.ts";
import type { Brand } from "./ids.ts";

/** Money is integer tetri (1 lari = 100 tetri). Floating point never touches an amount (principle 10). */
export type Tetri = Brand<number, "Tetri">;

export function tetri(amount: number): Tetri {
  if (!Number.isSafeInteger(amount)) {
    throw new AppError("validation_failed", "Amount must be an integer number of tetri");
  }
  return amount as Tetri;
}

export const add = (a: Tetri, b: Tetri): Tetri => tetri(a + b);
export const subtract = (a: Tetri, b: Tetri): Tetri => tetri(a - b);
export const negate = (a: Tetri): Tetri => tetri(-a);
export const isZero = (a: Tetri): boolean => a === 0;

/**
 * Splits `total` proportionally to integer `weights` with the largest-remainder method.
 * The parts always sum to `total` exactly; ties go to the earlier index, so the result is deterministic.
 * Used for commission/partner shares: rounding can never create or destroy money.
 */
export function allocate(total: Tetri, weights: readonly number[]): Tetri[] {
  if (weights.length === 0 || weights.some((w) => !Number.isSafeInteger(w) || w <= 0)) {
    throw new AppError(
      "validation_failed",
      "Weights must be a non-empty list of positive integers",
    );
  }
  const weightSum = weights.reduce((a, b) => a + b, 0);
  const sign = total < 0 ? -1 : 1;
  const abs = BigInt(Math.abs(total));
  const sum = BigInt(weightSum);

  const base = weights.map((w) => (abs * BigInt(w)) / sum);
  const remainders = weights.map((w, i) => ({ i, rem: (abs * BigInt(w)) % sum }));
  let leftover = Number(abs - base.reduce((a, b) => a + b, 0n));
  remainders.sort((x, y) => (x.rem === y.rem ? x.i - y.i : x.rem > y.rem ? -1 : 1));
  const extra = new Array<number>(weights.length).fill(0);
  for (const { i } of remainders) {
    if (leftover === 0) break;
    extra[i] = 1;
    leftover -= 1;
  }
  return base.map((b, i) => tetri(sign * (Number(b) + (extra[i] ?? 0))));
}
