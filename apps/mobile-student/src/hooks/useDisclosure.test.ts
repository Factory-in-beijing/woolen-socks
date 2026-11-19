// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useDisclosure } from "./useDisclosure";

describe("useDisclosure", () => {
  it("opens, closes and toggles", () => {
    const { result } = renderHook(() => useDisclosure());
    expect(result.current.open).toBe(false);
    act(() => result.current.show());
    expect(result.current.open).toBe(true);
    act(() => result.current.hide());
    expect(result.current.open).toBe(false);
    act(() => result.current.toggle());
    expect(result.current.open).toBe(true);
  });
});
