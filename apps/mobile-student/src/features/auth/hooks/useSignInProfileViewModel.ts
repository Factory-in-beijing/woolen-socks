import { TICKET_LANGUAGES, setTicketLanguage, useTicketLanguage } from "@/state/ticketLanguage";

/** Ticket-language options for the last sign-up step; the choice is shared app-wide. */
export function useSignInProfileViewModel() {
  const selected = useTicketLanguage();
  return {
    languages: TICKET_LANGUAGES.map((language) => ({
      ...language,
      selected: language.code === selected,
      pick: () => setTicketLanguage(language.code),
    })),
  };
}
