// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePayCardViewModel } from "./usePayCardViewModel";

describe("usePayCardViewModel", () => {
  it("keeps only digits and formats the number in groups", () => {
    const { result } = renderHook(() => usePayCardViewModel());
    act(() => result.current.numSet("4111-1111 1111 1111 99"));
    expect(result.current.numVal).toBe("4111 1111 1111 1111");
  });

  it("detects the brand and shows only its icon", () => {
    const { result } = renderHook(() => usePayCardViewModel());
    act(() => result.current.numSet("4"));
    expect(result.current.cVisa).toBe("flex");
    expect(result.current.cMc).toBe("none");
    act(() => result.current.numSet("55"));
    expect(result.current.cMc).toBe("flex");
  });

  it("allows paying only when every field is complete", () => {
    const { result } = renderHook(() => usePayCardViewModel());
    expect(result.current.complete).toBe(false);
    act(() => {
      result.current.numSet("4111111111111111");
      result.current.expSet("1228");
      result.current.cvcSet("123");
      result.current.nameSet("Nino Beridze");
    });
    expect(result.current.complete).toBe(true);
    expect(result.current.payOpacity).toBe(1);
  });

  it("strips characters a card name cannot contain", () => {
    const { result } = renderHook(() => usePayCardViewModel());
    act(() => result.current.nameSet("Nino 123 B."));
    expect(result.current.nameVal).toBe("Nino  B.");
  });
});
