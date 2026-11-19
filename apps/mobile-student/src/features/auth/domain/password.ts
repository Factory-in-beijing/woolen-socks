/** Pure password rules for the sign-up and reset screens (no I/O, easy to unit-test). */

// The rule thresholds come from the design; the server stays the source of truth for validation.
export const MIN_PASSWORD_LENGTH = 8;
export const STRONG_PASSWORD_LENGTH = 12;

export type PasswordChecks = { long: boolean; mixed: boolean; extra: boolean };

export function checkPassword(password: string): PasswordChecks {
  return {
    long: password.length >= MIN_PASSWORD_LENGTH,
    mixed: /[A-Za-z]/.test(password) && /[0-9]/.test(password),
    extra: password.length >= STRONG_PASSWORD_LENGTH || /[^A-Za-z0-9]/.test(password),
  };
}

export function isPasswordAcceptable(password: string): boolean {
  const checks = checkPassword(password);
  return checks.long && checks.mixed;
}

export type PasswordScore = 0 | 1 | 2 | 3;

export function scorePassword(password: string): PasswordScore {
  const { long, mixed, extra } = checkPassword(password);
  return ((long ? 1 : 0) + (mixed ? 1 : 0) + (long && mixed && extra ? 1 : 0)) as PasswordScore;
}
