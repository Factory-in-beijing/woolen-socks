import { useState } from "react";
import {
  SAMPLE_NEXT_TICKET,
  SAMPLE_STUDENT_CATEGORY,
  sampleLicenceCategories,
  sampleTicketModules,
  sampleTopicTicketCounts,
  sampleTopicTitles,
  sampleVideosPerModule,
} from "@/data/practice/sampleTickets";
import { at } from "@/lib/collections";
import {
  correctPerTopic,
  percentOf,
  sampleTicketStatus,
  topicIndexOfTicket,
} from "../domain/ticketProgress";

export type SortMode = "module" | "number";
type Sheet = "grid" | "reset" | null;

const ALL_CATEGORIES = 0;
const TINTS = ["#DDE2FA", "#FFEFC2", "#DCEBFF"];
const SHADES = ["rgba(14,28,145,0.18)", "rgba(140,95,0,0.2)", "rgba(20,80,170,0.18)"];
const RECENT_TICKETS = 6;
const GOOD_PERCENT = 70;
const formatNumber = (value: number) => value.toLocaleString("en-US");
const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`;

export type TopicRow = {
  kind: "topic";
  key: string;
  topic: number;
  num: string;
  title: string;
  on: boolean;
  tint: string;
  shade: string;
  numFg: string;
  border: { borderWidth: number; borderColor: string };
  shadow: string;
  checkBorder: { borderWidth: number; borderColor: string };
  checkBg: string;
  checkOpacity: number;
  meta: string;
  pctShort: string;
  pctFg: string;
  barW: string;
  bar: string;
  toggle: () => void;
};
export type ModuleHeadRow = {
  kind: "module";
  key: string;
  n: string;
  name: string;
  videos: string;
  count: string;
};
export type ListRow = ModuleHeadRow | TopicRow;

/**
 * Tickets list: licence category menu, progress summary, topic list (by module or by number) with a
 * multi-select, the "jump to ticket" sheet and the reset confirmation. Runs on the sample catalogue until the API is attached.
 */
export function useTicketsViewModel() {
  const [category, setCategory] = useState(SAMPLE_STUDENT_CATEGORY);
  const [picked, setPicked] = useState<number[]>([3, 20]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sort, setSort] = useState<SortMode>("module");
  const [sheet, setSheet] = useState<Sheet>(null);
  const [cleared, setCleared] = useState(false);

  const counts =
    category === ALL_CATEGORIES
      ? sampleTopicTicketCounts.all
      : category === SAMPLE_STUDENT_CATEGORY
        ? sampleTopicTicketCounts.b
        : null;
  // Progress belongs to one licence category; every other category starts fresh.
  const fresh = cleared || category !== SAMPLE_STUDENT_CATEGORY;
  const nextTicket = fresh ? 1 : SAMPLE_NEXT_TICKET;
  const statusOf = (ticket: number) => sampleTicketStatus(ticket, nextTicket);
  const correct = correctPerTopic(sampleTopicTicketCounts.b, nextTicket, statusOf);
  let okCount = 0;
  let badCount = 0;
  for (let ticket = 1; ticket < nextTicket; ticket++) {
    if (statusOf(ticket) === "ok") okCount++;
    else badCount++;
  }
  const current = at(sampleLicenceCategories, category);
  const leftCount = current.tickets - okCount - badCount;

  const modules = sampleTicketModules.map((module, mi) => {
    const sum = counts ? module.topics.reduce((total, t) => total + at(counts, t - 1), 0) : null;
    const rows: TopicRow[] = module.topics.map((t) => {
      const on = picked.includes(t);
      const total = counts ? at(counts, t - 1) : null;
      const right = fresh || total === null ? 0 : at(correct, t - 1);
      const pct = total === null ? 0 : percentOf(right, total);
      return {
        kind: "topic",
        key: `topic-${t}`,
        topic: t,
        num: String(t).padStart(2, "0"),
        title: at(sampleTopicTitles, t - 1),
        on,
        tint: on ? "#0E1C91" : at(TINTS, mi % 3),
        shade: on ? "rgba(0,0,0,0.3)" : at(SHADES, mi % 3),
        numFg: on ? "rgba(255,255,255,0.35)" : "rgba(14,28,145,0.18)",
        border: on
          ? { borderWidth: 2, borderColor: "#0E1C91" }
          : { borderWidth: 1, borderColor: "#E8EBF7" },
        shadow: on ? "0 14px 28px rgba(14,28,145,0.25)" : "0 8px 20px rgba(14,28,145,0.06)",
        checkBorder: on
          ? { borderWidth: 0, borderColor: "transparent" }
          : { borderWidth: 2, borderColor: "rgba(14,28,145,0.25)" },
        checkBg: on ? "#FFB200" : "rgba(255,255,255,0.7)",
        checkOpacity: on ? 1 : 0,
        meta: total === null ? "Not started" : right ? `${right} / ${total}` : `${total} tickets`,
        pctShort: pct ? `${pct}%` : "",
        pctFg: pct ? (pct >= GOOD_PERCENT ? "#0B8457" : "#B97A00") : "#0E1C91",
        barW: `${pct}%`,
        bar: pct >= GOOD_PERCENT ? "#0B8457" : "#FFB200",
        toggle: () =>
          setPicked((current) =>
            current.includes(t) ? current.filter((x) => x !== t) : [...current, t],
          ),
      };
    });
    const head: ModuleHeadRow = {
      kind: "module",
      key: `module-${mi}`,
      n: String(mi + 1),
      name: module.name,
      videos: plural(sampleVideosPerModule[mi] ?? 0, "video", "videos"),
      count:
        sum === null
          ? plural(module.topics.length, "topic", "topics")
          : `${formatNumber(sum)} tickets`,
    };
    return { head, rows };
  });

  const byNumber = sort === "number";
  const items: ListRow[] = byNumber
    ? modules
        .flatMap((m) => m.rows)
        .sort((a, b) => a.topic - b.topic)
        .map((row) => (row.on ? row : { ...row, tint: at(TINTS, 0), shade: at(SHADES, 0) }))
    : modules.flatMap((m) => [m.head, ...m.rows]);

  const selected = picked.length;
  const pickedTickets = counts ? picked.reduce((total, t) => total + at(counts, t - 1), 0) : null;
  const topicCounts = counts ?? sampleTopicTicketCounts.b;
  const hereTopic = topicIndexOfTicket(topicCounts, nextTicket);
  const recent = Array.from({ length: Math.min(RECENT_TICKETS, nextTicket - 1) }, (_, k) => {
    const ticket = Math.max(1, nextTicket - RECENT_TICKETS) + k;
    const bad = statusOf(ticket) === "bad";
    return {
      n: `#${ticket}`,
      bg: bad ? "#E5484D" : "#12A06A",
      wrong: bad,
      aria: `Ticket ${ticket}, ${bad ? "wrong" : "correct"}`,
    };
  });
  const segment = (on: boolean) => ({
    bg: on ? "#FFFFFF" : "transparent",
    fg: on ? "#0E1C91" : "#566086",
    sh: on ? "0 2px 6px rgba(14,28,145,0.15)" : undefined,
  });
  const byModuleSeg = segment(!byNumber);
  const byNumberSeg = segment(byNumber);
  const canStart = selected > 0;

  return {
    items,
    cur: current,
    curIcon: current.code,
    curTotal: formatNumber(current.tickets),
    stOk: formatNumber(okCount),
    stBad: formatNumber(badCount),
    stLeft: formatNumber(leftCount),
    roadOp: fresh ? 0 : 1,
    fresh,
    orderSub: `From #${nextTicket}`,
    orderPct: `${Math.round(((nextTicket - 1) / current.tickets) * 100)}%`,
    mistSub: badCount ? "To fix" : "All clear",
    badgeOp: badCount ? 1 : 0,
    contLabel: fresh ? "Start from #1" : `Continue from #${nextTicket}`,
    gridOpen: sheet === "grid",
    resetOpen: sheet === "reset",
    openGrid: () => setSheet("grid"),
    askReset: () => setSheet("reset"),
    closeAll: () => setSheet(null),
    doReset: () => {
      setSheet(null);
      setCleared(true);
    },
    recent,
    recentDisplay: recent.length ? ("flex" as const) : ("none" as const),
    nextN: String(nextTicket),
    hereTopicIndex: hereTopic,
    hereTopic: `Topic ${hereTopic + 1} · ${sampleTopicTitles[hereTopic]}`,
    hereKicker: fresh ? "Start here" : "You stopped here",
    byNumber,
    modBg: byModuleSeg.bg,
    modFg: byModuleSeg.fg,
    modShadow: byModuleSeg.sh,
    numBg: byNumberSeg.bg,
    numFg: byNumberSeg.fg,
    numShadow: byNumberSeg.sh,
    sortMod: () => setSort("module"),
    sortNum: () => setSort("number"),
    summary:
      selected === 0
        ? "Pick at least one topic"
        : `${plural(selected, "topic", "topics")}${pickedTickets !== null ? ` · ${pickedTickets} tickets` : ""}`,
    ctaBg: canStart ? "#FFB200" : "#E4E8F8",
    ctaFg: canStart ? "#0A0E2E" : "#566086",
    ctaShadow: canStart ? "0 14px 30px rgba(14,28,145,0.22)" : undefined,
    menuOpen,
    toggleMenu: () => setMenuOpen((open) => !open),
    cats: sampleLicenceCategories.map((c, k) => ({
      code: c.code,
      name: c.name,
      n: formatNumber(c.tickets),
      bg: k === category ? "#FFFFFF" : "#F4F6FC",
      border: { borderWidth: 2, borderColor: k === category ? "#0E1C91" : "transparent" },
      shadow: k === category ? "0 10px 24px rgba(14,28,145,0.16)" : undefined,
      check: k === category ? ("flex" as const) : ("none" as const),
      pick: () => {
        setCategory(k);
        setMenuOpen(false);
      },
    })),
  };
}
