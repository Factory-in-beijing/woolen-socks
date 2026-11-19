// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useSignQuizViewModel } from "./useSignQuizViewModel";

describe("useSignQuizViewModel", () => {
  it("cannot advance before an answer is picked", () => {
    const { result } = renderHook(() => useSignQuizViewModel(2));
    expect(result.current.nextEnabled).toBe(false);
    act(() => result.current.next());
    expect(result.current.qNum).toBe("1");
  });

  it("plays a whole round and reports the score", () => {
    const { result } = renderHook(() => useSignQuizViewModel(2));
    const total = Number(result.current.qTotal);
    for (let q = 0; q < total; q++) {
      // Pick the first option, then continue (right or wrong, the round advances).
      act(() => result.current.answers[0]?.pick());
      expect(result.current.nextEnabled).toBe(true);
      act(() => result.current.next());
    }
    expect(result.current.finished).toBe(true);
    expect(Number(result.current.okN)).toBeLessThanOrEqual(total);
    expect(result.current.review.length).toBeGreaterThan(0);
  });

  it("starts a new round after Start again", () => {
    const { result } = renderHook(() => useSignQuizViewModel(2));
    act(() => result.current.answers[0]?.pick());
    act(() => result.current.restart());
    expect(result.current.qNum).toBe("1");
    expect(result.current.finished).toBe(false);
  });
});
