/** Pure rules for the reminder settings. */

const SHORT_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export const pad2 = (n: number) => (n < 10 ? "0" : "") + n;

export const EVERY_DAY = [true, true, true, true, true, true, true];
export const WEEKDAYS = [true, true, true, true, true, false, false];
export const WEEKENDS = [false, false, false, false, false, true, true];

const sameDays = (a: readonly boolean[], b: readonly boolean[]) => a.every((v, i) => v === b[i]);

/** "Every day", "Weekdays", "Mon, Wed", "5 days a week"... */
export function daysSummary(days: readonly boolean[]): string {
  const count = days.filter(Boolean).length;
  if (count === 0) return "Pick at least one day";
  if (sameDays(days, EVERY_DAY)) return "Every day";
  if (sameDays(days, WEEKDAYS)) return "Weekdays";
  if (sameDays(days, WEEKENDS)) return "Weekends";
  if (count <= 3) return SHORT_DAYS.filter((_, i) => days[i]).join(", ");
  return `${count} days a week`;
}

/** The five values of a time wheel: two before, the current one, two after (wrapping around). */
export function wheelValues(current: number, size: number): number[] {
  return [-2, -1, 0, 1, 2].map((offset) => (current + offset + size) % size);
}
