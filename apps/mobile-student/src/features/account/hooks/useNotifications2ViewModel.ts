import { useState } from "react";
import { EVERY_DAY, WEEKDAYS, WEEKENDS, daysSummary, pad2, wheelValues } from "@/lib/reminders";
import { setReminders, useReminders, type ReminderSettings } from "@/state/reminders";

type Topic = keyof ReminderSettings["topics"];
const TOPICS: Topic[] = ["lesson", "tickets", "news"];
const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
/** Quick time presets. */
const PRESETS = [
  { hour: 8, minute: 0, label: "Morning" },
  { hour: 13, minute: 0, label: "Midday" },
  { hour: 19, minute: 0, label: "Evening" },
  { hour: 21, minute: 30, label: "Night" },
] as const;

/**
 * SAMPLE reminder copy per topic, rotated by tapping the preview notification. The real texts come from the
 * notification templates (M7); the sample only shows how the preview changes with the chosen topics.
 */
const SAMPLE_MESSAGES: Record<Topic, Array<[string, string]>> = {
  lesson: [
    ["Your next lesson is waiting", "Controlled intersections · 12 min"],
    ["10 minutes today, one step closer", "Pick up Module 3 where you left off"],
    ["Ready for lesson 3?", "Controlled intersections is up next"],
  ],
  tickets: [
    ["A few tickets before bed?", "Keep the rules fresh in your head"],
    ["How many can you get right today?", "Open Tickets and test yourself"],
    ["Exam day gets easier with practice", "Jump into Tickets for a quick round"],
  ],
  news: [["New lesson added", "See what is new in your course"]],
};
const FALLBACK_MESSAGE: [string, string] = ["Time to study", "Open DriveNet and keep going"];

const ACTIVE_CARD = "linear-gradient(160deg, #1A2CC4 0%, #0E1C91 70%)";
const ACTIVE_TILE = "#FFFFFF";
const IDLE_TILE = "linear-gradient(145deg, #F4F6FF 0%, #E3E8FF 100%)";
const ACTIVE_DAY = "linear-gradient(180deg, #1A2CC4 0%, #0E1C91 100%)";

/** Reminder settings screen: master switch, time wheels, days, topics and a live preview of the notification. */
export function useNotifications2ViewModel() {
  const settings = useReminders();
  const [messageIndex, setMessageIndex] = useState(0);
  const { on, hour, minute, days, topics } = settings;
  const update = (patch: Partial<ReminderSettings>) => setReminders({ ...settings, ...patch });

  const summary = daysSummary(days);
  const count = days.filter(Boolean).length;
  const pool = TOPICS.filter((t) => topics[t]).flatMap((t) => SAMPLE_MESSAGES[t]);
  const messages = pool.length ? pool : [FALLBACK_MESSAGE];
  const index = messageIndex % messages.length;
  const [title, body] = on
    ? (messages[index] ?? FALLBACK_MESSAGE)
    : (["Reminders are off", "Turn them on to stay on track"] as [string, string]);
  const topicCount = TOPICS.filter((t) => topics[t]).length;

  const segments = [
    { label: "Every day", set: EVERY_DAY },
    { label: "Weekdays", set: WEEKDAYS },
    { label: "Weekends", set: WEEKENDS },
  ].map(({ label, set }) => {
    const active = days.every((v, i) => v === set[i]);
    return {
      label,
      bg: active ? "#0A0E2E" : "transparent",
      fg: active ? "#FFFFFF" : "#6B7396",
      tap: () => update({ days: [...set] }),
    };
  });

  return {
    timeVal: `${pad2(hour)}:${pad2(minute)}`,
    heroDays: !on ? "Reminders off" : count === 0 ? "No days selected" : summary,
    clockOpacity: on ? 1 : 0.4,
    notifTitle: title,
    notifBody: body,
    notifOpacity: on ? 1 : 0.55,
    msgCount: on ? `${index + 1} / ${messages.length}` : "",
    nextMsg: () => setMessageIndex(messageIndex + 1),
    dim: on ? 1 : 0.4,
    controlsEnabled: on,
    daysSummary: summary,
    daysColor: count === 0 ? "#D92D3A" : "#6B7396",
    masterLabel: on ? "On" : "Off",
    masterTrack: on ? "#0E1C91" : "rgba(10,14,46,0.2)",
    masterJustify: on ? ("flex-end" as const) : ("flex-start" as const),
    masterKnob: on ? "#FFB200" : "#FFFFFF",
    masterTap: () => update({ on: !on }),
    hours: wheelValues(hour, 24).map((value) => ({
      value,
      label: pad2(value),
      tap: () => update({ hour: value }),
    })),
    minutes: wheelValues(minute, 60).map((value) => ({
      value,
      label: pad2(value),
      tap: () => update({ minute: value }),
    })),
    presets: PRESETS.map((p, i) => {
      const active = hour === p.hour && minute === p.minute;
      return {
        key: i,
        time: `${pad2(p.hour)}:${pad2(p.minute)}`,
        aria: `${p.label}, ${pad2(p.hour)}:${pad2(p.minute)}`,
        bg: active ? "#FFB200" : "rgba(255,255,255,0.08)",
        fg: active ? "#0A0E2E" : "#FFFFFF",
        border: { borderWidth: 1, borderColor: active ? "#FFB200" : "rgba(255,255,255,0.14)" },
        icon: active ? "#0A0E2E" : "#FFB200",
        tap: () => update({ hour: p.hour, minute: p.minute }),
      };
    }),
    segments,
    dayCells: DAY_NAMES.map((name, i) => {
      const active = Boolean(days[i]);
      return {
        name,
        bg: active ? ACTIVE_DAY : "#F3F5FC",
        fg: active ? "#FFFFFF" : "#8A93B8",
        dot: active ? "#FFB200" : "#D5DAEE",
        shadow: active ? "0 10px 18px -10px rgba(14,28,145,0.8)" : undefined,
        tap: () => update({ days: days.map((v, k) => (k === i ? !v : v)) }),
      };
    }),
    topicCount: topicCount === 0 ? "Pick at least one" : `${topicCount} of 3`,
    topicCards: TOPICS.map((topic) => {
      const active = topics[topic];
      return {
        topic,
        bg: active ? ACTIVE_CARD : "#FFFFFF",
        border: { borderWidth: 1, borderColor: active ? "transparent" : "#E8EBF7" },
        fg: active ? "#FFFFFF" : "#0A0E2E",
        sub: active ? "rgba(255,255,255,0.72)" : "#8A93B8",
        tile: active ? ACTIVE_TILE : IDLE_TILE,
        checkBg: active ? "#FFFFFF" : "transparent",
        checkBorder: { borderWidth: 2, borderColor: active ? "#FFFFFF" : "#D5DAEE" },
        checkOpacity: active ? 1 : 0,
        shadow: active ? "0 16px 28px -16px rgba(14,28,145,0.8)" : undefined,
        tap: () => {
          update({ topics: { ...topics, [topic]: !active } });
          setMessageIndex(0);
        },
      };
    }),
  };
}
