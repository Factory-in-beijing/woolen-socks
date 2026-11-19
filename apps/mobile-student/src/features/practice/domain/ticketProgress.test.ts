import { describe, expect, it } from "vitest";
import {
  correctPerTopic,
  percentOf,
  sampleTicketStatus,
  topicIndexOfTicket,
} from "./ticketProgress";

describe("ticket progress", () => {
  it("marks tickets from the next one on as new", () => {
    expect(sampleTicketStatus(361, 361)).toBe("new");
    expect(sampleTicketStatus(360, 361)).not.toBe("new");
  });

  it("counts correct answers per topic only before the next ticket", () => {
    const statusOf = (t: number) => (t === 2 ? "bad" : t < 5 ? "ok" : "new");
    expect(correctPerTopic([3, 4], 5, statusOf)).toEqual([2, 1]);
  });

  it("finds the topic of a ticket", () => {
    expect(topicIndexOfTicket([45, 7, 32], 46)).toBe(1);
    expect(topicIndexOfTicket([45, 7, 32], 1)).toBe(0);
  });

  it("rounds percentages and treats zero as empty", () => {
    expect(percentOf(0, 10)).toBe(0);
    expect(percentOf(1, 3)).toBe(33);
  });
});
