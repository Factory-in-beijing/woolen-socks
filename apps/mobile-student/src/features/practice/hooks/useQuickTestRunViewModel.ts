import { useEffect, useRef, useState } from "react";
import { font } from "@/theme/fonts";
import { quickTestDefinition } from "../definition";
import { at } from "@/lib/collections";

type Scene = "stop" | "cross";
type Question = { scene: Scene; right: number; q: string; a: [string, string, string] };

/** SAMPLE questions: the two design questions alternate. Real questions come from the API. */
const SAMPLE_POOL: Question[] = [
  {
    scene: "stop",
    right: 1,
    q: "What does this sign require you to do?",
    a: [
      "Slow down and give way only if a car is coming",
      "Stop completely at the stop line, then give way",
      "Stop only if there is a pedestrian on the crossing",
    ],
  },
  {
    scene: "cross",
    right: 1,
    q: "You reach a crossroads of two equal roads with no signs or traffic lights. Who must give way?",
    a: [
      "The grey car gives way to you",
      "You give way to the grey car on your right",
      "Whoever enters the crossroads first goes first",
    ],
  },
];
const questionAt = (n: number) => at(SAMPLE_POOL, n % 2);

/** SAMPLE state the screen opens in: on question 7, five answered, one skipped, 312 s elapsed. */
const START = {
  question: 7,
  answers: { 1: 1, 2: 1, 3: 0, 4: 1, 6: 1 } as Record<number, number>,
  skipped: [5],
  seen: 7,
  elapsedSeconds: 312,
};

/** How long the wrong answer that goes over the limit stays on screen before the test ends. */
const OVER_LIMIT_PAUSE_MS = 1100;
const TICK_MS = 1000;

type StripState = "now" | "ok" | "bad" | "skip" | "todo";
const STRIP_COLOR: Record<StripState, string> = {
  now: "#0E1C91",
  ok: "#12A06A",
  bad: "#E5484D",
  skip: "#FFF4D6",
  todo: "#DDE2FA",
};
const STRIP_LABEL: Record<StripState, string> = {
  now: "current",
  ok: "correct",
  bad: "wrong",
  skip: "skipped",
  todo: "not seen yet",
};

