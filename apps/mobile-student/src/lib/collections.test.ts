import { describe, expect, it } from "vitest";
import { at } from "./collections";

describe("at", () => {
  it("returns the item or fails loudly", () => {
    expect(at(["a", "b"], 1)).toBe("b");
    expect(() => at(["a"], 3)).toThrow(RangeError);
  });
});
