import { describe, expect, it } from "vitest";
import { buildApp } from "../app.ts";
import { fixedClock } from "../shared/clock.ts";
import { AppError } from "../shared/errors.ts";
import { createLogger } from "../shared/logger.ts";
import {
  InMemoryJobStore,
  InMemoryUnitOfWork,
  RecordingDispatcher,
} from "../shared/jobs/testing.ts";
import { runWithJobs, type JobHandlers } from "../shared/jobs/runner.ts";
import type { InternalJobsDeps } from "./internal-jobs.ts";

function setup(handlers: JobHandlers) {
  const clock = fixedClock("2027-01-01T00:00:00Z");
  const store = new InMemoryJobStore();
  const logger = createLogger({ level: "silent" });
  const runner = {
    uow: new InMemoryUnitOfWork(store),
    store,
    dispatcher: new RecordingDispatcher(),
    clock,
    logger,
    handlers,
    maxAttempts: 3,
    leaseMs: 60_000,
  };
  const internalJobs: InternalJobsDeps = {
    verifier: {
      verify: async (h) => {
        if (h !== "Bearer cloud-tasks")
          throw new AppError("unauthenticated", "Authentication required");
      },
    },
    runner,
    sweep: { olderThanMs: 1_000, limit: 10 },
  };
  return { app: buildApp({ clock, logger, internalJobs }), runner, store, clock };
}
const auth = { authorization: "Bearer cloud-tasks" };

describe("/internal/jobs", () => {
  it("rejects callers without a valid internal identity (401)", async () => {
    const { app } = setup({});
    for (const headers of [{}, { authorization: "Bearer stolen-user-token" }]) {
      const res = await app.inject({
        method: "POST",
        url: "/internal/jobs/run",
        headers,
        payload: { jobId: "j" },
      });
      expect(res.statusCode).toBe(401);
    }
  });

  it("run: 200 on success, 200 on redelivery, 400 on a bad body", async () => {
    let calls = 0;
    const { app, runner } = setup({ ping: async () => void (calls += 1) });
    await runWithJobs(runner, async (_t, enqueue) =>
      enqueue({ id: "ping:1", type: "ping", payload: {} }),
    );
    const run = () =>
      app.inject({
        method: "POST",
        url: "/internal/jobs/run",
        headers: auth,
        payload: { jobId: "ping:1" },
      });
    expect((await run()).json()).toEqual({ outcome: "done" });
    expect((await run()).json()).toEqual({ outcome: "skipped" });
    expect(calls).toBe(1);
    expect(
      (await app.inject({ method: "POST", url: "/internal/jobs/run", headers: auth, payload: {} }))
        .statusCode,
    ).toBe(400);
  });

  it("run: a failing handler answers 503 retryable so Cloud Tasks retries", async () => {
    const { app, runner } = setup({ ping: async () => Promise.reject(new Error("boom")) });
    await runWithJobs(runner, async (_t, enqueue) =>
      enqueue({ id: "ping:1", type: "ping", payload: {} }),
    );
    const res = await app.inject({
      method: "POST",
      url: "/internal/jobs/run",
      headers: auth,
      payload: { jobId: "ping:1" },
    });
    expect(res.statusCode).toBe(503);
    expect(res.json()).toMatchObject({ code: "dependency_unavailable", retryable: true });
  });

  it("sweep: re-dispatches jobs that never reached the queue", async () => {
    const { app, runner, store, clock } = setup({});
    (runner.dispatcher as RecordingDispatcher).failNext = true;
    await runWithJobs(runner, async (_t, enqueue) =>
      enqueue({ id: "ping:1", type: "ping", payload: {} }),
    );
    clock.advanceMs(5_000);
    const res = await app.inject({ method: "POST", url: "/internal/jobs/sweep", headers: auth });
    expect(res.json()).toEqual({ dispatched: 1 });
    expect(store.all()[0]?.dispatchedAt).not.toBeNull();
  });
});
