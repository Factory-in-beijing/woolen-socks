/** Pure helpers for the card form (display formatting only; card data is never stored, logged or sent from this app). */

export type CardBrand = "visa" | "mc" | "generic";

export const CARD_NUMBER_LENGTH = 16;
export const CARD_EXPIRY_LENGTH = 4;
export const CARD_CVC_LENGTH = 3;
export const CARD_NAME_MAX_LENGTH = 26;

export const digitsOnly = (value: string, max: number) => value.replace(/\D/g, "").slice(0, max);

export const cleanCardName = (value: string) =>
  value.replace(/[^A-Za-z\s\-'.]/g, "").slice(0, CARD_NAME_MAX_LENGTH);

export function cardBrand(number: string): CardBrand {
  if (/^4/.test(number)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(number)) return "mc";
  return "generic";
}

/** "4111111111111111" -> "4111 1111 1111 1111" */
export const formatCardNumber = (number: string) => number.replace(/(\d{4})(?=\d)/g, "$1 ");

/** "1228" -> "12 / 28" (input field). */
export const formatExpiryField = (expiry: string) =>
  expiry.length > 2 ? `${expiry.slice(0, 2)} / ${expiry.slice(2)}` : expiry;

/** "1228" -> "12/28" (card preview), placeholder while empty. */
export function formatExpiryPreview(expiry: string): string {
  if (!expiry) return "MM/YY";
  return expiry.slice(0, 2) + (expiry.length > 2 ? `/${expiry.slice(2)}` : "");
}

export function isCardFormComplete(form: {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}): boolean {
  return (
    form.number.length === CARD_NUMBER_LENGTH &&
    form.expiry.length === CARD_EXPIRY_LENGTH &&
    form.cvc.length === CARD_CVC_LENGTH &&
    form.name.trim().length > 1
  );
}
