import type { Tetri } from "@drivenet/schemas";

/**
 * The single formatter for time and money (FE base: "one formatter — Asia/Tbilisi, tetri → lari").
 * Instants are stored and transported in UTC; business dates are always shown in Asia/Tbilisi,
 * regardless of the device time zone (principle 14).
 */
export const BUSINESS_TIME_ZONE = "Asia/Tbilisi";
/** English (first release). Business time stays Asia/Tbilisi and money stays GEL regardless of UI language. */
export const LOCALE = "en-GB";

const TETRI_PER_LARI = 100;

export type { Tetri };

export function tetri(amount: number): Tetri {
  if (!Number.isSafeInteger(amount)) {
    throw new RangeError(`Tetri must be a safe integer, got ${amount}`);
  }
  return amount as Tetri;
}

const moneyFormatter = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "GEL",
  currencyDisplay: "narrowSymbol",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats integer tetri as lari, e.g. 12550 → "₾125.50". Division happens only at the display edge. */
export function formatMoney(amount: Tetri): string {
  return moneyFormatter.format(amount / TETRI_PER_LARI);
}

const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: BUSINESS_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

const dateTimeFormatter = new Intl.DateTimeFormat(LOCALE, {
  timeZone: BUSINESS_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/** Formats a UTC instant (ISO-8601 string or Date) as a Tbilisi calendar date. */
export function formatDate(instant: string | Date): string {
  return dateFormatter.format(toDate(instant));
}

/** Formats a UTC instant as Tbilisi date and time (24h). */
export function formatDateTime(instant: string | Date): string {
  return dateTimeFormatter.format(toDate(instant));
}

/** Business date (YYYY-MM-DD) of an instant in Asia/Tbilisi — the day boundary users see. */
export function businessDate(instant: string | Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(toDate(instant));
  const part = (type: Intl.DateTimeFormatPartTypes): string =>
    parts.find((p) => p.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}

function toDate(instant: string | Date): Date {
  const date = instant instanceof Date ? instant : new Date(instant);
  if (Number.isNaN(date.getTime())) {
    throw new RangeError(`Invalid instant: ${String(instant)}`);
  }
  return date;
}
