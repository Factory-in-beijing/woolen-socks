import { describe, expect, it } from "vitest";
import type { Sign } from "@/data/signs/sampleSigns";
import { buildQuizOptions } from "./signQuiz";

const sign = (name: string): Sign => ({ code: name, name, description: "", svg: "" });
const signs = ["a", "b", "c", "d", "e", "f"].map(sign);

describe("buildQuizOptions", () => {
  it("returns the right sign and two distinct wrong ones", () => {
    for (let q = 0; q < 6; q++) {
      const options = buildQuizOptions(signs, q, q);
      expect(options).toHaveLength(3);
      expect(new Set(options).size).toBe(3);
      expect(options).toContain(q);
    }
  });

  it("moves the right answer's position with the question number", () => {
    expect(buildQuizOptions(signs, 0, 0).indexOf(0)).toBe(0);
    expect(buildQuizOptions(signs, 0, 1).indexOf(0)).toBe(1);
    expect(buildQuizOptions(signs, 0, 2).indexOf(0)).toBe(2);
  });

  it("skips look-alike signs that share the right name", () => {
    const lookalikes = ["x", "x", "y", "z"].map(sign);
    const options = buildQuizOptions(lookalikes, 0, 0);
    expect(options.map((i) => lookalikes[i]?.name).sort()).toEqual(["x", "y", "z"]);
  });
});
