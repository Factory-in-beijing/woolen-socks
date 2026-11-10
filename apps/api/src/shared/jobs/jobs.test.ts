import { describe, expect, it } from "vitest";
import { fixedClock } from "../clock.ts";
import { createLogger } from "../logger.ts";
import { Writable } from "node:stream";
import type { Tx, UnitOfWork } from "../domain/tx.ts";
import { InMemoryJobStore, RecordingDispatcher, InMemoryUnitOfWork } from "./testing.ts";
import { jobMachine } from "./job.ts";
import {
  runWithJobs,
  runJob,
  sweepUndispatched,
  type JobHandlers,
  type RunnerDeps,
} from "./runner.ts";

const T0 = "2027-01-01T00:00:00Z";

function setup(handlers: JobHandlers = {}, opts: { maxAttempts?: number } = {}) {
  const clock = fixedClock(T0);
  const store = new InMemoryJobStore();
  const uow: UnitOfWork = new InMemoryUnitOfWork(store);
  const dispatcher = new RecordingDispatcher();
  const lines: string[] = [];
  const logger = createLogger({
    level: "info",
    destination: new Writable({ write: (c, _e, cb) => (lines.push(String(c)), cb()) }),
  });
  const deps: RunnerDeps = {
    uow,
    store,
    dispatcher,
    clock,
    logger,
    handlers,
    maxAttempts: opts.maxAttempts ?? 3,
    leaseMs: 60_000,
  };
  return { clock, store, uow, dispatcher, logger, lines, deps };
}

const enqueueOne = (s: ReturnType<typeof setup>, id = "payout:lesson-1", type = "payout") =>
  runWithJobs(s.deps, async (_tx: Tx, enqueue) => {
    enqueue({ id, type, payload: { lessonId: "lesson-1" } });
    return "business-result";
  });

describe("job state machine (principle 9)", () => {
  it("allows only the documented transitions", () => {
    expect(jobMachine.next("pending", "start")).toBe("running");
    expect(jobMachine.next("running", "succeed")).toBe("succeeded");
    expect(jobMachine.next("running", "retry")).toBe("pending");
    expect(jobMachine.next("running", "fail")).toBe("failed");
    expect(() => jobMachine.next("succeeded", "start")).toThrow();
    expect(jobMachine.terminal).toEqual(expect.arrayContaining(["succeeded", "failed"]));
  });
});

describe("enqueue = job record in the business transaction, dispatch after commit (principle 8)", () => {
  it("creates a pending job and dispatches it after the transaction", async () => {
    const s = setup();
    expect(await enqueueOne(s)).toBe("business-result");
    expect(s.store.all()).toMatchObject([{ id: "payout:lesson-1", state: "pending", attempts: 0 }]);
    expect(s.dispatcher.dispatched.map((j) => j.id)).toEqual(["payout:lesson-1"]);
    expect(s.store.all()[0]?.dispatchedAt).toEqual(new Date(T0));
  });

  it("a failed business transaction leaves no job and dispatches nothing", async () => {
    const s = setup();
    await expect(
      runWithJobs(s.deps, async (_tx, enqueue) => {
        enqueue({ id: "j1", type: "payout", payload: {} });
        throw new Error("business failure");
      }),
    ).rejects.toThrow("business failure");
    expect(s.store.all()).toHaveLength(0);
    expect(s.dispatcher.dispatched).toHaveLength(0);
  });

  it("a dispatch outage does not fail the use case; the sweeper dispatches later", async () => {
    const s = setup();
    s.dispatcher.failNext = true;
    await expect(enqueueOne(s)).resolves.toBe("business-result");
    expect(s.store.all()[0]?.dispatchedAt).toBeNull();
    s.clock.advanceMs(120_000);
    expect(await sweepUndispatched(s.deps, { olderThanMs: 60_000, limit: 10 })).toBe(1);
    expect(s.dispatcher.dispatched).toHaveLength(1);
    expect(s.store.all()[0]?.dispatchedAt).not.toBeNull();
  });
});

describe("runner is idempotent and fails loudly (principles 6, 8, 22)", () => {
  it("runs the handler once; a second delivery of a succeeded job is a no-op", async () => {
    let calls = 0;
    const s = setup({ payout: async () => void (calls += 1) });
    await enqueueOne(s);
    expect(await runJob(s.deps, "payout:lesson-1")).toBe("done");
    expect(await runJob(s.deps, "payout:lesson-1")).toBe("skipped");
    expect(calls).toBe(1);
    expect(s.store.all()[0]).toMatchObject({ state: "succeeded", attempts: 1 });
  });

  it("a throwing handler asks for a retry, then fails with an alert after max attempts", async () => {
    const s = setup(
      { payout: async () => Promise.reject(new Error("bank timeout for +995555123456")) },
      { maxAttempts: 2 },
    );
    await enqueueOne(s);
    expect(await runJob(s.deps, "payout:lesson-1")).toBe("retry");
    expect(s.store.all()[0]).toMatchObject({ state: "pending", attempts: 1 });
    expect(await runJob(s.deps, "payout:lesson-1")).toBe("failed");
    expect(s.store.all()[0]).toMatchObject({ state: "failed", attempts: 2, lastError: "Error" });
    const out = s.lines.join("");
    expect(out).toContain('"alert":"job_failed"');
    expect(out).toContain('"severity":"ERROR"');
    expect(s.store.all()[0]?.lastError).not.toContain("995"); // no PII persisted in the job record
  });

  it("an unknown job type fails immediately with an alert", async () => {
    const s = setup({});
    await enqueueOne(s);
    expect(await runJob(s.deps, "payout:lesson-1")).toBe("failed");
    expect(s.lines.join("")).toContain('"alert":"job_failed"');
  });

  it("a missing job is skipped, not an error", async () => {
    expect(await runJob(setup().deps, "nope")).toBe("skipped");
  });

  it("a live lease blocks a concurrent delivery; an expired lease is reclaimed (crash recovery)", async () => {
    let calls = 0;
    let release: () => void = () => undefined;
    const gate = new Promise<void>((r) => (release = r));
    const s = setup({ payout: async () => ((calls += 1), await gate) });
    await enqueueOne(s);
    const first = runJob(s.deps, "payout:lesson-1");
    await new Promise((r) => setTimeout(r, 5));
    expect(await runJob(s.deps, "payout:lesson-1")).toBe("retry"); // still leased
    expect(calls).toBe(1);
    release();
    expect(await first).toBe("done");

    const crashed = setup({ payout: async () => void 0 });
    await enqueueOne(crashed);
    const stuck = crashed.store.all()[0];
    if (!stuck) throw new Error("fixture");
    crashed.store.replace({
      ...stuck,
      state: "running",
      attempts: 1,
      leaseUntil: new Date(Date.parse(T0) + 60_000),
    });
    crashed.clock.advanceMs(61_000);
    expect(await runJob(crashed.deps, "payout:lesson-1")).toBe("done");
  });
});
