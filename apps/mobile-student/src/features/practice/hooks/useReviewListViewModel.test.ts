// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useReviewListViewModel } from "./useReviewListViewModel";

describe("useReviewListViewModel", () => {
  it("filters by ticket or sign and resets the topic filter", () => {
    const { result } = renderHook(() => useReviewListViewModel("mistakes"));
    const all = result.current.rows.length;
    act(() => result.current.tPick());
    expect(result.current.rows.every((r) => r.tag === "TICKET")).toBe(true);
    expect(result.current.rows.length).toBeLessThan(all);
    expect(result.current.showChips).toBe(true);
    act(() => result.current.allPick());
    expect(result.current.rows).toHaveLength(all);
  });

  it("filters by topic chip", () => {
    const { result } = renderHook(() => useReviewListViewModel("mistakes"));
    act(() => result.current.tPick());
    const chip = result.current.chips.find((c) => c.label === "Intersections");
    act(() => chip?.pick());
    expect(result.current.rows.length).toBeGreaterThan(0);
    expect(result.current.rows.every((r) => r.topic === "Intersections")).toBe(true);
  });

  it("words the hero for the mode", () => {
    expect(renderHook(() => useReviewListViewModel("mistakes")).result.current.heroTitle).toContain(
      "to fix",
    );
    expect(renderHook(() => useReviewListViewModel("saved")).result.current.heroTitle).toContain(
      "saved",
    );
  });
});
