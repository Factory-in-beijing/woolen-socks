import { describe, expect, it } from "vitest";
import { isPasswordAcceptable, scorePassword } from "./password";

describe("password rules", () => {
  it("needs 8+ characters with a letter and a number", () => {
    expect(isPasswordAcceptable("Drive2026")).toBe(true);
    expect(isPasswordAcceptable("short1")).toBe(false);
    expect(isPasswordAcceptable("onlyletters")).toBe(false);
    expect(isPasswordAcceptable("12345678")).toBe(false);
  });

  it("scores strength from 0 to 3", () => {
    expect(scorePassword("")).toBe(0);
    expect(scorePassword("abc")).toBe(0);
    expect(scorePassword("abcdefgh")).toBe(1);
    expect(scorePassword("Drive2026")).toBe(2);
    expect(scorePassword("Drive2026!")).toBe(3);
  });
});
