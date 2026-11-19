import { useMemo, useState } from "react";
import type { ReviewItem, ReviewSample } from "@/data/practice/sampleReview";
import { sampleMistakes, sampleSaved } from "@/data/practice/sampleReview";

type TypeFilter = "all" | "t" | "s";
const TYPE_KEYS: TypeFilter[] = ["all", "t", "s"];
const ALL_TOPICS = "All";

export type ReviewRow = {
  key: string;
  head: string;
  question: string;
  topic: string;
  wrong: number;
  kind: ReviewItem["kind"];
  svg: string;
  tag: string;
  tagBg: string;
  tagFg: string;
  route: string;
  lineColor: string;
};

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

/**
 * Mistakes and Saved share one list screen: filter by ticket/sign, then by topic.
 * `mode` decides the data set and the wording ("to fix" / "saved").
 */
export function useReviewListViewModel(mode: "mistakes" | "saved") {
  const data: ReviewSample = mode === "mistakes" ? sampleMistakes : sampleSaved;
  const word = mode === "mistakes" ? "to fix" : "saved";
  const [type, setType] = useState<TypeFilter>("all");
  const [topic, setTopic] = useState(ALL_TOPICS);

  // Rows are rebuilt only when the data or a filter changes, so the memoised list rows can skip re-rendering.
  const rows = useMemo<ReviewRow[]>(() => {
    const shown = data.items.filter(
      (x) => (type === "all" || x.type === type) && (topic === ALL_TOPICS || x.topic === topic),
    );
    return shown.map((x, i) => ({
      key: `${x.type}-${x.head}`,
      head: x.head,
      question: x.question,
      topic: x.topic,
      wrong: x.wrong,
      kind: x.kind,
      svg: x.svg,
      tag: x.type === "t" ? "TICKET" : "SIGN",
      tagBg: x.type === "t" ? "#EEF1FF" : "#FFF3D6",
      tagFg: x.type === "t" ? "#0E1C91" : "#8A5A00",
      route: x.type === "t" ? "/ticket" : "/sign-group",
      lineColor: i === shown.length - 1 ? "transparent" : "#EEF0F8",
    }));
  }, [data, type, topic]);

  const chipDef = type === "all" ? {} : data.topics[type];
  const total = data.totals[type];
  const what =
    type === "t"
      ? plural(total, "ticket", "tickets")
      : type === "s"
        ? plural(total, "sign", "signs")
        : "tickets & signs";

  const segment = (key: TypeFilter) => {
    const on = type === key;
    return {
      on,
      bg: on ? "#FFFFFF" : "transparent",
      fg: on ? "#0E1C91" : "#566086",
      shadow: on ? "0 1px 2px rgba(14,28,145,0.08), 0 4px 10px rgba(14,28,145,0.08)" : undefined,
      n: String(data.totals[key]),
      pick: () => {
        setType(key);
        setTopic(ALL_TOPICS);
      },
    };
  };
  const [all, tickets, signs] = TYPE_KEYS.map(segment) as [
    ReturnType<typeof segment>,
    ReturnType<typeof segment>,
    ReturnType<typeof segment>,
  ];

  return {
    rows,
    noRows: rows.length === 0,
    showChips: type !== "all",
    chips: Object.entries(chipDef).map(([label, count]) => {
      const on = topic === label;
      return {
        label,
        count: String(count),
        bg: on ? "#0A0E2E" : "#FFFFFF",
        fg: on ? "#FFFFFF" : "#0A0E2E",
        border: { borderWidth: 1, borderColor: on ? "#0A0E2E" : "#E2E6F6" },
        pick: () => setTopic(label),
      };
    }),
    heroTitle: `${total} ${what} ${word}`,
    showWrong: mode === "mistakes",
    showSaved: mode === "saved",
    allBg: all.bg,
    allFg: all.fg,
    allShadow: all.shadow,
    allN: all.n,
    allPick: all.pick,
    tBg: tickets.bg,
    tFg: tickets.fg,
    tShadow: tickets.shadow,
    tN: tickets.n,
    tPick: tickets.pick,
    sBg: signs.bg,
    sFg: signs.fg,
    sShadow: signs.shadow,
    sN: signs.n,
    sPick: signs.pick,
  };
}
