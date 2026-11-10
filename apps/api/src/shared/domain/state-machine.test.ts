import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { AppError } from "../errors.ts";
import { defineStateMachine } from "./state-machine.ts";

// The booking example from the architecture guide: hold → paid → completed | cancelled.
const booking = defineStateMachine({
  hold: { pay: "paid", expire: "cancelled" },
  paid: { complete: "completed", cancel: "cancelled" },
  completed: {},
  cancelled: {},
} as const);

describe("state machine (principle 9)", () => {
  it("follows the transition table", () => {
    expect(booking.next("hold", "pay")).toBe("paid");
    expect(booking.next("paid", "complete")).toBe("completed");
    expect(booking.can("hold", "pay")).toBe(true);
  });

  it("any other transition is 409 invalid_transition", () => {
    try {
      booking.next("hold", "complete");
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect((e as AppError).code).toBe("invalid_transition");
    }
  });

  it("terminal states accept no event (property)", () => {
    fc.assert(
      fc.property(
        fc.constantFrom("completed", "cancelled"),
        fc.constantFrom("pay", "expire", "complete", "cancel"),
        (s, e) => {
          expect(booking.can(s, e)).toBe(false);
        },
      ),
    );
  });

  it("refuses a table that points at an unknown state", () => {
    expect(() => defineStateMachine({ a: { go: "nowhere" } } as const)).toThrow(/unknown state/);
  });

  it("exposes terminal states for exhaustive handling", () => {
    expect([...booking.terminal].sort()).toEqual(["cancelled", "completed"]);
  });
});
