import { test } from "node:test";
import assert from "node:assert/strict";
import { ERROR_CODES } from "@drivenet/schemas";
import { ka } from "./ka.ts";

test("every error code of the contract has a Georgian message", () => {
  for (const code of ERROR_CODES) {
    assert.ok(ka.errors[code] && ka.errors[code].length > 0, `missing message for ${code}`);
  }
});
