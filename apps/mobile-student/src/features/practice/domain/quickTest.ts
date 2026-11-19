import type { TestRun } from "@/data/practice/sampleTestRuns";

/** Number of consecutive passes, newest first, counted up to the goal. */
export function passStreak(runs: readonly TestRun[], passingScore: number, goal: number): number {
  let streak = 0;
  for (const run of runs) {
    if (run.score < passingScore) break;
    streak++;
  }
  return Math.min(streak, goal);
}

export const isPassed = (score: number, passingScore: number) => score >= passingScore;

export const pluralize = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
