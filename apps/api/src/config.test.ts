import { describe, expect, it } from "vitest";
import { loadEnv } from "./config.ts";

describe("environment (parsed once at the edge)", () => {
  it("has safe defaults for local development", () => {
    const env = loadEnv({});
    expect(env.PORT).toBe(8080);
    expect(env.JOB_MAX_ATTEMPTS).toBe(8);
    expect(env.TASKS_TIMEOUT_MS).toBeGreaterThan(0); // external calls always have a timeout
  });
  it("jobs are all-or-nothing: a partial Cloud Tasks configuration is rejected", () => {
    expect(() => loadEnv({ SERVICE_URL: "https://x.run.app" })).toThrow(
      /SERVICE_URL, TASKS_QUEUE_PATH and TASKS_INVOKER_SA/,
    );
    expect(
      loadEnv({
        SERVICE_URL: "https://x.run.app",
        TASKS_QUEUE_PATH: "projects/p/locations/l/queues/jobs",
        TASKS_INVOKER_SA: "i@p.iam.gserviceaccount.com",
      }).TASKS_QUEUE_PATH,
    ).toContain("queues/jobs");
  });
});
