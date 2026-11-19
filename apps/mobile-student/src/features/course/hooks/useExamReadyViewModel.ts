import { useState } from "react";
import { sampleProgress } from "@/data/course/sampleProgress";
import { at } from "@/lib/collections";

/** Height (px) of the tallest bar in the weekly chart. */
const CHART_MAX_HEIGHT = 92;
const NO_SELECTION = -1;

/** Weekly questions chart of the exam-ready screen: tap a day to see its count, tap again to go back to the total. */
export function useExamReadyViewModel() {
  const week = sampleProgress.weeklyQuestions;
  const [selected, setSelected] = useState(NO_SELECTION);
  const max = Math.max(...week.map((w) => w.count));
  const total = week.reduce((sum, w) => sum + w.count, 0);
  const last = week.length - 1;

  return {
    bars: week.map((w, i) => {
      const today = i === last;
      const on = selected === i;
      return {
        d: today ? "Today" : w.day,
        aria: `${w.day}, ${w.count} questions`,
        on,
        h: Math.round((w.count / max) * CHART_MAX_HEIGHT),
        bg: on ? "#FFB200" : today ? "#0E1C91" : w.count === 0 ? "#EEF0F8" : "#C9D0F5",
        fg: on || today ? "#0A0E2E" : "#8A93B8",
        pick: () => setSelected(on ? NO_SELECTION : i),
      };
    }),
    selVal: selected < 0 ? String(total) : String(at(week, selected).count),
    selLabel:
      selected < 0 ? "in total" : selected === last ? "today" : `on ${at(week, selected).day}`,
  };
}
