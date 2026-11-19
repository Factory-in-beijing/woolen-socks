import { describe, expect, it } from "vitest";
import { durationToSeconds, formatDuration } from "./duration";
import { materialChipLabel, materialChipRoute } from "./materialChip";

describe("duration", () => {
  it("converts both ways", () => {
    expect(durationToSeconds("12:10")).toBe(730);
    expect(formatDuration(730)).toBe("12:10");
    expect(formatDuration(65.4)).toBe("1:05");
  });
});

describe("material chips", () => {
  it("routes tickets to the tickets list and sign groups to their screens", () => {
    expect(materialChipRoute({ kind: "topic", topic: 3, label: "x", sub: "y" })).toBe("/tickets");
    expect(materialChipRoute({ kind: "group", group: 1, label: "x", sub: "y" })).toBe(
      "/sign-group",
    );
    expect(materialChipRoute({ kind: "group", group: 4, label: "x", sub: "y" })).toBe(
      "/sign-group4",
    );
  });
  it("describes a chip for screen readers", () => {
    expect(materialChipLabel({ kind: "group", group: 2, label: "Priority", sub: "6 signs" })).toBe(
      "Road signs, group 2: Priority, 6 signs",
    );
  });
});
