import { useState } from "react";
import { formatDuration } from "../domain/duration";

const SKIP_SECONDS = 10;
const show = (visible: boolean) => (visible ? ("flex" as const) : ("none" as const));

/**
 * Position, play/pause and speed of a video. The video itself is not played yet: only these values are tracked
 * so the screens behave like the design until the real video source is attached.
 */
export function usePlayback(length: number, initialSeconds: number, speeds: readonly string[]) {
  const [position, setPosition] = useState(initialSeconds);
  const [playing, setPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const t = Math.max(0, Math.min(length, position));

  return {
    seconds: t,
    length,
    percent: (t / length) * 100,
    tLabel: formatDuration(t),
    lenLabel: formatDuration(length),
    playing,
    playShow: show(!playing),
    pauseShow: show(playing),
    playLabel: playing ? "Pause" : "Play",
    toggle: () => setPlaying((value) => !value),
    back10: () => setPosition(Math.max(0, t - SKIP_SECONDS)),
    fwd10: () => setPosition(Math.min(length, t + SKIP_SECONDS)),
    seekTo: (seconds: number) => setPosition(Math.max(0, Math.min(length, seconds))),
    speed: speeds[speedIndex] ?? speeds[0] ?? "1x",
    speedIndex,
    speedUp: () => setSpeedIndex((i) => (i + 1) % speeds.length),
  };
}
