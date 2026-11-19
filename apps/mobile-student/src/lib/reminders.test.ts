import { describe, expect, it } from "vitest";
import { EVERY_DAY, WEEKDAYS, WEEKENDS, daysSummary, wheelValues } from "./reminders";

describe("reminders", () => {
  it("summarises the chosen days", () => {
    expect(daysSummary(EVERY_DAY)).toBe("Every day");
    expect(daysSummary(WEEKDAYS)).toBe("Weekdays");
    expect(daysSummary(WEEKENDS)).toBe("Weekends");
    expect(daysSummary([true, false, true, false, false, false, false])).toBe("Mon, Wed");
    expect(daysSummary([true, true, true, true, false, false, false])).toBe("4 days a week");
    expect(daysSummary([false, false, false, false, false, false, false])).toBe(
      "Pick at least one day",
    );
  });

  it("wraps the time wheel around", () => {
    expect(wheelValues(0, 24)).toEqual([22, 23, 0, 1, 2]);
    expect(wheelValues(59, 60)).toEqual([57, 58, 59, 0, 1]);
  });
});
