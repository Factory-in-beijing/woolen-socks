import { describe, expect, it } from "vitest";
import * as api from "./index.ts";

describe("public surface of @drivenet/api-client", () => {
  it("exposes the data-layer helpers screens rely on", () => {
    for (const name of [
      "createApiClient",
      "createQueryApi",
      "parseProblem",
      "newIdempotencyKey",
      "ApiError",
      "toApiError",
      "behaviorFor",
      "toScreenState",
      "applyServerFieldErrors",
      "useIdempotencyKey",
      "QUERY_DEFAULTS",
      "retryDelayMs",
    ]) {
      expect(api, name).toHaveProperty(name);
    }
  });
});
