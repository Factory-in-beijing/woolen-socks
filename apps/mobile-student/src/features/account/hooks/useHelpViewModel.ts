import { useState } from "react";
import { faqTopics, sampleFaq } from "@/data/help/sampleFaq";

type Topic = (typeof faqTopics)[number];
const NONE_OPEN = -1;

/** Help centre: search box, topic chips and an accordion of answers. */
export function useHelpViewModel() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<Topic>("All");
  const [openIndex, setOpenIndex] = useState(0);

  const needle = query.trim().toLowerCase();
  const matches = sampleFaq
    .map((entry, index) => ({ entry, index }))
    .filter(
      ({ entry }) =>
        (topic === "All" || entry.topic === topic) &&
        (!needle || `${entry.question} ${entry.answer}`.toLowerCase().includes(needle)),
    );

  return {
    q: query,
    setQ: setQuery,
    rows: matches.map(({ entry, index }, k) => {
      const open = openIndex === index;
      return {
        key: index,
        q: entry.question,
        a: entry.answer,
        isOpen: open,
        rot: open ? "45deg" : "0deg",
        iconBg: open ? "#0E1C91" : "#EEF1FF",
        iconFg: open ? "#FFB200" : "#0E1C91",
        line: k === matches.length - 1 ? "transparent" : "#EEF0F8",
        toggle: () => setOpenIndex(open ? NONE_OPEN : index),
      };
    }),
    chips: faqTopics.map((label) => {
      const on = topic === label;
      return {
        label,
        bg: on ? "#0A0E2E" : "#FFFFFF",
        fg: on ? "#FFFFFF" : "#0A0E2E",
        border: { borderWidth: 1, borderColor: on ? "#0A0E2E" : "#E2E6F6" },
        pick: () => setTopic(label),
      };
    }),
    noRows: matches.length === 0,
    countLabel: `${matches.length} ${matches.length === 1 ? "answer" : "answers"}`,
  };
}
