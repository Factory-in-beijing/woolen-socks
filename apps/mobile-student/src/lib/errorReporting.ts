/**
 * Port for reporting unexpected errors (principle 11/23). The default does nothing; the Crashlytics adapter is
 * attached at app start once Firebase is connected. Never pass personal data, tokens or codes in `context`.
 */
export type ErrorReporter = (error: Error, context?: Record<string, string>) => void;

let reporter: ErrorReporter = () => {};

export function setErrorReporter(next: ErrorReporter): void {
  reporter = next;
}

export function reportError(error: Error, context?: Record<string, string>): void {
  try {
    reporter(error, context);
  } catch {
    // Reporting must never throw into the screen that is already failing.
  }
}
