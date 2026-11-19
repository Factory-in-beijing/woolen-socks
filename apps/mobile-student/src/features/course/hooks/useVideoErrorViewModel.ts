import { useEffect, useRef, useState } from "react";
import { useLessonPlayer } from "./useLessonPlayer";

/** How long the sample "Try again" check lasts; replaced by the real reload of the video source. */
const SAMPLE_RETRY_MS = 1400;

/** The lesson player with its "this lesson didn't load" state and a Try again action. */
export function useVideoErrorViewModel() {
  const player = useLessonPlayer();
  const [checking, setChecking] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const retry = () => {
    if (checking) return;
    setChecking(true);
    timer.current = setTimeout(() => setChecking(false), SAMPLE_RETRY_MS);
  };

  return {
    ...player,
    errTitle: checking ? "Loading the lesson…" : "This lesson didn't load",
    retryLabel: checking ? "Trying…" : "Try again",
    checking,
    retry,
  };
}
