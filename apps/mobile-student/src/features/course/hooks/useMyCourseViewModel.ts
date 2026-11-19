import { useState } from "react";
import { sampleModules, sampleSignGroups, sampleTicketTopics } from "@/data/course/sampleCourse";
import { sampleProgress } from "@/data/course/sampleProgress";
import { durationToSeconds, formatDuration } from "../domain/duration";
import type { MaterialChipRef } from "../domain/courseTypes";
import type { MaterialChipData } from "../domain/materialChip";
import type { ModuleCardData } from "../components/ModuleCard";
import type { LessonRowData } from "../components/LessonRow";
import { at } from "@/lib/collections";

export type CourseRow =
  | { kind: "module"; key: string; module: ModuleCardData; toggle: () => void }
  | { kind: "lesson"; key: string; lesson: LessonRowData };

const toChip = (ref: MaterialChipRef): MaterialChipData => {
  if (ref.kind === "group") {
    const group = sampleSignGroups[ref.id - 1];
    return {
      kind: "group",
      group: ref.id,
      label: group?.title ?? "",
      sub: `${group?.signs ?? 0} signs`,
    };
  }
  const topic = sampleTicketTopics[ref.id - 1];
  return {
    kind: "topic",
    topic: ref.id,
    label: topic?.title ?? "",
    sub: `${topic?.tickets ?? 0} tickets`,
  };
};

const percent = (fraction: number) => Math.round(fraction * 100);

/** Course overview: current lesson card, overall progress and the module accordion. Reads the sample course until the API is attached. */
export function useMyCourseViewModel() {
  const {
    completedModules: cm,
    videosWatchedInModule: cv,
    currentVideoFraction: cur,
  } = sampleProgress;
  const [openModule, setOpenModule] = useState(cm);

  const modules = sampleModules;
  const current = at(at(modules, cm).lessons, cv);
  const totalVideos = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const watched = modules.slice(0, cm).reduce((sum, m) => sum + m.lessons.length, 0) + cv;
  const totalTickets = modules.reduce((sum, m) => sum + m.tickets, 0);
  const coveredTickets = modules.slice(0, cm).reduce((sum, m) => sum + m.tickets, 0);
  const currentSeconds = durationToSeconds(current.duration);
  const left = formatDuration(currentSeconds * (1 - cur));

  const rows: CourseRow[] = modules.flatMap((module, i): CourseRow[] => {
    const count = module.lessons.length;
    const done = i < cm ? count : i === cm ? cv : 0;
    const isDone = done === count;
    const isCurrent = i === cm;
    const expanded = openModule === i;
    const fraction = isDone ? 1 : isCurrent ? (cv + cur) / count : 0;
    const header: CourseRow = {
      kind: "module",
      key: `module-${i}`,
      toggle: () => setOpenModule(expanded ? -1 : i),
      module: {
        index: i,
        title: module.title,
        overline: `Module ${String(i + 1).padStart(2, "0")}${isDone ? " · Completed" : isCurrent ? " · In progress" : ""}`,
        overlineColor: isDone ? "#12A06A" : isCurrent ? "#B07A00" : "#8A93B8",
        meta: `${count} ${count === 1 ? "video" : "videos"} · ${module.tickets} tickets`,
        done: isDone,
        current: isCurrent,
        videosDone: done,
        videosTotal: count,
        progressPercent: percent(fraction),
        expanded,
        accessibilityLabel: `Module ${i + 1}: ${module.title}, ${done} of ${count} videos watched`,
        card: {
          backgroundColor: "#FFFFFF",
          border: isCurrent
            ? { borderWidth: 1.5, borderColor: "#0E1C91" }
            : { borderWidth: 1, borderColor: "#E8EBF7" },
          boxShadow: isCurrent
            ? "0 14px 28px -14px rgba(14,28,145,0.35)"
            : "0 1px 2px rgba(14,28,145,0.04), 0 8px 20px -14px rgba(14,28,145,0.18)",
        },
        tileBackground: isDone
          ? "linear-gradient(145deg, #F0FAF5 0%, #DDF2E8 100%)"
          : isCurrent
            ? "linear-gradient(145deg, #FFF6DC 0%, #FFE6A3 100%)"
            : "linear-gradient(145deg, #F4F6FF 0%, #E3E8FF 100%)",
      },
    };
    if (!expanded) return [header];
    const lessons = module.lessons.map((lesson, j): CourseRow => {
      const isWatched = i < cm || (i === cm && j < cv);
      const isPlaying = i === cm && j === cv;
      const status = isWatched ? "watched" : isPlaying ? "playing" : "todo";
      return {
        kind: "lesson",
        key: `lesson-${i}-${j}`,
        lesson: {
          title: lesson.title,
          duration: lesson.duration,
          status,
          subtitle: isWatched
            ? `Lesson ${j + 1} · Watched`
            : isPlaying
              ? `Now playing · ${formatDuration(durationToSeconds(lesson.duration) * (1 - cur))} left`
              : `Lesson ${j + 1}`,
          isLast: j === count - 1,
          progressPercent: percent(cur),
          materials: lesson.materials.map(toChip),
          accessibilityLabel: `Lesson ${j + 1}: ${lesson.title}, ${lesson.duration}`,
        },
      };
    });
    return [header, ...lessons];
  });

  const stat = (label: string, n: number, of: number) => ({
    label,
    n: String(n),
    of: `/${of}`,
    percent: percent(n / of),
    accessibilityLabel: `${label}: ${n} of ${of}`,
  });

  return {
    current: {
      title: current.title,
      line: `Module ${cm + 1} · ${cv + 1}/${at(modules, cm).lessons.length}`,
      left,
      percent: percent(cur),
    },
    ringPercent: percent(watched / totalVideos),
    segments: modules.map((module, i) => ({
      percent: i < cm ? 100 : i === cm ? percent((cv + cur) / module.lessons.length) : 0,
      color: i < cm ? "#0E1C91" : "#FFB200",
      lessons: module.lessons.length,
    })),
    stats: [
      stat("Videos", watched, totalVideos),
      stat("Modules", cm, modules.length),
      stat("Tickets covered", coveredTickets, totalTickets),
    ],
    materials: at(at(modules, cm).lessons, cv).materials.map(toChip),
    rows,
  };
}
