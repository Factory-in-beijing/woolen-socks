import { createSharedValue } from "./createSharedValue";

/** Languages the theory tickets are available in (content language, not the UI language). */
export const TICKET_LANGUAGES = [
  { code: "KA", short: "GEO", native: "ქართული", english: "Georgian" },
  { code: "EN", short: "ENG", native: "English", english: "English" },
  { code: "RU", short: "RUS", native: "Русский", english: "Russian" },
  { code: "AZ", short: "AZE", native: "Azərbaycanca", english: "Azerbaijani" },
  { code: "HY", short: "ARM", native: "Հայերեն", english: "Armenian" },
  { code: "TR", short: "TUR", native: "Türkçe", english: "Turkish" },
] as const;

export type TicketLanguageCode = (typeof TICKET_LANGUAGES)[number]["code"];

// One value for the whole app: chosen at sign-up, shown and changed in Account.
const ticketLanguage = createSharedValue<TicketLanguageCode>("KA");

export const setTicketLanguage = ticketLanguage.set;
export const useTicketLanguage = ticketLanguage.use;
