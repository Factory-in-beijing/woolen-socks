import type { ErrorCode } from "@drivenet/schemas";
import type { Messages } from "./en.ts";

/**
 * Georgian translation — NOT used in the first (English) release. Kept in sync with `en` by the compiler
 * (`satisfies Messages`) and by a parity test, so enabling Georgian later is a configuration change.
 */
export const ka = {
  brand: "DriveNet",
  nav: {
    signIn: "შესვლა",
    menu: "მენიუ",
  },
  landing: {
    // PUB-01 sections are an open question (#18): only the confirmed header is built.
    status: "საიტი მზადდება",
  },
  // Text for every AppError code (principle 13): the server sends `code`, the client shows this text.
  errors: {
    validation_failed: "გთხოვთ, შეამოწმეთ შეყვანილი მონაცემები",
    unauthenticated: "გთხოვთ, შეხვიდეთ სისტემაში",
    forbidden: "ამ მოქმედების უფლება არ გაქვთ",
    not_found: "ვერ მოიძებნა",
    slot_taken: "ეს დრო უკვე დაკავებულია. გთხოვთ, აირჩიოთ სხვა",
    hold_expired: "დაჯავშნის დრო ამოიწურა. გთხოვთ, ხელახლა აირჩიოთ",
    invalid_transition: "ამ მოქმედების შესრულება ახლა შეუძლებელია",
    idempotency_conflict: "მოთხოვნა უკვე მუშავდება",
    version_mismatch: "მონაცემები შეიცვალა. გთხოვთ, განაახლოთ გვერდი",
    rate_limited: "ძალიან ბევრი მოთხოვნაა. სცადეთ მოგვიანებით",
    dependency_unavailable: "სერვისი დროებით მიუწვდომელია. გთხოვთ, სცადოთ ხელახლა",
    payment_unavailable: "გადახდა დროებით მიუწვდომელია. გთხოვთ, სცადოთ ხელახლა",
    internal_error: "მოულოდნელი შეცდომა. მიგვწერეთ და მიუთითეთ შეცდომის კოდი",
  } satisfies Record<ErrorCode, string>,
  screen: {
    loading: "იტვირთება…",
    empty: "მონაცემები არ მოიძებნა",
    retry: "ხელახლა ცდა",
    errorCode: "შეცდომის კოდი",
  },
  system: {
    buildInfo: "ბილდის ინფორმაცია",
    timeZone: "დროის სარტყელი",
    serverTime: "სერვერის დრო (თბილისი)",
    sampleAmount: "თანხის ფორმატი",
  },
} as const satisfies Messages;
