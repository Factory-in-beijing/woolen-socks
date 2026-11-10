import { describe, expect, it } from "vitest";
import { resolveEffective } from "./versioned-config.ts";

const versions = [
  { version: 1, effectiveFrom: "2027-01-01T00:00:00Z", value: { cancelHours: 24 } },
  { version: 3, effectiveFrom: "2027-06-01T00:00:00Z", value: { cancelHours: 12 } },
  { version: 2, effectiveFrom: "2027-03-01T00:00:00Z", value: { cancelHours: 18 } },
];

describe("effective-dated config (principle 12)", () => {
  it("picks the latest version whose effectiveFrom is not in the future", () => {
    expect(resolveEffective(versions, new Date("2027-04-01T00:00:00Z"))?.version).toBe(2);
    expect(resolveEffective(versions, new Date("2027-06-01T00:00:00Z"))?.version).toBe(3);
  });
  it("returns undefined before the first version — callers must treat that as 'open', not invent a value", () => {
    expect(resolveEffective(versions, new Date("2026-12-31T23:59:59Z"))).toBeUndefined();
  });
  it("is independent of input order and does not mutate it", () => {
    const copy = structuredClone(versions);
    resolveEffective(copy, new Date("2027-04-01T00:00:00Z"));
    expect(copy).toEqual(versions);
  });
});
