import { pino, type DestinationStream, type Logger } from "pino";

export type { Logger };

/** PII, tokens and one-time codes never reach logs (principle 15). Keys are redacted wherever they appear one level deep. */
const SENSITIVE_KEYS = [
  "phone",
  "email",
  "code",
  "otp",
  "token",
  "idToken",
  "password",
  "authorization",
  "cookie",
];

export interface LoggerOptions {
  level?: string;
  destination?: DestinationStream;
}

export function createLogger(options: LoggerOptions = {}): Logger {
  const config = {
    level: options.level ?? "info",
    // Cloud Logging reads `severity`; keep the level label instead of pino's numeric level.
    formatters: { level: (label: string) => ({ severity: label.toUpperCase() }) },
    redact: {
      paths: [
        ...SENSITIVE_KEYS,
        ...SENSITIVE_KEYS.map((k) => `*.${k}`),
        "req.headers.authorization",
        "req.headers.cookie",
      ],
      censor: "[redacted]",
    },
  };
  return options.destination ? pino(config, options.destination) : pino(config);
}
