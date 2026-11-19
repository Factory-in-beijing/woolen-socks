import { describe, expect, it } from "vitest";
import { formatGel } from "./money";

describe("formatGel", () => {
  it("formats whole lari without decimals and fractions with two", () => {
    expect(formatGel(7900)).toBe("₾79");
    expect(formatGel(7950)).toBe("₾79.50");
    expect(formatGel(5)).toBe("₾0.05");
  });
});
