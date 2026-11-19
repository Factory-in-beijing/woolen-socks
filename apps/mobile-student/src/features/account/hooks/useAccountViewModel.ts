import { useEffect, useRef, useState } from "react";
import { sampleLicenceCategories } from "@/data/practice/sampleTickets";
import { sampleModules } from "@/data/course/sampleCourse";
import { sampleProgress } from "@/data/course/sampleProgress";
import { at } from "@/lib/collections";
import { setLicenceCategory, useLicenceCategory } from "@/state/licenceCategory";
import { setReminders, useReminders } from "@/state/reminders";
import { TICKET_LANGUAGES, setTicketLanguage, useTicketLanguage } from "@/state/ticketLanguage";
import { useDisclosure } from "@/hooks/useDisclosure";

/** How long the "Tap again to log out" confirmation stays before it resets. */
const LOGOUT_CONFIRM_MS = 4000;
/** Circumference of the progress ring (r = 31) in px. */
const RING_CIRCUMFERENCE = 194.8;

export function useAccountViewModel() {
  const ticketLanguage = useTicketLanguage();
  const category = useLicenceCategory();
  const reminders = useReminders();
  const categorySheet = useDisclosure();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const { completedModules, videosWatchedInModule } = sampleProgress;
  const total = sampleModules.reduce((sum, m) => sum + m.lessons.length, 0);
  const watched =
    sampleModules.slice(0, completedModules).reduce((sum, m) => sum + m.lessons.length, 0) +
    videosWatchedInModule;
  const currentLesson = at(at(sampleModules, completedModules).lessons, videosWatchedInModule);
  const language = TICKET_LANGUAGES.find((l) => l.code === ticketLanguage) ?? TICKET_LANGUAGES[0];

  return {
    pct: `${Math.round((watched / total) * 100)}%`,
    ringDash: ((watched / total) * RING_CIRCUMFERENCE).toFixed(1),
    watched: String(watched),
    total: String(total),
    mods: String(completedModules),
    mNum: String(completedModules + 1),
    lesson: currentLesson.title,
    langName: language.native,
    langs: TICKET_LANGUAGES.map((l) => {
      const selected = l.code === ticketLanguage;
      return {
        code: l.code,
        native: l.native,
        en: l.english,
        short: selected ? "" : l.short,
        markShow: selected ? ("flex" as const) : ("none" as const),
        bg: selected ? "#FFB200" : "#F6F7FD",
        border: { borderWidth: 1, borderColor: selected ? "#FFB200" : "#EEF0F8" },
        shadow: selected ? "0 10px 18px -10px rgba(176,122,0,0.6)" : undefined,
        subFg: selected ? "rgba(10,14,46,0.72)" : "#8A93B8",
        codeBg: selected ? "#0A0E2E" : "#FFFFFF",
        codeFg: selected ? "#FFB200" : "#566086",
        pick: () => setTicketLanguage(l.code),
      };
    }),
    remindOn: reminders.on,
    remindTrack: reminders.on ? "#12A06A" : "#D7DBEC",
    remindJustify: reminders.on ? ("flex-end" as const) : ("flex-start" as const),
    remindSub: reminders.on ? "Every day at 19:00" : "Off",
    remindToggle: () => setReminders({ ...reminders, on: !reminders.on }),
    confirm: confirmLogout,
    notConfirm: !confirmLogout,
    logout: () => {
      setConfirmLogout(true);
      timer.current = setTimeout(() => setConfirmLogout(false), LOGOUT_CONFIRM_MS);
    },
    cancelLogout: () => setConfirmLogout(false),
    catCode: at(sampleLicenceCategories, category).code,
    catOpen: categorySheet.open,
    openCat: categorySheet.show,
    closeSheet: categorySheet.hide,
    cats: sampleLicenceCategories.map((c, k) => {
      const on = k === category;
      return {
        code: c.code,
        name: c.name,
        n: c.tickets.toLocaleString("en-US"),
        bg: on ? "#FFFFFF" : "#F4F6FC",
        border: { borderWidth: 2, borderColor: on ? "#0E1C91" : "transparent" },
        shadow: on ? "0 10px 24px rgba(14,28,145,0.16)" : undefined,
        check: on ? ("flex" as const) : ("none" as const),
        pick: () => {
          setLicenceCategory(k);
          categorySheet.hide();
        },
      };
    }),
  };
}
