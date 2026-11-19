import { useEffect, useState } from "react";
import { sampleChapters } from "@/data/course/sampleChapters";
import { formatDuration } from "../domain/duration";
import { PLAYBACK_SPEEDS } from "./useLessonPlayer";
import { usePlayback } from "./usePlayback";

/** SAMPLE length (seconds) of the landscape player video. */
const FULL_VIDEO_SECONDS = 520;
const START_SECONDS = 198;
const TICK_MS = 1000;
/** Right inset (px) the controls keep clear of the chapters panel when it is open. */
const CHAPTERS_PANEL_INSET = 316;
const CHAPTERS_BAR_INSET = 332;
const BAR_INSET = 56;

const speedFactor = (label: string) => Number.parseFloat(label);

/** Landscape player: controls overlay, chapters panel and a one-second playback tick. */
export function useVideoFullViewModel() {
  const playback = usePlayback(FULL_VIDEO_SECONDS, START_SECONDS, PLAYBACK_SPEEDS);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [chaptersOpen, setChaptersOpen] = useState(false);

  const { playing, seconds, seekTo, speed } = playback;
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => seekTo(seconds + speedFactor(speed)), TICK_MS);
    return () => clearInterval(id);
  }, [playing, seconds, seekTo, speed]);

  const currentChapter = sampleChapters.reduce(
    (found, chapter, i) => (seconds >= chapter.at ? i : found),
    0,
  );

  return {
    ...playback,
    ui: controlsVisible,
    uiLabel: controlsVisible ? "Hide controls" : "Show controls",
    scrim: controlsVisible ? "rgba(6,11,74,0.35)" : "transparent",
    toggleUi: () => {
      setControlsVisible((visible) => !visible);
      if (controlsVisible) setChaptersOpen(false);
    },
    chaptersOpen,
    chBg: chaptersOpen ? "#FFFFFF" : "rgba(10,14,46,0.38)",
    chFg: chaptersOpen ? "#0A0E2E" : "#FFFFFF",
    chBorder: chaptersOpen ? "#FFFFFF" : "rgba(255,255,255,0.22)",
    toggleCh: () => setChaptersOpen((open) => !open),
    centerRight: chaptersOpen ? CHAPTERS_PANEL_INSET : 0,
    barRight: chaptersOpen ? CHAPTERS_BAR_INSET : BAR_INSET,
    /** Tap on the progress bar: fraction 0..1 of its width. */
    seekFraction: (fraction: number) =>
      seekTo(Math.round(Math.max(0, Math.min(1, fraction)) * FULL_VIDEO_SECONDS)),
    chNum: String(currentChapter + 1),
    chTitle: sampleChapters[currentChapter]?.title ?? "",
    chapters: sampleChapters.map((chapter, i) => {
      const active = i === currentChapter;
      return {
        n: String(i + 1),
        title: chapter.title,
        at: formatDuration(chapter.at),
        bg: active ? "rgba(255,178,0,0.16)" : "transparent",
        numBg: active ? "#FFB200" : "rgba(255,255,255,0.12)",
        numFg: active ? "#0A0E2E" : "#FFFFFF",
        go: () => seekTo(chapter.at),
      };
    }),
  };
}
