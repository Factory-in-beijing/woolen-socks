// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getReminders, setReminders } from "@/state/reminders";
import { useAccountViewModel } from "./useAccountViewModel";
import { useHelpViewModel } from "./useHelpViewModel";
import { useNotifications2ViewModel } from "./useNotifications2ViewModel";
import { useOfflineViewModel } from "./useOfflineViewModel";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("useHelpViewModel", () => {
  it("searches answers and filters by topic", () => {
    const { result } = renderHook(() => useHelpViewModel());
    const all = result.current.rows.length;
    act(() => result.current.setQ("refund"));
    expect(result.current.rows.length).toBeGreaterThan(0);
    expect(result.current.rows.length).toBeLessThan(all);
    act(() => result.current.setQ("zzzz-no-match"));
    expect(result.current.noRows).toBe(true);
    act(() => result.current.setQ(""));
    act(() => result.current.chips.find((c) => c.label === "Payments")?.pick());
    expect(result.current.rows.length).toBeLessThan(all);
  });

  it("opens one answer at a time", () => {
    const { result } = renderHook(() => useHelpViewModel());
    act(() => result.current.rows[1]?.toggle());
    expect(result.current.rows.filter((r) => r.isOpen)).toHaveLength(1);
    expect(result.current.rows[1]?.isOpen).toBe(true);
  });
});

describe("useOfflineViewModel", () => {
  it("checks, then reports it is still offline", () => {
    const { result } = renderHook(() => useOfflineViewModel());
    act(() => result.current.retry());
    expect(result.current.retryLabel).toBe("Checking…");
    act(() => vi.advanceTimersByTime(1500));
    expect(result.current.failed).toBe(true);
  });
});

describe("useAccountViewModel", () => {
  it("asks for confirmation before logging out and resets after a few seconds", () => {
    const { result } = renderHook(() => useAccountViewModel());
    act(() => result.current.logout());
    expect(result.current.confirm).toBe(true);
    act(() => vi.advanceTimersByTime(4100));
    expect(result.current.confirm).toBe(false);
  });

  it("changes the ticket language and licence category", () => {
    const { result } = renderHook(() => useAccountViewModel());
    act(() => result.current.langs.find((l) => l.code === "RU")?.pick());
    expect(result.current.langName).toBe("Русский");
    act(() => result.current.cats[3]?.pick());
    expect(result.current.catCode).toBe("C");
  });
});

describe("useNotifications2ViewModel", () => {
  it("summarises days and updates the wheel when a time is picked", () => {
    setReminders({
      ...getReminders(),
      on: true,
      days: [true, true, true, true, true, false, false],
    });
    const { result } = renderHook(() => useNotifications2ViewModel());
    expect(result.current.daysSummary).toBe("Weekdays");
    act(() => result.current.presets[0]?.tap());
    expect(result.current.timeVal).toBe("08:00");
    expect(result.current.hours[2]?.label).toBe("08");
  });

  it("dims and disables the controls when reminders are off", () => {
    const { result } = renderHook(() => useNotifications2ViewModel());
    act(() => result.current.masterTap());
    expect(result.current.controlsEnabled).toBe(false);
    expect(result.current.heroDays).toBe("Reminders off");
  });
});
