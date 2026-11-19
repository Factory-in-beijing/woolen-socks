import { at } from "@/lib/collections";
/** Pure progress rules for the tickets list. */

export type TicketStatus = "new" | "ok" | "bad";

/**
 * SAMPLE rule: which answered tickets were wrong. The real statuses come from the student's answer history;
 * this stand-in marks two tickets in every fifteen as wrong so the screen has something to show.
 */
export function sampleTicketStatus(ticket: number, nextTicket: number): TicketStatus {
  if (ticket >= nextTicket) return "new";
  return ticket % 15 === 4 || ticket % 15 === 11 ? "bad" : "ok";
}

/** Number of correctly answered tickets in each topic, given how many tickets each topic holds. */
export function correctPerTopic(
  topicCounts: readonly number[],
  nextTicket: number,
  statusOf: (ticket: number) => TicketStatus,
): number[] {
  const correct = topicCounts.map(() => 0);
  let start = 1;
  topicCounts.forEach((count, topic) => {
    for (let ticket = start; ticket < start + count && ticket < nextTicket; ticket++) {
      if (statusOf(ticket) === "ok") correct[topic] = (correct[topic] ?? 0) + 1;
    }
    start += count;
  });
  return correct;
}

export const percentOf = (part: number, whole: number) =>
  part ? Math.round((part / whole) * 100) : 0;

/** Index of the topic that holds ticket number `nextTicket` (counts are per topic, in ticket order). */
export function topicIndexOfTicket(topicCounts: readonly number[], nextTicket: number): number {
  let accumulated = 0;
  for (let k = 0; k < topicCounts.length; k++) {
    accumulated += at(topicCounts, k);
    if (nextTicket <= accumulated) return k;
  }
  return 0;
}
