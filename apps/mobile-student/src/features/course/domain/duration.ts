/** "12:10" -> 730 seconds */
export function durationToSeconds(text: string): number {
  const [minutes = 0, seconds = 0] = text.split(":").map(Number);
  return minutes * 60 + seconds;
}

/** 730 -> "12:10" */
export function formatDuration(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}