/** Running quick test: question navigation, answers with immediate feedback, mistake limit, skipped questions, timer. */
export function useQuickTestRunViewModel() {
  const { questionCount, maxMistakes, timeLimitMinutes } = quickTestDefinition;
  const [question, setQuestion] = useState(START.question);
  const [answers, setAnswers] = useState(START.answers);
  const [skipped, setSkipped] = useState(START.skipped);
  const [seen, setSeen] = useState(START.seen);
  const [quitOpen, setQuitOpen] = useState(false);
  const [ended, setEnded] = useState(false);
  const [elapsed, setElapsed] = useState(START.elapsedSeconds);
  const endTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const limitSeconds = timeLimitMinutes * 60;
  useEffect(() => {
    // What happens when time runs out is not defined yet (open question): the clock simply stops at 00:00.
    const id = setInterval(() => setElapsed((e) => Math.min(limitSeconds, e + 1)), TICK_MS);
    return () => clearInterval(id);
  }, [limitSeconds]);
  useEffect(() => () => clearTimeout(endTimer.current), []);

  const current = questionAt(question);
  const chosen = answers[question];
  const answered = chosen !== undefined;
  let okCount = 0;
  let badCount = 0;
  for (const [number, choice] of Object.entries(answers)) {
    if (choice === questionAt(Number(number)).right) okCount++;
    else badCount++;
  }
  const overLimit = badCount > maxMistakes;
  const answeredCount = Object.keys(answers).length;
  const allDone = answeredCount === questionCount;
  const otherSkipped = skipped.filter((x) => x !== question);

  const goTo = (n: number) => {
    setQuestion(n);
    setSeen(Math.max(seen, n));
  };

  const left = limitSeconds - elapsed;
  const finishing = answered && allDone;

  return {
    qNum: String(question),
    question: current.q,
    scene: current.scene,
    answers: current.a.map((text, i) => {
      const isRight = answered && i === current.right;
      const isWrong = answered && i === chosen && i !== current.right;
      const marked = isRight || isWrong;
      return {
        key: i,
        text,
        letter: marked ? "" : at(["A", "B", "C"], i),
        markShow: marked ? ("flex" as const) : ("none" as const),
        isRight,
        fontFamily: marked ? font.manrope[800] : font.manrope[600],
        bg: isRight ? "#E7F6EF" : isWrong ? "#FFE8EA" : "#FFFFFF",
        border: isRight
          ? { borderWidth: 2, borderColor: "#12A06A" }
          : isWrong
            ? { borderWidth: 2, borderColor: "#E5484D" }
            : { borderWidth: 1.5, borderColor: "#E8EBF7" },
        shadow: answered ? undefined : "0 4px 12px rgba(14,28,145,0.04)",
        badgeBg: isRight ? "#12A06A" : isWrong ? "#E5484D" : "#EEF1FF",
        badgeFg: marked ? "#FFFFFF" : "#0E1C91",
        op: answered && !marked ? 0.5 : 1,
        pick: () => {
          if (answered || ended) return;
          setAnswers((current) =>
            current[question] === undefined ? { ...current, [question]: i } : current,
          );
          setSkipped((current) => current.filter((x) => x !== question));
          // The wrong answer that goes over the limit stays on screen for a moment, then the test ends.
          if (i !== current.right && badCount + 1 > maxMistakes)
            endTimer.current = setTimeout(() => setEnded(true), OVER_LIMIT_PAUSE_MS);
        },
      };
    }),
    strip: Array.from({ length: questionCount }, (_, k) => {
      const n = k + 1;
      const a = answers[n];
      const state: StripState =
        n === question
          ? "now"
          : a !== undefined
            ? a === questionAt(n).right
              ? "ok"
              : "bad"
            : skipped.includes(n)
              ? "skip"
              : "todo";
      const reachable = n <= seen;
      return {
        key: n,
        h: state === "now" ? 10 : 6,
        bg: STRIP_COLOR[state],
        border:
          state === "skip"
            ? { borderWidth: 1.5, borderColor: "#FFB200" }
            : { borderWidth: 0, borderColor: "transparent" },
        aria: `Question ${n}, ${STRIP_LABEL[state]}`,
        go: () => {
          if (reachable) goTo(n);
        },
      };
    }),
    okN: String(okCount),
    badN: String(badCount),
    maxMist: String(maxMistakes),
    badBg: overLimit ? "#FFD5DA" : "#FFE8EA",
    badBorder: overLimit
      ? { borderWidth: 1.5, borderColor: "#E5484D" }
      : { borderWidth: 0, borderColor: "transparent" },
    badWord: overLimit ? "over limit" : "mistakes",
    answeredN: String(answeredCount),
    questionCount,
    skipN: String(otherSkipped.length),
    skipBg: otherSkipped.length ? "#FFF4D6" : "#F1F3FB",
    skipDot: otherSkipped.length ? "#E59F00" : "#B8C0DD",
    skipFg: otherSkipped.length ? "#8A5B00" : "#8A93B8",
    timeLeft: `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`,
    timeFraction: left / limitSeconds,
    prev: () => {
      if (question > 1) goTo(question - 1);
    },
    prevOp: question > 1 ? 1 : 0.4,
    nextLabel: finishing
      ? "Finish test"
      : answered
        ? question === questionCount && otherSkipped[0]
          ? "To skipped questions"
          : "Next question"
        : "Skip for now",
    nextSubShow: answered ? ("none" as const) : ("flex" as const),
    finishShow: finishing ? ("flex" as const) : ("none" as const),
    nextBg: answered ? "#FFB200" : "#FFFFFF",
    nextBorder: answered
      ? { borderWidth: 0, borderColor: "transparent" }
      : { borderWidth: 1.5, borderColor: "#E2E6F6" },
    nextShadow: answered ? "0 14px 30px rgba(14,28,145,0.2)" : undefined,
    nextDotBg: answered ? "#0A0E2E" : "#F1F3FB",
    nextDotFg: answered ? "#FFB200" : "#0A0E2E",
    next: () => {
      const nextSkipped = answered
        ? skipped
        : skipped.includes(question)
          ? skipped
          : [...skipped, question];
      let to: number | null = question < questionCount ? question + 1 : null;
      if (to === null) to = nextSkipped.filter((x) => x !== question)[0] ?? null;
      if (to === null) return;
      setSkipped(nextSkipped);
      goTo(to);
    },
    quitOpen: quitOpen && !ended,
    endedOpen: ended,
    endAt: String(question),
    overLimitOrdinal: `${maxMistakes + 1}th`,
    askQuit: () => {
      if (!ended) setQuitOpen(true);
    },
    closeQuit: () => setQuitOpen(false),
  };
}
