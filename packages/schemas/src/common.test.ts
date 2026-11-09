import { describe, expect, it } from "vitest";
import fc from "fast-check";
import { BusinessDateSchema, InstantUtcSchema, MoneyDtoSchema, PageQuerySchema } from "./common.ts";

describe("common schemas", () => {
  it("accepts only UTC ISO-8601 instants (principle 14)", () => {
    expect(InstantUtcSchema.safeParse("2026-11-08T17:00:00Z").success).toBe(true);
    expect(InstantUtcSchema.safeParse("2026-11-08T21:00:00+04:00").success).toBe(false);
    expect(InstantUtcSchema.safeParse("2026-11-08").success).toBe(false);
  });

  it("accepts only real calendar business dates", () => {
    expect(BusinessDateSchema.safeParse("2027-02-28").success).toBe(true);
    expect(BusinessDateSchema.safeParse("2027-02-30").success).toBe(false);
    expect(BusinessDateSchema.safeParse("2027-2-3").success).toBe(false);
  });

  it("money is integer tetri only (principle 10)", () => {
    fc.assert(
      fc.property(fc.double({ noInteger: true, noNaN: true, noDefaultInfinity: true }), (n) => {
        fc.pre(!Number.isInteger(n));
        expect(MoneyDtoSchema.safeParse({ amountTetri: n, currency: "GEL" }).success).toBe(false);
      }),
    );
    expect(MoneyDtoSchema.safeParse({ amountTetri: 12550, currency: "GEL" }).success).toBe(true);
    expect(MoneyDtoSchema.safeParse({ amountTetri: 100, currency: "USD" }).success).toBe(false);
  });

  it("pagination is limit + cursor, bounded, never offset (principle 5)", () => {
    expect(PageQuerySchema.parse({})).toEqual({ limit: 20 });
    expect(PageQuerySchema.safeParse({ limit: "0" }).success).toBe(false);
    expect(PageQuerySchema.safeParse({ limit: "101" }).success).toBe(false);
    expect(PageQuerySchema.parse({ limit: "50", cursor: "abc", offset: "5" })).toEqual({
      limit: 50,
      cursor: "abc",
    });
  });
});
