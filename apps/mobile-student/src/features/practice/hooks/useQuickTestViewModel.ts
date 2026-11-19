import { sampleTestRuns } from "@/data/practice/sampleTestRuns";
import { quickTestDefinition, passingScore } from "../definition";
import { isPassed, passStreak, pluralize } from "../domain/quickTest";

/** Quick-test landing: "exam-ready" streak and the history of the last runs. */
export function useQuickTestViewModel() {
  const { passesInRowGoal: goal, questionCount } = quickTestDefinition;
  const streak = passStreak(sampleTestRuns, passingScore, goal);
  const ready = streak >= goal;

  return {
    readyPct: `${streak}/${goal}`,
    readyDash: `${(streak / goal) * 100} 100`,
    readyFraction: streak / goal,
    readyTitle: ready
      ? `Exam-ready: ${goal} passes in a row`
      : streak === 0
        ? "Start your streak"
        : `${pluralize(streak, "pass", "passes")} in a row`,
    readySub: ready
      ? "Keep it up until exam day."
      : `Pass ${goal - streak} more in a row to be exam-ready. One failed test resets the streak.`,
    streakPips: Array.from({ length: goal }, (_, i) => ({
      bg: i + 1 <= streak ? "#12A06A" : "#E4E8F8",
    })),
    history: sampleTestRuns.map((run, i) => {
      const ok = isPassed(run.score, passingScore);
      return {
        key: i,
        score: String(run.score),
        when: run.when,
        time: `${run.time} min`,
        verdict: ok ? "Passed" : `Failed · ${questionCount - run.score} mistakes`,
        fg: ok ? "#0B8457" : "#D92D3A",
        badgeBg: ok ? "#12A06A" : "#E5484D",
        ok,
      };
    }),
  };
}
