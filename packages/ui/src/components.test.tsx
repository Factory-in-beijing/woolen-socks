import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ka } from "@drivenet/i18n";
import { toApiError, type ScreenState } from "@drivenet/api-client";
import { Button, Card, ScreenStateView, TextField } from "./index.ts";
import { expectNoA11yViolations } from "./test-setup.ts";

const problem = (code: string, retryable: boolean) =>
  toApiError({
    type: "about:blank",
    title: "t",
    status: 503,
    code,
    traceId: "trace-abc-123",
    retryable,
  });

describe("Button", () => {
  it("is a real button, type=button by default, and is accessible", async () => {
    const { container } = render(<Button>{ka.nav.signIn}</Button>);
    expect(screen.getByRole("button", { name: ka.nav.signIn })).toHaveProperty("type", "button");
    await expectNoA11yViolations(container);
  });

  it("while loading it is locked: no second click, announced as busy", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Pay
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Pay" });
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
    expect(button).toHaveProperty("disabled", true);
    expect(button.getAttribute("aria-busy")).toBe("true");
  });
});

describe("TextField", () => {
  it("labels the input and wires hint and error for assistive tech", async () => {
    const { container } = render(
      <TextField label="ტელეფონი" hint="+995…" error="არასწორი ნომერი" />,
    );
    const input = screen.getByLabelText("ტელეფონი");
    expect(input.getAttribute("aria-invalid")).toBe("true");
    const described = input.getAttribute("aria-describedby")?.split(" ") ?? [];
    expect(described).toHaveLength(2);
    expect(described.map((id) => document.getElementById(id)?.textContent)).toEqual([
      "+995…",
      "არასწორი ნომერი",
    ]);
    await expectNoA11yViolations(container);
  });

  it("has no error attributes when valid and forwards a ref (react-hook-form register)", () => {
    let node: HTMLInputElement | null = null;
    render(<TextField label="სახელი" ref={(n) => void (node = n)} />);
    const input = screen.getByLabelText("სახელი");
    expect(input.getAttribute("aria-invalid")).toBeNull();
    expect(node).toBe(input);
  });
});

describe("Card", () => {
  it("is a labelled region when it has a title", async () => {
    const { container } = render(<Card title="ჩემი გაკვეთილები">content</Card>);
    expect(screen.getByRole("region", { name: "ჩემი გაკვეთილები" })).toBeTruthy();
    await expectNoA11yViolations(container);
  });
});

describe("ScreenStateView: loading | empty | error | ready", () => {
  const view = (state: ScreenState<string[]>, onRetry?: () => void) =>
    render(
      <ScreenStateView state={state} {...(onRetry ? { onRetry } : {})}>
        {(items) => (
          <ul>
            {items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
      </ScreenStateView>,
    );

  it("loading is a status region", async () => {
    const { container } = view({ status: "loading" });
    expect(screen.getByRole("status").textContent).toBe(ka.screen.loading);
    await expectNoA11yViolations(container);
  });

  it("empty shows the catalog text", () => {
    view({ status: "empty" });
    expect(screen.getByText(ka.screen.empty)).toBeTruthy();
  });

  it("ready renders the data", () => {
    view({ status: "ready", data: ["a", "b"] });
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("error shows the catalog text for the code plus the traceId, never the raw server message", async () => {
    const { container } = view({ status: "error", error: problem("slot_taken", false) });
    expect(screen.getByRole("alert").textContent).toContain(ka.errors.slot_taken);
    expect(screen.getByRole("alert").textContent).toContain("trace-abc-123");
    await expectNoA11yViolations(container);
  });

  it("offers retry only for retryable errors", () => {
    const onRetry = vi.fn();
    const { unmount } = view(
      { status: "error", error: problem("payment_unavailable", true) },
      onRetry,
    );
    fireEvent.click(screen.getByRole("button", { name: ka.screen.retry }));
    expect(onRetry).toHaveBeenCalledTimes(1);
    unmount();
    view({ status: "error", error: problem("forbidden", false) }, onRetry);
    expect(screen.queryByRole("button", { name: ka.screen.retry })).toBeNull();
  });
});
