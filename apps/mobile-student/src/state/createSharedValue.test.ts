// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createSharedValue } from "./createSharedValue";

describe("createSharedValue", () => {
  it("updates every subscriber and ignores identical values", () => {
    const shared = createSharedValue(1);
    const a = renderHook(() => shared.use());
    const b = renderHook(() => shared.use());
    act(() => shared.set(2));
    expect(a.result.current).toBe(2);
    expect(b.result.current).toBe(2);
    expect(shared.get()).toBe(2);
    let renders = 0;
    const counted = renderHook(() => {
      renders++;
      return shared.use();
    });
    const before = renders;
    act(() => shared.set(2)); // same value: no re-render
    expect(renders).toBe(before);
    counted.unmount();
  });

  it("stops notifying an unmounted subscriber", () => {
    const shared = createSharedValue("x");
    const view = renderHook(() => shared.use());
    view.unmount();
    expect(() => act(() => shared.set("y"))).not.toThrow();
  });
});
