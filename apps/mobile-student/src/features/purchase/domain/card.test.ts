import { describe, expect, it } from "vitest";
import {
  cardBrand,
  formatCardNumber,
  formatExpiryField,
  formatExpiryPreview,
  isCardFormComplete,
} from "./card";

describe("card form helpers", () => {
  it("detects the brand from the first digits", () => {
    expect(cardBrand("4111")).toBe("visa");
    expect(cardBrand("5500")).toBe("mc");
    expect(cardBrand("2221")).toBe("mc");
    expect(cardBrand("3400")).toBe("generic");
  });

  it("formats number and expiry", () => {
    expect(formatCardNumber("4111111111111111")).toBe("4111 1111 1111 1111");
    expect(formatExpiryField("1228")).toBe("12 / 28");
    expect(formatExpiryPreview("")).toBe("MM/YY");
    expect(formatExpiryPreview("12")).toBe("12");
    expect(formatExpiryPreview("1228")).toBe("12/28");
  });

  it("is complete only when every field is filled", () => {
    const full = { number: "4111111111111111", expiry: "1228", cvc: "123", name: "NINO B" };
    expect(isCardFormComplete(full)).toBe(true);
    expect(isCardFormComplete({ ...full, cvc: "12" })).toBe(false);
    expect(isCardFormComplete({ ...full, name: " " })).toBe(false);
  });
});
