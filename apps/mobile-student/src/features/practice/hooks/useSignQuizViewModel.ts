import { useState } from "react";
import { sampleSignGroupContent } from "@/data/signs/sampleSigns";
import { at } from "@/lib/collections";
import { buildQuizOptions } from "../domain/signQuiz";

/** Questions per round and the order they are asked in (signs still to learn first). SAMPLE until the server builds rounds. */
const QUESTION_ORDER = [3, 4, 5, 0, 1, 2];
const NEARLY_THERE_AT = 8;
const COLLAPSED_LINES = 2;

const firstSentence = (text: string) => `${text.split(". ")[0]?.replace(/\.$/, "") ?? ""}.`;

/** A round of the sign quiz: name the sign, immediate feedback, expandable meanings and a results list. */
export function useSignQuizViewModel(groupId: number) {
  const group = sampleSignGroupContent[groupId] ?? sampleSignGroupContent[2];
  if (!group) throw new RangeError(`No sample content for sign group ${groupId}`);
  const { signs } = group;
  const questionCount = QUESTION_ORDER.length;

  const [q, setQ] = useState(0);
  const [picks, setPicks] = useState<Record<number, number>>({});
  const [openMeaning, setOpenMeaning] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);

  const sign = at(QUESTION_ORDER, q);
  const chosen = picks[q];
  const answered = chosen !== undefined;
  const last = q === questionCount - 1;
  const correctCount = QUESTION_ORDER.filter((s, n) => picks[n] === s).length;
  const current = at(signs, sign);

  const answers = buildQuizOptions(signs, sign, q).map((index, n) => {
    const option = at(signs, index);
    const right = answered && index === sign;
    const wrong = answered && index === chosen && index !== sign;
    const marked = right || wrong;
    const key = `${q}:${index}`;
    const expanded = openMeaning[key] ?? right;
    return {
      key,
      name: option.name,
      description: option.description,
      letter: marked ? "" : at(["A", "B", "C"], n),
      isRight: right,
      markShow: marked ? ("flex" as const) : ("none" as const),
      lines: expanded ? undefined : COLLAPSED_LINES,
      expanded,
      toggleLabel: `${expanded ? "Hide" : "Read"} the full meaning of ${option.name}`,
      rot: expanded ? "180deg" : "0deg",
      chevBg: expanded ? "#EEF1FF" : "#F3F5FB",
      bg: right ? "#E7F6EF" : wrong ? "#FFE8EA" : "#FFFFFF",
      border: right
        ? { borderWidth: 2, borderColor: "#12A06A" }
        : wrong
          ? { borderWidth: 2, borderColor: "#E5484D" }
          : { borderWidth: 1.5, borderColor: "#E8EBF7" },
      shadow: answered ? undefined : "0 4px 12px rgba(14,28,145,0.04)",
      op: answered && !marked ? 0.55 : 1,
      badgeBg: right ? "#12A06A" : wrong ? "#E5484D" : "#EEF1FF",
      badgeFg: marked ? "#FFFFFF" : "#0E1C91",
      pick: () => {
        if (!answered) setPicks({ ...picks, [q]: index });
      },
      toggle: () => setOpenMeaning({ ...openMeaning, [key]: !expanded }),
    };
  });

  const wrongQuestions = QUESTION_ORDER.map((_, n) => n).filter(
    (n) => picks[n] !== undefined && picks[n] !== at(QUESTION_ORDER, n),
  );
  const reviewQuestions = wrongQuestions.length ? wrongQuestions : QUESTION_ORDER.map((_, n) => n);
  const restart = () => {
    setQ(0);
    setPicks({});
    setOpenMeaning({});
    setDone(false);
  };

  return {
    qNum: String(q + 1),
    qTotal: String(questionCount),
    strip: QUESTION_ORDER.map((s, n) => {
      const p = picks[n];
      return {
        key: n,
        bg: p === undefined ? (n === q ? "#0E1C91" : "#DDE2FA") : p === s ? "#12A06A" : "#E5484D",
      };
    }),
    answers,
    svg: current.svg,
    codeLabel: `Sign ${current.code}`,
    codeShow: answered ? ("flex" as const) : ("none" as const),
    prompt: answered ? (chosen === sign ? "Correct!" : "Not quite") : "Which sign is this?",
    hintShow: answered ? ("none" as const) : ("flex" as const),
    nextLabel: answered ? (last ? "See results" : "Next sign") : "Pick an answer",
    nextSub: answered
      ? last
        ? `${correctCount} of ${questionCount} correct`
        : `Sign ${q + 2} of ${questionCount}`
      : "Name and meaning must match the sign",
    nextBg: answered ? "#FFB200" : "#FFFFFF",
    nextBorder: answered
      ? { borderWidth: 0, borderColor: "transparent" }
      : { borderWidth: 1.5, borderColor: "#E2E6F6" },
    nextFg: "#0A0E2E",
    nextSubFg: answered ? "#5A4300" : "#8A93B8",
    nextShadow: answered ? "0 14px 30px rgba(14,28,145,0.18)" : undefined,
    nextDotBg: answered ? "#0A0E2E" : "#F1F3FB",
    nextDotFg: answered ? "#FFB200" : "#B8C0DD",
    nextEnabled: answered,
    next: () => {
      if (!answered) return;
      if (last) setDone(true);
      else setQ(q + 1);
    },
    finished: done,
    okN: String(correctCount),
    scoreFraction: correctCount / questionCount,
    // NOTE: the design's "Nearly there" threshold (8) is above the round size (6), so it can never show; kept as designed, open question.
    resTitle:
      correctCount === questionCount
        ? "Perfect round"
        : correctCount >= NEARLY_THERE_AT
          ? "Nearly there"
          : "Keep practising",
    resSub:
      correctCount === questionCount
        ? `All ${questionCount} signs named correctly.`
        : `${questionCount - correctCount} to review. Their meaning is below.`,
    listTitle: wrongQuestions.length ? "Review these" : "Signs in this round",
    listCount: wrongQuestions.length
      ? `${wrongQuestions.length} mistakes`
      : `${questionCount} signs`,
    review: reviewQuestions.map((n) => {
      const reviewed = at(signs, at(QUESTION_ORDER, n));
      const ok = picks[n] === at(QUESTION_ORDER, n);
      return {
        key: n,
        svg: reviewed.svg,
        code: reviewed.code,
        name: reviewed.name,
        desc: firstSentence(reviewed.description),
        dot: ok ? "#12A06A" : "#E5484D",
        ok,
      };
    }),
    restartLabel: "Start again",
    restart,
  };
}
