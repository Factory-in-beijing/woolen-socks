import { describe, expect, it, vi } from "vitest";
import { reportError, setErrorReporter } from "./errorReporting";

describe("reportError", () => {
  it("passes the error and context to the attached reporter", () => {
    const reporter = vi.fn();
    setErrorReporter(reporter);
    const error = new Error("boom");
    reportError(error, { screen: "tickets" });
    expect(reporter).toHaveBeenCalledWith(error, { screen: "tickets" });
  });

  it("swallows a failing reporter", () => {
    setErrorReporter(() => {
      throw new Error("reporter down");
    });
    expect(() => reportError(new Error("boom"))).not.toThrow();
  });
});
