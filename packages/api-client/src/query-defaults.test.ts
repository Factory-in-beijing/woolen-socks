import { describe, expect, it } from "vitest";
import { QUERY_DEFAULTS, retryDelayMs } from "./query-defaults.ts";

describe("read retry backoff (principle 22)", () => {
  it("grows exponentially and is capped", () => {
    expect([0, 1, 2, 3, 4, 10].map(retryDelayMs)).toEqual([
      1_000, 2_000, 4_000, 8_000, 8_000, 8_000,
    ]);
  });
  it("never exceeds the cap for any attempt", () => {
    for (let n = 0; n < 50; n++)
      expect(retryDelayMs(n)).toBeLessThanOrEqual(QUERY_DEFAULTS.retryMaxMs);
  });
});
