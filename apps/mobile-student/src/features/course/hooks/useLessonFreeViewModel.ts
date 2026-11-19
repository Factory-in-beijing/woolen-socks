import { usePlayback } from "./usePlayback";

/** SAMPLE: length (seconds) and start position of the free lesson; the real values come from the lesson record. */
const FREE_LESSON_SECONDS = 680;
const FREE_LESSON_START_SECONDS = 125;
const SPEEDS = ["1×", "1.25×", "1.5×", "2×", "0.75×"] as const;

/** The free lesson's player controls. */
export function useLessonFreeViewModel() {
  return usePlayback(FREE_LESSON_SECONDS, FREE_LESSON_START_SECONDS, SPEEDS);
}
