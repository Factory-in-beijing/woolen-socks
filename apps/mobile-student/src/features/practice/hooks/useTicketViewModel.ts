import { useState } from "react";
import { sampleSession, sampleTickets, type SampleTicket } from "@/data/practice/sampleQuestions";
import { font } from "@/theme/fonts";
import { at } from "@/lib/collections";

const ticketAt = (position: number): SampleTicket =>
  at(sampleTickets, (((position - sampleSession.first) % 3) + 3) % 3);

/** Answers of questions already done when the screen opens (all correct except one). */
function initialAnswers(): Record<number, number> {
  const answers: Record<number, number> = {};
  for (let p = 1; p < sampleSession.first; p++) answers[p] = ticketAt(p).right;
  answers[sampleSession.wrongPosition] = 1;
  return answers;
}

const CORRECT_BORDER = { borderWidth: 2, borderColor: "#12A06A" };
const WRONG_BORDER = { borderWidth: 2, borderColor: "#E5484D" };
const IDLE_BORDER = { borderWidth: 1.5, borderColor: "#E8EBF7" };

/** One exam ticket: question, three answers, the explanation panel after answering, save toggle and navigation. */
export function useTicketViewModel() {
  const [position, setPosition] = useState<number>(sampleSession.first);
  const [answers, setAnswers] = useState<Record<number, number>>(initialAnswers);
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const total = sampleSession.total;

  const ticket = ticketAt(position);
  const chosen = answers[position];
  const answered = chosen !== undefined;
  const ok = answered && chosen === ticket.right;
  const isSaved = Boolean(saved[ticket.num]);

  return {
    fresh: !answered,
    answered,
    pos: String(position),
    total: String(total),
    session: sampleSession.label,
    tNum: ticket.num,
    tTopic: ticket.topic,
    topicIndex: ticket.topicNumber - 1,
    tQ: ticket.question,
    scene: ticket.scene,
    imgBg: ticket.imageBackground,
    imgH: answered ? 120 : 176,
    answers: ticket.answers.map((text, i) => {
      const isRight = answered && i === ticket.right;
      const isWrong = answered && i === chosen && i !== ticket.right;
      const marked = isRight || isWrong;
      return {
        text,
        letter: marked ? "" : at(["A", "B", "C"], i),
        markShow: marked ? ("flex" as const) : ("none" as const),
        isRight,
        fontFamily: marked ? font.manrope[800] : font.manrope[600],
        bg: isRight ? "#E7F6EF" : isWrong ? "#FFE8EA" : "#FFFFFF",
        border: isRight ? CORRECT_BORDER : isWrong ? WRONG_BORDER : IDLE_BORDER,
        shadow: answered ? undefined : "0 4px 12px rgba(14,28,145,0.04)",
        badgeBg: isRight ? "#12A06A" : isWrong ? "#E5484D" : "#EEF1FF",
        badgeFg: marked ? "#FFFFFF" : "#0E1C91",
        op: answered && !marked ? 0.5 : 1,
        pick: () => {
          if (!answered) setAnswers({ ...answers, [position]: i });
        },
      };
    }),
    whyA: ticket.why[0],
    whyB: ticket.why[1],
    whyC: ticket.why[2],
    donePct: `${(((position - 1) / total) * 100).toFixed(1)}%`,
    verdict: ok ? "Correct!" : "Not quite",
    verdictFg: ok ? "#12A06A" : "#E5484D",
    verdictOk: ok,
    panelBg: ok ? "#E9F7F0" : "#FFEDEE",
    saveBg: isSaved ? "#FFB200" : "#FFFFFF",
    saveBorder: isSaved
      ? { borderWidth: 0, borderColor: "transparent" }
      : { borderWidth: 1, borderColor: "#E2E6F6" },
    saved: isSaved,
    toggleSave: () => setSaved({ ...saved, [ticket.num]: !isSaved }),
    next: () => setPosition(Math.min(total, position + 1)),
    prev: () => {
      if (position > 1) setPosition(position - 1);
    },
    prevDisabled: position <= 1,
    prevOp: position > 1 ? 1 : 0.4,
  };
}
