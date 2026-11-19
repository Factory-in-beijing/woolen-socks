import { useState } from "react";
import { sampleSignGroupContent } from "@/data/signs/sampleSigns";
import { at } from "@/lib/collections";

type Filter = "all" | "todo" | "done";
const FILTER_LABEL: Array<[Filter, string]> = [
  ["all", "All"],
  ["todo", "To learn"],
  ["done", "Learned"],
];
/** Questions in a sign quiz round (shown in the call-to-action text). */
const QUIZ_QUESTIONS = 6;

/** A group of road signs: filter tabs, a grid of signs and a detail sheet to read, save and mark signs learned. */
export function useSignGroupViewModel(groupId: number) {
  const group = sampleSignGroupContent[groupId] ?? sampleSignGroupContent[2];
  if (!group) throw new RangeError(`No sample content for sign group ${groupId}`);
  const { signs } = group;

  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const [learned, setLearned] = useState<Set<string>>(
    () => new Set(group.learned.map((i) => at(signs, i).code)),
  );
  const [saved, setSaved] = useState<Set<string>>(() => new Set());

  const isLearned = (index: number) => learned.has(at(signs, index).code);
  const total = signs.length;
  const learnedCount = signs.filter((_, i) => isLearned(i)).length;
  const visible = signs
    .map((_, i) => i)
    .filter((i) => (filter === "all" ? true : filter === "todo" ? !isLearned(i) : isLearned(i)));

  const toggleIn = (set: Set<string>, code: string) => {
    const next = new Set(set);
    if (!next.delete(code)) next.add(code);
    return next;
  };
  const toggleCode = (code: string) => (current: Set<string>) => toggleIn(current, code);

  const base = {
    title: group.title,
    learnedN: String(learnedCount),
    totalN: String(total),
    learnedFraction: learnedCount / total,
    tabs: FILTER_LABEL.map(([key, label]) => {
      const n = key === "all" ? total : key === "todo" ? total - learnedCount : learnedCount;
      const selected = key === filter;
      return {
        key,
        label,
        n: String(n),
        selected,
        bg: selected ? "#FFFFFF" : "transparent",
        fg: selected ? "#0A0E2E" : "#566086",
        numFg: selected ? "#0E1C91" : "#8A93B8",
        shadow: selected
          ? "0 1px 2px rgba(14,28,145,0.08), 0 4px 10px rgba(14,28,145,0.06)"
          : undefined,
        pick: () => setFilter(key),
      };
    }),
    grid: visible.map((i) => {
      const sign = at(signs, i);
      const done = isLearned(i);
      return {
        key: sign.code,
        code: sign.code,
        name: sign.name,
        svg: sign.svg,
        done,
        aria: `${sign.code} ${sign.name}${done ? ", learned" : ""}`,
        open: () => setOpen(i),
      };
    }),
    emptyShow: visible.length === 0,
    emptyTitle: filter === "todo" ? `All ${total} signs learned` : "Nothing learned yet",
    emptySub:
      filter === "todo" ? "Take the quiz to keep them fresh" : "Open a sign and mark it as learned",
    ctaSub:
      total - learnedCount
        ? `${total - learnedCount} signs left to learn · ${QUIZ_QUESTIONS} questions`
        : `All learned · ${QUIZ_QUESTIONS} questions to keep it fresh`,
    detailOpen: open !== null,
  };
  if (open === null) return { ...base, detail: null };

  // Next/previous move through the filtered list when the open sign is in it, otherwise through all signs.
  const sequence = visible.includes(open) ? visible : signs.map((_, i) => i);
  const position = sequence.indexOf(open);
  const sign = at(signs, open);
  const done = isLearned(open);
  const isSaved = saved.has(sign.code);
  const go = (delta: number) => {
    const target = sequence[position + delta];
    if (target !== undefined) setOpen(target);
  };

  return {
    ...base,
    detail: {
      svg: sign.svg,
      code: sign.code,
      name: sign.name,
      description: sign.description,
      position: String(position + 1),
      count: String(sequence.length),
      done,
      saveLabel: isSaved ? "Saved" : "Save",
      saveBg: isSaved ? "#FFB200" : "#FFFFFF",
      saveBorder: { borderWidth: 1, borderColor: isSaved ? "#FFB200" : "#E2E6F6" },
      saved: isSaved,
      toggleSave: () => setSaved(toggleCode(sign.code)),
      learnedLabel: done ? "Learned" : "Mark as learned",
      learnedBg: done ? "#FFFFFF" : "#FFB200",
      learnedBorder: done
        ? { borderWidth: 1.5, borderColor: "#E2E6F6" }
        : { borderWidth: 0, borderColor: "transparent" },
      learnedShadow: done ? undefined : "0 14px 30px rgba(14,28,145,0.18)",
      dotBg: done ? "#FFB200" : "transparent",
      dotRing: done ? undefined : "inset 0 0 0 2px #0A0E2E",
      toggleLearned: () => setLearned(toggleCode(sign.code)),
      close: () => setOpen(null),
      prev: () => go(-1),
      next: () => go(1),
      prevOp: position > 0 ? 1 : 0.4,
      nextOp: position < sequence.length - 1 ? 1 : 0.4,
    },
  };
}
