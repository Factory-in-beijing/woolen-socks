import { quickTestDefinition } from "../definition";
import { at } from "@/lib/collections";

export type TestOutcome = "passed" | "failed";

/** SAMPLE wrong answers shown in the review list; the real list comes from the finished test. */
const SAMPLE_QUESTIONS = [
  { q: "What does this sign require you to do?", yours: "C", right: "B" },
  {
    q: "You reach a crossroads of two equal roads with no signs or traffic lights. Who must give way?",
    yours: "A",
    right: "B",
  },
] as const;

/** SAMPLE finished tests: question numbers answered wrong, time and the streak after the test. */
const SAMPLE_RESULT = {
  passed: { wrong: [7, 18], time: "18:42", streak: 3 },
  failed: { wrong: [3, 7, 11, 14, 18, 22], time: "14:05", streak: 0 },
} as const;

const RING_PASSED = "#3DD598";
const RING_FAILED = "#FF6B78";

/** Result screen of a finished quick test, in its passed or failed variant. */
export function useTestResultViewModel(outcome: TestOutcome) {
  const { questionCount, maxMistakes, passesInRowGoal } = quickTestDefinition;
  const passed = outcome === "passed";
  const sample = SAMPLE_RESULT[outcome];
  const wrong = sample.wrong;
  // A failed test stops at the first mistake over the limit, so later questions were never shown.
  const reached = passed ? questionCount : at(wrong, wrong.length - 1);
  const correct = reached - wrong.length;

  return {
    time: sample.time,
    sub: passed
      ? `${wrong.length} mistakes · limit ${maxMistakes}`
      : `${maxMistakes + 1}th mistake on question ${reached}`,
    okN: String(correct),
    badN: String(wrong.length),
    maxMist: String(maxMistakes),
    heroBg: "#0E1C91",
    ringColor: passed ? RING_PASSED : RING_FAILED,
    ringFraction: correct / questionCount,
    chipBg: passed ? RING_PASSED : RING_FAILED,
    chipFg: "#0A0E2E",
    passed,
    chipLabel: passed ? "Passed" : "Failed",
    title: passed ? "Nice drive!" : "Not this time",
    streakLabel: passed ? `Streak ${sample.streak} of ${passesInRowGoal}` : "Streak reset to 0",
    streakHint: passed
      ? `${passesInRowGoal - sample.streak} more to be exam-ready`
      : `pass ${passesInRowGoal} in a row`,
    pips: Array.from({ length: passesInRowGoal }, (_, i) => ({
      bg: i + 1 <= sample.streak ? "#FFB200" : "rgba(255,255,255,0.18)",
    })),
    mistakes: wrong.map((n) => {
      const sampleQuestion = at(SAMPLE_QUESTIONS, n % 2);
      return {
        key: n,
        num: `#${n}`,
        q: sampleQuestion.q,
        yours: sampleQuestion.yours,
        right: sampleQuestion.right,
        aria: `Question ${n}, you answered ${sampleQuestion.yours}, correct ${sampleQuestion.right}`,
      };
    }),
    againLabel: "Take another test",
  };
}
