import { test } from "node:test";
import assert from "node:assert/strict";
import { businessDate, formatMoney, tetri } from "./format.ts";

test("tetri rejects fractional amounts", () => {
  assert.throws(() => tetri(10.5), RangeError);
});

test("formatMoney renders integer tetri as lari with two decimals", () => {
  const text = formatMoney(tetri(12550));
  assert.match(text, /125\.50/);
  assert.match(text, /₾|GEL/);
});

test("businessDate uses Asia/Tbilisi (UTC+4), not UTC", () => {
  // 20:30 UTC on 31 Dec is already 00:30 on 1 Jan in Tbilisi.
  assert.equal(businessDate("2026-12-31T20:30:00Z"), "2027-01-01");
  assert.equal(businessDate("2026-12-31T19:59:00Z"), "2026-12-31");
});

test("Tbilisi has no daylight saving: offset is +4 in summer too", () => {
  assert.equal(businessDate("2027-07-15T20:00:00Z"), "2027-07-16");
  assert.equal(businessDate("2027-07-15T19:59:00Z"), "2027-07-15");
});
