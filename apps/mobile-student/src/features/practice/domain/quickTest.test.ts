import { describe, expect, it } from "vitest";
import { passStreak } from "./quickTest";

const run = (score: number) => ({ score, when: "", time: "" });

describe("passStreak", () => {
  it("counts passes from the newest run until the first failure", () => {
    expect(passStreak([run(28), run(27), run(24), run(29)], 25, 5)).toBe(2);
  });
  it("is zero when the newest run failed", () => {
    expect(passStreak([run(20), run(29)], 25, 5)).toBe(0);
  });
  it("never exceeds the goal", () => {
    expect(passStreak([run(30), run(30), run(30)], 25, 2)).toBe(2);
  });
});
