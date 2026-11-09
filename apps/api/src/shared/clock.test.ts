import { describe, expect, it } from "vitest";
import { fixedClock, systemClock } from "./clock.ts";

describe("Clock (principle 14: injected)", () => {
  it("fixedClock is deterministic and can advance", () => {
    const c = fixedClock("2026-11-08T17:00:00Z");
    expect(c.now().toISOString()).toBe("2026-11-08T17:00:00.000Z");
    c.advanceMs(60_000);
    expect(c.now().toISOString()).toBe("2026-11-08T17:01:00.000Z");
  });
  it("systemClock returns a Date", () => {
    expect(systemClock.now()).toBeInstanceOf(Date);
  });
});
