import { describe, expect, it } from "vitest";
import { CloudTasksDispatcher, type TasksClient } from "./cloud-tasks-dispatcher.ts";

const config = {
  timeoutMs: 4_000,
  queuePath: "projects/p/locations/l/queues/jobs",
  serviceUrl: "https://api.example.run.app",
  invokerServiceAccount: "inv@p.iam.gserviceaccount.com",
};
const NOW = new Date("2027-01-01T00:00:00Z");

function dispatcherWith(createTask: TasksClient["createTask"]) {
  return new CloudTasksDispatcher({ createTask }, config, () => NOW);
}

describe("CloudTasksDispatcher (adapter behind JobDispatcher)", () => {
  it("creates an HTTP task with OIDC auth, a deterministic safe name, and the job id as body", async () => {
    const calls: Parameters<TasksClient["createTask"]>[0][] = [];
    await dispatcherWith(async (r) => void calls.push(r)).dispatch({
      id: "payout:lesson/1",
      runAt: NOW,
    });
    const req = calls[0];
    expect(req?.task.name).toMatch(
      /^projects\/p\/locations\/l\/queues\/jobs\/tasks\/job-[0-9a-f]{40}$/,
    );
    expect(req?.task.httpRequest.url).toBe("https://api.example.run.app/internal/jobs/run");
    expect(req?.task.httpRequest.oidcToken).toEqual({
      serviceAccountEmail: config.invokerServiceAccount,
      audience: config.serviceUrl,
    });
    expect(JSON.parse(Buffer.from(req?.task.httpRequest.body ?? "", "base64").toString())).toEqual({
      jobId: "payout:lesson/1",
    });
    expect(req?.task.scheduleTime).toBeUndefined();
  });

  it("every call has an explicit timeout (principle 22: never wait forever on the outside world)", async () => {
    const options: unknown[] = [];
    await dispatcherWith(async (_r, o) => void options.push(o)).dispatch({ id: "j", runAt: NOW });
    expect(options).toEqual([{ timeout: 4_000 }]);
  });

  it("schedules delayed jobs (e.g. hold expiry) for their runAt", async () => {
    const calls: Parameters<TasksClient["createTask"]>[0][] = [];
    await dispatcherWith(async (r) => void calls.push(r)).dispatch({
      id: "hold-expiry:b1",
      runAt: new Date("2027-01-01T00:15:00Z"),
    });
    expect(calls[0]?.task.scheduleTime).toEqual({
      seconds: Date.parse("2027-01-01T00:15:00Z") / 1000,
    });
  });

  it("treats ALREADY_EXISTS as success and other failures as retryable dependency_unavailable", async () => {
    await expect(
      dispatcherWith(async () =>
        Promise.reject(Object.assign(new Error("dup"), { code: 6 })),
      ).dispatch({ id: "j", runAt: NOW }),
    ).resolves.toBeUndefined();
    await expect(
      dispatcherWith(async () => Promise.reject(new Error("503"))).dispatch({
        id: "j",
        runAt: NOW,
      }),
    ).rejects.toMatchObject({ code: "dependency_unavailable" });
  });
});
