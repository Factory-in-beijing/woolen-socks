// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { quickTestDefinition } from "../definition";
import { useQuickTestRunViewModel } from "./useQuickTestRunViewModel";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("useQuickTestRunViewModel", () => {
  it("opens on question 7 with the sample answers counted", () => {
    const { result } = renderHook(() => useQuickTestRunViewModel());
    expect(result.current.qNum).toBe("7");
    expect(result.current.okN).toBe("4");
    expect(result.current.badN).toBe("1");
    expect(result.current.strip).toHaveLength(quickTestDefinition.questionCount);
  });

  it("marks the chosen answer and lets the student continue", () => {
    const { result } = renderHook(() => useQuickTestRunViewModel());
    act(() => result.current.answers[0]?.pick());
    expect(result.current.answers.some((a) => a.markShow === "flex")).toBe(true);
    expect(result.current.nextLabel).toBe("Next question");
    act(() => result.current.next());
    expect(result.current.qNum).toBe("8");
  });

  it("skips an unanswered question and counts it as skipped", () => {
    const { result } = renderHook(() => useQuickTestRunViewModel());
    expect(result.current.nextLabel).toBe("Skip for now");
    act(() => result.current.next());
    expect(result.current.qNum).toBe("8");
    act(() => result.current.prev());
    expect(result.current.skipN).toBe("1");
  });

  it("ends the test shortly after the mistake that goes over the limit", () => {
    const { result } = renderHook(() => useQuickTestRunViewModel());
    // In the sample questions the right answer is always the second one, so the first is always wrong.
    const answerWrong = () => {
      act(() => result.current.answers[0]?.pick());
      act(() => vi.advanceTimersByTime(1200));
    };
    answerWrong(); // question 7: 2nd mistake
    expect(result.current.endedOpen).toBe(false);
    for (let mistakes = 2; mistakes <= quickTestDefinition.maxMistakes; mistakes++) {
      act(() => result.current.next());
      answerWrong();
    }
    expect(Number(result.current.badN)).toBeGreaterThan(quickTestDefinition.maxMistakes);
    expect(result.current.endedOpen).toBe(true);
  });
});
