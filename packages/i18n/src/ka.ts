/** Georgian text catalog. UI text lives here, never inline in components (FE base). */
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
  system: {
    buildInfo: "ბილდის ინფორმაცია",
    timeZone: "დროის სარტყელი",
    serverTime: "სერვერის დრო (თბილისი)",
    sampleAmount: "თანხის ფორმატი",
  },
} as const;

export type Catalog = typeof ka;
