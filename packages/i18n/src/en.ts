import type { ErrorCode } from "@drivenet/schemas";

/**
 * English text catalog — the language of the first version of the website and apps.
 * UI text lives here, never inline in components (FE base). Other languages (see ka.ts) must match this shape.
 */
export const en = {
  brand: "DriveNet",
  nav: {
    signIn: "Sign in",
    menu: "Menu",
  },
  landing: {
    // PUB-01 sections are an open question (#18): only the confirmed header is built.
    status: "Site coming soon",
  },
  // Text for every AppError code (principle 13): the server sends `code`, the client shows this text.
  errors: {
    validation_failed: "Please check the information you entered",
    unauthenticated: "Please sign in",
    forbidden: "You don't have permission to do this",
    not_found: "Not found",
    slot_taken: "That time is already taken. Please choose another one",
    hold_expired: "Your reservation expired. Please choose again",
    invalid_transition: "This action isn't possible right now",
    idempotency_conflict: "This request is already being processed",
    version_mismatch: "This data has changed. Please refresh the page",
    rate_limited: "Too many requests. Please try again later",
    dependency_unavailable: "The service is temporarily unavailable. Please try again",
    payment_unavailable: "Payments are temporarily unavailable. Please try again",
    internal_error: "Something went wrong. Please contact support and quote the error code",
  } satisfies Record<ErrorCode, string>,
  screen: {
    loading: "Loading…",
    empty: "Nothing found",
    retry: "Try again",
    errorCode: "Error code",
  },
  system: {
    buildInfo: "Build information",
    timeZone: "Time zone",
    serverTime: "Server time (Tbilisi)",
    sampleAmount: "Amount format",
  },
} as const;

/** Same keys, any string values: what every translation must satisfy. */
type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };
export type Messages = Widen<typeof en>;
