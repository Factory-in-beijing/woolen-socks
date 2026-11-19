// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useExamReadyViewModel } from "./useExamReadyViewModel";
import { useLessonPlayer } from "./useLessonPlayer";
import { useMyCourseViewModel } from "./useMyCourseViewModel";
import { usePlayback } from "./usePlayback";
import { useSignInGate } from "./useSignInGate";
import { useVideoErrorViewModel } from "./useVideoErrorViewModel";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("usePlayback", () => {
  it("clamps skipping to the video bounds and cycles the speed", () => {
    const { result } = renderHook(() => usePlayback(100, 5, ["1x", "2x"]));
    act(() => result.current.back10());
    expect(result.current.seconds).toBe(0);
    act(() => result.current.seekTo(95));
    act(() => result.current.fwd10());
    expect(result.current.seconds).toBe(100);
    expect(result.current.percent).toBe(100);
    act(() => result.current.speedUp());
    expect(result.current.speed).toBe("2x");
    act(() => result.current.speedUp());
    expect(result.current.speed).toBe("1x");
  });
});

describe("useLessonPlayer", () => {
  it("jumps to a chapter and marks it current", () => {
    const { result } = renderHook(() => useLessonPlayer());
    act(() => result.current.points[2]?.seek());
    expect(result.current.points[2]?.bg).toBe("#FFF6DF");
    expect(result.current.points[0]?.bg).toBe("transparent");
  });
});

describe("useMyCourseViewModel", () => {
  it("opens the current module and collapses it again", () => {
    const { result } = renderHook(() => useMyCourseViewModel());
    const lessons = () => result.current.rows.filter((r) => r.kind === "lesson").length;
    expect(lessons()).toBeGreaterThan(0);
    const header = result.current.rows.find((r) => r.kind === "module" && r.module.expanded);
    act(() => (header?.kind === "module" ? header.toggle() : undefined));
    expect(lessons()).toBe(0);
  });

  it("reports overall progress", () => {
    const { result } = renderHook(() => useMyCourseViewModel());
    expect(result.current.ringPercent).toBeGreaterThan(0);
    expect(result.current.segments).toHaveLength(9);
  });
});

describe("useExamReadyViewModel", () => {
  it("shows the weekly total, a day's count when picked, and the total again when unpicked", () => {
    const { result } = renderHook(() => useExamReadyViewModel());
    const total = result.current.selVal;
    act(() => result.current.bars[0]?.pick());
    expect(result.current.selVal).toBe("24");
    act(() => result.current.bars[0]?.pick());
    expect(result.current.selVal).toBe(total);
    expect(result.current.selLabel).toBe("in total");
  });
});

describe("useSignInGate", () => {
  it("opens and closes the gate", () => {
    const { result } = renderHook(() => useSignInGate());
    act(() => result.current.askSignIn());
    expect(result.current.gate).toBe(true);
    act(() => result.current.closeGate());
    expect(result.current.gate).toBe(false);
  });
});

describe("useVideoErrorViewModel", () => {
  it("shows Trying… while retrying and then returns to the error state", () => {
    const { result } = renderHook(() => useVideoErrorViewModel());
    expect(result.current.retryLabel).toBe("Try again");
    act(() => result.current.retry());
    expect(result.current.retryLabel).toBe("Trying…");
    act(() => result.current.retry()); // ignored while checking
    act(() => vi.advanceTimersByTime(1500));
    expect(result.current.retryLabel).toBe("Try again");
  });
});
