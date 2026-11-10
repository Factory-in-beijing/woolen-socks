import { beforeAll, describe, expect, it } from "vitest";
import { fixedClock } from "../../src/shared/clock.ts";
import { workspaceId } from "../../src/shared/domain/ids.ts";
import {
  asFirestoreTx,
  FirestoreUnitOfWork,
} from "../../src/shared/infrastructure/firestore-uow.ts";
import { firestore } from "../../src/shared/infrastructure/firebase.ts";
import { FirestoreJobStore } from "../../src/shared/infrastructure/firestore-job-store.ts";
import { createLogger } from "../../src/shared/logger.ts";
import { RecordingDispatcher } from "../../src/shared/jobs/testing.ts";
import {
  runJob,
  runWithJobs,
  sweepUndispatched,
  type RunnerDeps,
} from "../../src/shared/jobs/runner.ts";

beforeAll(() => {
  process.env["GCLOUD_PROJECT"] = "demo-drivenet";
});

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

function deps(handlers: RunnerDeps["handlers"] = {}) {
  const db = firestore();
  const clock = fixedClock("2027-01-01T00:00:00Z");
  const dispatcher = new RecordingDispatcher();
  const d: RunnerDeps = {
    uow: new FirestoreUnitOfWork(db),
    store: new FirestoreJobStore(db),
    dispatcher,
    clock,
    logger: createLogger({ level: "silent" }),
    handlers,
    maxAttempts: 2,
    leaseMs: 60_000,
  };
  return { d, db, clock, dispatcher };
}

describe("transactional job record on Firestore (principles 7, 8)", () => {
  it("the job is committed atomically with the business write, then dispatched", async () => {
    const { d, db, dispatcher } = deps();
    const id = `payout:${uid()}`;
    await runWithJobs(d, async (tx, enqueue) => {
      asFirestoreTx(tx).create(db.doc(`lessons/${id}`), { status: "completed" });
      enqueue({
        id,
        type: "payout",
        payload: { lessonId: id },
        workspaceId: workspaceId("ws-owner"),
      });
    });
    expect((await db.doc(`lessons/${id}`).get()).exists).toBe(true);
    const job = (await db.doc(`jobs/${id}`).get()).data();
    expect(job).toMatchObject({
      type: "payout",
      state: "pending",
      attempts: 0,
      workspaceId: "ws-owner",
    });
    expect(job?.["dispatchedAt"]).not.toBeNull();
    expect(dispatcher.dispatched.map((j) => j.id)).toEqual([id]);
  });

  it("a failing business transaction leaves neither business data nor a job", async () => {
    const { d, db, dispatcher } = deps();
    const id = `payout:${uid()}`;
    await expect(
      runWithJobs(d, async (tx, enqueue) => {
        asFirestoreTx(tx).create(db.doc(`lessons/${id}`), { status: "completed" });
        enqueue({ id, type: "payout", payload: {} });
        throw new Error("boom");
      }),
    ).rejects.toThrow("boom");
    expect((await db.doc(`lessons/${id}`).get()).exists).toBe(false);
    expect((await db.doc(`jobs/${id}`).get()).exists).toBe(false);
    expect(dispatcher.dispatched).toHaveLength(0);
  });

  it("a duplicate job id is a unique-constraint violation that aborts the whole transaction", async () => {
    const { d, db } = deps();
    const id = `payout:${uid()}`;
    await runWithJobs(d, async (_tx, enqueue) => enqueue({ id, type: "payout", payload: {} }));
    await expect(
      runWithJobs(d, async (tx, enqueue) => {
        asFirestoreTx(tx).create(db.doc(`lessons/dup-${id}`), { status: "x" });
        enqueue({ id, type: "payout", payload: {} });
      }),
    ).rejects.toThrow();
    expect((await db.doc(`lessons/dup-${id}`).get()).exists).toBe(false);
  });

  it("runs the handler once and records the outcome; sweeper finds undispatched jobs", async () => {
    let calls = 0;
    const { d, db, dispatcher, clock } = deps({ payout: async () => void (calls += 1) });
    const id = `payout:${uid()}`;
    dispatcher.failNext = true;
    await runWithJobs(d, async (_tx, enqueue) =>
      enqueue({ id, type: "payout", payload: { a: 1 } }),
    );
    expect((await db.doc(`jobs/${id}`).get()).get("dispatchedAt")).toBeNull();
    clock.advanceMs(120_000);
    expect(await sweepUndispatched(d, { olderThanMs: 60_000, limit: 500 })).toBeGreaterThanOrEqual(
      1,
    );
    expect(dispatcher.dispatched.map((j) => j.id)).toContain(id);

    expect(await runJob(d, id)).toBe("done");
    expect(await runJob(d, id)).toBe("skipped");
    expect(calls).toBe(1);
    expect((await db.doc(`jobs/${id}`).get()).data()).toMatchObject({
      state: "succeeded",
      attempts: 1,
      lastError: null,
    });
  });
});
