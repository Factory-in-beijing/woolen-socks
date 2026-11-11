# Building a new feature — step by step (on top of the kernel)

Rule: plan first (no code) → tests → code in small steps → gates (`pnpm gates`, `pnpm test:integration`).
The kernel (`apps/api/src/shared`) already exists — a module writes only **business rules**. See ADR-0002.

## 0. Plan (write it in your reply before touching code)

Invariant · failure cases · which queries/indexes · which module owns it · assumptions · open questions (#1–#19 in `open-questions.md`; the module's own file in `docs/modules/`).

## 1. Contract first

`packages/api-client/openapi/v1.yaml` → endpoint (addition only; POST/PUT → `$ref` the `IdempotencyKey` parameter) → `pnpm api:generate` → `pnpm api:check`.

## 2. Module layers (`apps/api/src/modules/<m>/`)

```
domain/          pure TS: Value Objects, state machine (defineStateMachine), rules. No SDKs.
application/     use case = one transaction:  uow/runWithJobs(deps, async (tx, enqueue) => { read…; write…; enqueue(job) })
infrastructure/  repository → Firestore (asFirestoreTx(tx)); all reads first, then writes
http/            controller: principal → resolveContext → authorize(table, ctx, action, resource) → zod → use case
definition.ts    deadlines/steps/texts (declarative) or a config document (versioned)
index.ts         the only public interface
```

`pnpm architecture` enforces this (layer direction, domain purity, Firestore only in infrastructure).

## 3. Write-endpoint skeleton

```ts
app.post("/v1/…", async (req, reply) => {
  const principal = await auth.principalOf(req); // 401 if the token is invalid
  const ctx = await resolveContext(
    memberships,
    principal,
    req.headers["x-workspace-id"] as string | undefined,
  );
  authorize(policy, ctx, "booking.create", { type: "booking", workspaceId: ctx.workspaceId });
  const body = Body.parse(req.body); // zod → AppError.fromZod
  const key = readIdempotencyKey(req);
  const result = await withIdempotency(
    idempotency,
    { principalId, route: "POST /v1/…", key },
    body,
    () => createBooking(deps, ctx, body),
  ); // runWithJobs inside
  return reply.status(result.status).send(result.body);
});
```

(Illustrative: `principalId` comes from `principal`, which must be a signed-in user at that point.)

## 4. What to use when

| Need                                        | Tool                                                                                                        |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| "Once" / unique (slot, payout, application) | defined ID + `tx.create` (like `FirestoreJobStore.create`)                                                  |
| Side effect (SMS, payout, expiry)           | `enqueue({ id: "payout:<lessonId>", type, payload, runAt? })` + a handler in `JOB_HANDLERS` (`platform.ts`) |
| Status                                      | `defineStateMachine` — no free-form UPDATE                                                                  |
| Money                                       | `Tetri`, `allocate`, `balancedTransaction`; corrections via `reversalOf`                                    |
| Deadline/limit/text                         | `definition.ts` or config + `resolveEffective`; store the version on the record                             |
| Lists                                       | `PageQuerySchema` + `encodeCursor`/`decodeCursor`                                                           |
| Time                                        | `Clock` (never `new Date()` in domain)                                                                      |
| External system                             | port + adapter + a fake for tests (timeout, duplicate, reordering)                                          |

## 5. Screen (web; mobile reuses the hooks)

`apps/web/features/<name>/{components,hooks,api,model}`; data via `api.useQuery/useMutation` (`data/api.ts`);
`toScreenState(query, isEmpty)` → `<ScreenStateView state={…}>`; forms with react-hook-form + zod (`@drivenet/schemas`) + `applyServerFieldErrors`;
writes with `useIdempotencyKey()` + `<Button loading={isPending}>`; errors via `behaviorFor(error.problem.code)`; text from `messages.*` (`packages/i18n`).

## 6. Never

Free-form status UPDATE · an external call inside a transaction · editing or deleting a money record · direct client access to the database · computing price/permission on the client · PII/tokens/codes in logs · a number (deadline/limit) in code without a definition.
