import { describe, expect, it } from "vitest";
import { z } from "zod";
import { AppError } from "../errors.ts";
import { decodeCursor, encodeCursor } from "./cursor.ts";

const Schema = z.object({ startAfter: z.string(), v: z.literal(1) });

describe("opaque cursors (principle 5: limit + cursor, never offset)", () => {
  it("round-trips and is URL-safe", () => {
    const token = encodeCursor({ startAfter: "slot/abc+/=", v: 1 });
    expect(token).toMatch(/^[A-Za-z0-9_-]+$/);
    expect(decodeCursor(Schema, token)).toEqual({ startAfter: "slot/abc+/=", v: 1 });
  });
  it("rejects tampered or malformed cursors as validation_failed", () => {
    for (const bad of ["!!!", "e30", encodeCursor({ startAfter: 1 })]) {
      expect(() => decodeCursor(Schema, bad)).toThrow(AppError);
    }
  });
});
