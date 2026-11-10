import { describe, expect, it } from "vitest";
import { toScreenState, type ScreenState } from "./screen-state.ts";

const base = {
  isPending: false,
  isError: false,
  error: null,
  data: undefined as string[] | undefined,
};

describe("ScreenState: loading | empty | error | ready (FE base)", () => {
  it("covers every query state", () => {
    const empty = (d: string[]) => d.length === 0;
    expect(toScreenState({ ...base, isPending: true }, empty)).toEqual({ status: "loading" });
    expect(toScreenState({ ...base, data: [] }, empty)).toEqual({ status: "empty" });
    expect(toScreenState({ ...base, data: ["a"] }, empty)).toEqual({
      status: "ready",
      data: ["a"],
    });
    const failed = toScreenState({ ...base, isError: true, error: new TypeError("x") }, empty);
    expect(failed.status).toBe("error");
  });

  it("is exhaustive: a switch over `status` needs no default (checked by tsc)", () => {
    const label = (s: ScreenState<string>): string => {
      switch (s.status) {
        case "loading":
          return "l";
        case "empty":
          return "e";
        case "error":
          return s.error.problem.code;
        case "ready":
          return s.data;
      }
    };
    expect(label({ status: "ready", data: "ok" })).toBe("ok");
  });
});
