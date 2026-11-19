/** Money is integer tetri (1 GEL = 100 tetri); formatting is for display only. */
export type Tetri = number;

export function formatGel(amount: Tetri): string {
  const lari = amount / 100;
  return `₾${Number.isInteger(lari) ? lari : lari.toFixed(2)}`;
}
