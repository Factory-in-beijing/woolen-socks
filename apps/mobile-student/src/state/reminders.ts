import { createSharedValue } from "./createSharedValue";

/** Study-reminder settings shared by Account and the Reminders screen. */
export type ReminderSettings = {
  on: boolean;
  hour: number;
  minute: number;
  /** Monday first. */
  days: boolean[];
  topics: { lesson: boolean; tickets: boolean; news: boolean };
};

/** SAMPLE defaults copied from the design (every day at 19:00, lesson and ticket nudges on). */
const reminders = createSharedValue<ReminderSettings>({
  on: true,
  hour: 19,
  minute: 0,
  days: [true, true, true, true, true, true, true],
  topics: { lesson: true, tickets: true, news: false },
});

export const setReminders = reminders.set;
export const getReminders = reminders.get;
export const useReminders = reminders.use;
