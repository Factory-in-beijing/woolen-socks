// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTicketViewModel } from "./useTicketViewModel";

describe("useTicketViewModel", () => {
  it("starts on a fresh question with three unmarked answers", () => {
    const { result } = renderHook(() => useTicketViewModel());
    expect(result.current.fresh).toBe(true);
    expect(result.current.answers).toHaveLength(3);
    expect(result.current.answers.every((a) => a.markShow === "none")).toBe(true);
  });

  it("shows the verdict and the right answer after picking, and ignores a second pick", () => {
    const { result } = renderHook(() => useTicketViewModel());
    act(() => result.current.answers[0]?.pick()); // the first answer is wrong for this ticket
    expect(result.current.answered).toBe(true);
    expect(result.current.verdict).toBe("Not quite");
    expect(result.current.answers.filter((a) => a.isRight)).toHaveLength(1);
    const before = result.current.answers.map((a) => a.badgeBg);
    act(() => result.current.answers[1]?.pick());
    expect(result.current.answers.map((a) => a.badgeBg)).toEqual(before);
  });

  it("moves between questions and never goes before the first", () => {
    const { result } = renderHook(() => useTicketViewModel());
    act(() => result.current.next());
    expect(result.current.pos).toBe("9");
    for (let i = 0; i < 12; i++) act(() => result.current.prev());
    expect(result.current.pos).toBe("1");
    expect(result.current.prevDisabled).toBe(true);
  });

  it("toggles the saved state of the ticket", () => {
    const { result } = renderHook(() => useTicketViewModel());
    expect(result.current.saved).toBe(false);
    act(() => result.current.toggleSave());
    expect(result.current.saved).toBe(true);
  });
});
