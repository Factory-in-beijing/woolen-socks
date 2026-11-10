// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useIdempotencyKey } from "./idempotency-key.ts";

describe("useIdempotencyKey: one key per user action", () => {
  it("is stable across re-renders and retries of the same submit", () => {
    const { result, rerender } = renderHook(() => useIdempotencyKey());
    const first = result.current.key;
    rerender();
    rerender();
    expect(result.current.key).toBe(first);
  });

  it("rotate() issues a fresh key for the next, different action", () => {
    const { result } = renderHook(() => useIdempotencyKey());
    const first = result.current.key;
    act(() => result.current.rotate());
    expect(result.current.key).not.toBe(first);
    expect(result.current.key.length).toBeGreaterThanOrEqual(8);
  });
});
