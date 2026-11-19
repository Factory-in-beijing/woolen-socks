import { sampleModules, sampleSignGroups, sampleTicketTopics } from "@/data/course/sampleCourse";
import { sampleChapters } from "@/data/course/sampleChapters";
import { sampleProgress } from "@/data/course/sampleProgress";
import { durationToSeconds, formatDuration } from "../domain/duration";
import { usePlayback } from "./usePlayback";
import type { MaterialChipData } from "../domain/materialChip";
import type { MaterialChipRef } from "../domain/courseTypes";
import { at } from "@/lib/collections";

export const PLAYBACK_SPEEDS = ["1x", "1.25x", "1.5x", "2x"] as const;

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

/**
 * State and derived data of the lesson player. The video itself is not played yet: only the position,
 * play/pause and speed are tracked so the screens behave like the design until the video source is attached.
 */
export function useLessonPlayer(initialSeconds = 198) {
  const moduleIndex = sampleProgress.completedModules;
  const lessonIndex = sampleProgress.videosWatchedInModule;
  const module = at(sampleModules, moduleIndex);
  const lesson = at(module.lessons, lessonIndex);
  const length = durationToSeconds(lesson.duration);

  const playback = usePlayback(length, initialSeconds, PLAYBACK_SPEEDS);
  const t = playback.seconds;
  const currentChapter = sampleChapters.reduce(
    (found, chapter, i) => (t >= chapter.at ? i : found),
    0,
  );
  const upNext = module.lessons.slice(lessonIndex + 1);

  return {
    mNum: String(moduleIndex + 1),
    mTitle: module.title,
    lNum: String(lessonIndex + 1),
    lOf: String(module.lessons.length),
    lTitle: lesson.title,
    ...playback,
    lenLabel: lesson.duration,
    materials: lesson.materials.map(toChip),
    points: sampleChapters.map((chapter, i) => {
      const active = i === currentChapter;
      return {
        num: String(i + 1),
        text: chapter.title,
        time: formatDuration(chapter.at),
        aria: `Jump to ${formatDuration(chapter.at)}: ${chapter.title}`,
        bg: active ? "#FFF6DF" : "transparent",
        dotBg: active ? "#FFB200" : "#EEF1FF",
        dotFg: active ? "#0A0E2E" : "#0E1C91",
        timeFg: active ? "#8A5B00" : "#8A93B8",
        seek: () => playback.seekTo(chapter.at),
      };
    }),
    next: upNext.map((n, j) => ({
      num: String(lessonIndex + 2 + j),
      title: n.title,
      len: n.duration,
      aria: `Lesson ${lessonIndex + 2 + j}: ${n.title}, ${n.duration}`,
    })),
    nextTitle: upNext[0]?.title ?? "Back to My course",
  };
}
