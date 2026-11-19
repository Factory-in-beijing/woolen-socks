// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTicketsViewModel } from "./useTicketsViewModel";

const topicRows = (items: ReturnType<typeof useTicketsViewModel>["items"]) =>
  items.filter((i) => i.kind === "topic");

describe("useTicketsViewModel", () => {
  it("lists every topic once, grouped under module headings", () => {
    const { result } = renderHook(() => useTicketsViewModel());
    expect(topicRows(result.current.items)).toHaveLength(32);
    expect(result.current.items.filter((i) => i.kind === "module").length).toBeGreaterThan(0);
  });

  it("selects and deselects topics and disables the start button when none is selected", () => {
    const { result } = renderHook(() => useTicketsViewModel());
    const selected = () =>
      topicRows(result.current.items).filter((r) => r.kind === "topic" && r.on).length;
    expect(selected()).toBe(2);
    for (const row of topicRows(result.current.items))
      if (row.kind === "topic" && row.on) act(() => row.toggle());
    expect(selected()).toBe(0);
    expect(result.current.summary).toBe("Pick at least one topic");
  });

  it("starts from ticket 1 for a category the student has not started", () => {
    const { result } = renderHook(() => useTicketsViewModel());
    expect(result.current.contLabel).toBe("Continue from #361");
    act(() => result.current.cats[0]?.pick());
    expect(result.current.contLabel).toBe("Start from #1");
  });

  it("clears progress after the reset is confirmed", () => {
    const { result } = renderHook(() => useTicketsViewModel());
    act(() => result.current.askReset());
    expect(result.current.resetOpen).toBe(true);
    act(() => result.current.doReset());
    expect(result.current.resetOpen).toBe(false);
    expect(result.current.stOk).toBe("0");
  });

  it("sorts topics by number", () => {
    const { result } = renderHook(() => useTicketsViewModel());
    act(() => result.current.sortNum());
    const numbers = topicRows(result.current.items).map((r) => (r.kind === "topic" ? r.topic : 0));
    expect(numbers).toEqual([...numbers].sort((a, b) => a - b));
  });
});
