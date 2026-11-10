# ახალი ფუნქციის აგება — ნაბიჯ-ნაბიჯ (ბირთვზე დაყრდნობით)

წესი: ჯერ გეგმა (კოდი არა) → ტესტი → კოდი პატარა ნაბიჯებით → გეიტები (`pnpm gates`, `pnpm test:integration`).
ბირთვი (`apps/api/src/shared`) უკვე გაკეთებულია — მოდული წერს მხოლოდ **ბიზნეს-წესებს**. იხ. ADR-0002.

## 0. გეგმა (დაწერე პასუხში, სანამ კოდს შეეხები)

ინვარიანტი · ჩავარდნები · რომელი მოთხოვნები/ინდექსები · რომელი მოდული ფლობს · დაშვებები · ღია კითხვები (#1–#19 `architecture-digest.md`-დან).

## 1. კონტრაქტი ჯერ

`packages/api-client/openapi/v1.yaml` → endpoint (მხოლოდ დამატებით; POST/PUT → `Idempotency-Key` პარამეტრი `$ref`) → `pnpm api:generate` → `pnpm api:check`.

## 2. მოდულის ფენები (`apps/api/src/modules/<m>/`)

```
domain/          სუფთა TS: Value Objects, state machine (defineStateMachine), წესები. SDK-ის გარეშე.
application/     use case = ერთი ტრანზაქცია:  uow/runWithJobs(deps, async (tx, enqueue) => { read…; write…; enqueue(job) })
infrastructure/  repository → Firestore (asFirestoreTx(tx)); ჯერ ყველა წაკითხვა, მერე ჩაწერა
http/            controller: principal → resolveContext → authorize(table, ctx, action, resource) → zod → use case
definition.ts    ვადები/ნაბიჯები/ტექსტები (declarative) ან config-დოკუმენტი (ვერსიული)
index.ts         ერთადერთი საჯარო ინტერფეისი
```

`pnpm architecture` ამას ამოწმებს (ფენების მიმართულება, domain-ის სიწმინდე, Firestore მხოლოდ infrastructure-ში).

## 3. ჩაწერის endpoint-ის ჩონჩხი

```ts
app.post("/v1/…", async (req, reply) => {
  const principal = await auth.principalOf(req); // 401 თუ ტოკენი არასწორია
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
  ); // runWithJobs შიგნით
  return reply.status(result.status).send(result.body);
});
```

## 4. რა როდის გამოიყენო

| საჭიროება                                        | ინსტრუმენტი                                                                                               |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| „ერთხელ“ / უნიკალური (slot, payout, application) | განსაზღვრული ID + `tx.create` (ბირთვი: `FirestoreJobStore.create`-ის მსგავსად)                            |
| გვერდითი ეფექტი (SMS, გადარიცხვა, ვადის გასვლა)  | `enqueue({ id: "payout:<lessonId>", type, payload, runAt? })` + handler `JOB_HANDLERS`-ში (`platform.ts`) |
| სტატუსი                                          | `defineStateMachine` — თავისუფალი UPDATE არა                                                              |
| ფული                                             | `Tetri`, `allocate`, `balancedTransaction`; შესწორება — `reversalOf`                                      |
| ვადა/ზღვარი/ტექსტი                               | `definition.ts` ან config + `resolveEffective`; ჩანაწერზე ვერსია                                          |
| სია                                              | `PageQuerySchema` + `encodeCursor`/`decodeCursor`                                                         |
| დრო                                              | `Clock` (არასდროს `new Date()` domain-ში)                                                                 |
| გარე სისტემა                                     | port + adapter + fake ტესტისთვის (timeout, დუბლიკატი, გადალაგება)                                         |

## 5. ეკრანი (ვები; მობილურზე იგივე hooks)

`apps/web/features/<name>/{components,hooks,api,model}`; მონაცემი — `api.useQuery/useMutation` (`data/api.ts`);
`toScreenState(query, isEmpty)` → `<ScreenStateView state={…}>`; ფორმა — react-hook-form + zod (`@drivenet/schemas`) + `applyServerFieldErrors`;
ჩაწერა — `useIdempotencyKey()` + `<Button loading={isPending}>`; შეცდომა — `behaviorFor(error.problem.code)`; ტექსტი — `ka.*` (`packages/i18n`).

## 6. არასდროს

სტატუსის თავისუფალი UPDATE · გარე ზარი ტრანზაქციაში · ფულის ჩანაწერის შეცვლა/წაშლა · კლიენტის პირდაპირი წვდომა ბაზაზე · ფასის/უფლების გამოთვლა კლიენტზე · PII/ტოკენი/კოდი ლოგში · ციფრი (ვადა/ლიმიტი) განმარტების გარეშე კოდში.
