# 27 ინჟინერიული პრინციპი

> წყარო: „DriveNet 2027 · ინჟინერიული პრინციპები, არქიტექტურა და პატერნები“ (Visual Guide), გვ. 2–4. ქართული ტექსტი — წესი, რატომ, მაგალითი — წყაროდანაა გადმოღებული ცვლილების გარეშე.
>
> **ინგლისურ TypeScript ნიმუშებს (✓/✗) წყარო არ შეიცავს:** ისინი საილუსტრაციოა, დაწერილია წყაროს „მაგალითი“ ხაზებისა და ამ რეპოს რეალური ბირთვის (`apps/api/src/shared`) მიხედვით და მხოლოდ გასაგებად არის დამატებული. კონფლიქტისას მთავარია ქართული ტექსტი.

არ ირღვევა. ხელით ჩაწერილი განმარტება წყვეტს, რას ვაშენებთ; პრინციპები — როგორ. კონფლიქტზე ვჩერდებით და ვკითხულობთ.

წყაროს ფერადი ლეგენდის კატეგორიები: კონტრაქტი · მონაცემი და დრო · სისწორე და ფული · უსაფრთხოება და საიმედოობა · კოდი · პროცესი. (წყაროს ტექსტი თითოეულ პრინციპს კატეგორიას სახელით არ აკუთვნებს, ამიტომ აქ მიკუთვნებას არ ვიგონებთ.)

---

## 1 · Contract-first · მხოლოდ დამატებით

OpenAPI ერთადერთი წყაროა. ტიპები და api-client გენერირდება. API იცვლება მხოლოდ ახალი ველის ან endpoint-ის დამატებით.

**რატომ** · ვები და მობილური ერთ API-ს იყენებს; ძველი აპის ვერსიები მაღაზიაში რჩება — გატეხილი ცვლილება მათ გააჩერებს.

**მაგალითი** · ახალი ველი — ოფციური. ველის წაშლა ან გადარქმევა — არა. CI-ში OpenAPI diff-გეიტია.

```ts
// ✓ the contract changes first (additive), the client type is generated
// packages/api-client/openapi/v1.yaml  →  pnpm api:generate
import type { components } from "@drivenet/api-client";
type Lesson = components["schemas"]["Lesson"];

// ✗ a hand-written copy of a response type, and a renamed/removed field
type LessonDto = { id: string; priceInLari: number }; // drifts from the contract
```

## 2 · სერვერი წყვეტს

ფასი, უფლება, გადახდის შედეგი, გაუქმების პირობა სერვერზე გამოითვლება. კლიენტი მხოლოდ აჩვენებს.

**რატომ** · ერთი წესი ყველა კლიენტისთვის; არაფერი მეორდება და არაფერი გვერდის ავლით არ მოხდება.

**მაგალითი** · /me/capabilities ღილაკის ჩვენებისთვისაა. API ყოველთვის თავად ამოწმებს უფლებას.

```ts
// ✓ server: the policy function decides, every time
authorize(policy, ctx, "lesson.cancel", { type: "lesson", workspaceId: ctx.workspaceId });

// ✗ client: price and permission computed on the device, then trusted by the server
const total = lesson.price * (1 - discount);
if (capabilities.canCancel) await api.POST("/v1/lessons/{id}/cancel", { body: { total } });
```

## 3 · მოდულური მონოლითი

ერთი სერვისი, რვა მოდული. მოდული ფლობს თავის collection-ებს და გარეთ ხსნის მხოლოდ index.ts-ს.

**რატომ** · ამ მასშტაბზე ერთი სერვისი მარტივია; საზღვრები ცვლილებას ლოკალურს ხდის და მოგვიანებით გამოყოფის საშუალებას იძლევა.

**მაგალითი** · M3 M4-ის ბაზას პირდაპირ არ კითხულობს — მის index.ts-ს იძახებს. საზღვარს lint ამოწმებს.

```ts
// ✓ marketplace → money through the public interface only
import { refundFor } from "../money";

// ✗ reaching into another module's internals (dependency-cruiser fails the build)
import { ledgerRepository } from "../money/infrastructure/ledger-repository";
```

## 4 · Firestore — მხოლოდ API-ით

კლიენტი ბაზას პირდაპირ არ ეხება. Security Rules = deny-all. წვდომა Admin SDK-ით.

**რატომ** · Rules ბიზნეს-ლოგიკას ვერ გამოხატავს. ერთი შესასვლელი = დაცვისა და ტესტირების ერთი ადგილი.

**მაგალითი** · საიტი და აპი Firestore SDK-ს არ იყენებს — მხოლოდ გენერირებულ api-client-ს.

```ts
// ✓ web / mobile
const lessons = api.useQuery("get", "/v1/lessons");

// ✗ web / mobile — never
import { getFirestore, collection } from "firebase/firestore";
```

## 5 · ჯერ წაკითხვის სცენარი

ყოველი წაკითხვა limit-ით და ინდექსით (cursor, არა offset). ცხელი დოკუმენტი, საერთო მრიცხველი და მონოტონური ID აკრძალულია.

**რატომ** · Firestore ჰორიზონტალურად იზრდება მხოლოდ შეზღუდული წაკითხვისა და გადანაწილებული ჩაწერის შემთხვევაში.

**მაგალითი** · ინსტრუქტორების სია — ერთი listing დოკუმენტი ბარათზე, join-ის გარეშე.

```ts
// ✓ one listing document per card, keyset pagination
db.collection("instructorListings")
  .where("city", "==", city)
  .orderBy("createdAt")
  .startAfter(cursor)
  .limit(limit);

// ✗ offset pagination and a shared counter document
query.offset(page * pageSize);
await db.doc("counters/lessons").update({ total: FieldValue.increment(1) });
```

## 6 · იდემპოტენტური ჩაწერა

განმეორებადი ოპერაცია (retry, webhook, job) უვნებელია: Idempotency-Key ან განსაზღვრული create-only ID.

**რატომ** · ქსელი და retry აორმაგებს მოთხოვნებს; Firestore-ს unique constraint არ აქვს.

**მაგალითი** · „გადახდაზე“ ორმაგი დაჭერა = ერთი ჯავშანი. slot ID = პირი + თარიღი + უჯრა.

```ts
// ✓ a defined id + create-only: the second write fails with ALREADY_EXISTS → 409 slot_taken
tx.create(db.doc(`slots/${instructorId}_${date}_${cell}`), { bookingId });
// ✓ or an Idempotency-Key: same key + same request = same response
await withIdempotency(store, scope, body, () => createBooking(deps, ctx, body));

// ✗ auto-id or set(): a double tap creates two bookings
await db.collection("bookings").add({ instructorId, date, cell });
```

## 7 · ერთი use case = ერთი პატარა ტრანზაქცია

ჯერ ყველა წაკითხვა, მერე ჩაწერა. ტრანზაქციაში სხვა სისტემის ზარი არასდროს.

**რატომ** · კონფლიქტზე ტრანზაქცია თავიდან სრულდება — გარე ზარიც გამეორდებოდა.

**მაგალითი** · BOG-ის ან SMS-ის ზარი ტრანზაქციაში არ არის; ის job-ით გადის.

```ts
// ✓ reads first, then writes; the SMS is a job record in the same transaction
await uow.run(async (tx) => {
  const slot = await slots.get(tx, slotId);
  slots.put(tx, reserve(slot));
});

// ✗ an external call inside the transaction (it would run again on contention)
await db.runTransaction(async (tx) => {
  await smsProvider.send(phone, "Booked");
  tx.set(ref, data);
});
```

## 8 · გვერდითი ეფექტი — job

შეტყობინება, გადარიცხვა, ვადის გასვლა ტრანზაქციის შემდეგ job-ით სრულდება (Firestore ჩანაწერი + Cloud Tasks / Scheduler), retry-ით.

**რატომ** · SMS-ის ან ბანკის გაუმართაობამ ბიზნეს-ოპერაცია არ უნდა შეაჩეროს, მაგრამ ჩუმადაც არ უნდა დარჩეს.

**მაგალითი** · ჯავშანი დადასტურდა, SMS ჩავარდა → job = failed + alert. ჯავშანი რჩება.

```ts
// ✓ the job record is written with the business change; dispatch happens after commit
await runWithJobs(deps, async (tx, enqueue) => {
  bookings.create(tx, booking);
  enqueue({
    id: `sms:${booking.id}`,
    type: "send-confirmation-sms",
    payload: { bookingId: booking.id },
  });
});

// ✗ the booking fails because the SMS provider is down
await bookings.create(booking);
await smsProvider.send(phone, text); // throws → the whole use case fails
```

## 9 · სტატუსი — state machine

სტატუსი იცვლება მხოლოდ გადასვლების ცხრილით. თავისუფალი UPDATE არ არსებობს.

**რატომ** · შეუძლებელ მდგომარეობას (გადახდილი, მაგრამ გაუქმებული) გამორიცხავს და ქცევას ტესტირებადს ხდის.

**მაგალითი** · hold → paid → completed | cancelled. სხვა გადასვლა → 409 invalid_transition.

```ts
// ✓ transitions only through the table
const bookingMachine = defineStateMachine({
  hold: { pay: "paid" },
  paid: { complete: "completed", cancel: "cancelled" },
  completed: {},
  cancelled: {},
} as const);
const next = bookingMachine.next(booking.status, "pay"); // other events → 409 invalid_transition

// ✗ a free-form status update
await ref.update({ status: "paid" });
```

## 10 · ფული — მხოლოდ დამატებით

integer თეთრი. ორმაგი ჩანაწერი, ჯამი = 0. ჩანაწერი არასდროს იცვლება — შეცდომა უკუ-ჩანაწერით სწორდება.

**რატომ** · აუდიტი და BOG-თან შედარება შესაძლებელია მხოლოდ უცვლელ ისტორიაზე.

**მაგალითი** · დაბრუნება = ახალი საპირისპირო ჩანაწერი, ძველის შეცვლა არა.

```ts
// ✓ integer tetri, balanced entries, correction = reversal
const tx = balancedTransaction([
  { account: "customer", amount: tetri(-5000) },
  { account: "partner", amount: tetri(4500) },
  { account: "drivenet", amount: tetri(500) },
]);
const refund = reversalOf(tx);

// ✗ floats, and editing history
const price = 0.1 + 0.2;
await ledgerEntry.update({ amount: 0 });
```

## 11 · გარე სამყარო — adapter-ის უკან

BOG, BOnline, Maps, SMS/ელფოსტა ინტერფეისის უკანაა. გარე ფორმატი domain-ში არ შემოდის. შედეგი უცნობია → სტატუსს ვკითხულობთ, ფულის ოპერაციას თავიდან არ ვაგზავნით.

**რატომ** · პროვაიდერი იცვლება და ვარდება; ფულის ხელახალი გაგზავნა ორმაგი გადახდაა.

**მაგალითი** · PaymentProvider ინტერფეისი. ტესტში fake adapter: timeout, დუბლიკატი, გადალაგება.

```ts
// ✓ a port in the application layer; the BOG adapter lives in infrastructure
interface PaymentProvider {
  charge(request: ChargeRequest): Promise<ChargeResult>;
  statusOf(paymentId: PaymentId): Promise<PaymentStatus>; // unknown outcome → read the status
}

// ✗ the provider's wire format leaking into the domain; re-sending after a timeout
if (bogResponse.status_code === "ok") order.paid = true;
await bog.charge(request); // retried blindly after a timeout → double charge
```

## 12 · განმარტება ≠ ძრავა

ძრავა (სისწორის წესები) მყარია. განმარტება (ვადები, ზღვრები, ნაბიჯები, ტექსტები, პაკეტის შემადგენლობა) ერთ declarative ადგილასაა. ჩანაწერი ინახავს ვერსიას.

**რატომ** · ფუნქციის განმარტება შეიცვლება — ეს არ უნდა ეხებოდეს ძრავის კოდს და არ უნდა გადაწეროს ისტორია.

**მაგალითი** · გაუქმების ვადა config-ია; ჯავშანზე ინახება გამოყენებული პოლიტიკის ვერსია.

```ts
// ✓ the deadline lives in a versioned definition; the record stores the version used
// modules/marketplace/definition.ts  (or a config document resolved with resolveEffective)
booking.cancellationPolicyVersion = policy.version;

// ✗ a number scattered in code, no version on the record
if (hoursBeforeLesson < 24) throw new Error("too late");
```

## 13 · ერთი შეცდომის მოდელი

AppError → problem+json {code, traceId, retryable}. მოსალოდნელი წარუმატებლობა მნიშვნელობაა და არა exception.

**რატომ** · ყველა კლიენტი ერთნაირად რეაგირებს და ყოველი ჩავარდნა traceId-ით მოიძებნება.

**მაგალითი** · slot_taken → ალტერნატივები. 503 retryable → „ხელახლა ცდა“.

```ts
// ✓ an expected failure is an AppError with a code → problem+json {code, traceId, retryable}
throw new AppError("slot_taken", "Slot is already taken");

// ✗ an anonymous Error / ad-hoc JSON the clients cannot react to
throw new Error("slot taken");
return reply.status(400).send({ message: "oops" });
```

## 14 · საქართველოს დრო

instant UTC-ში. ბიზნეს-დღე, გრაფიკი, ღამის და თვიური job-ები — Asia/Tbilisi (UTC+4, ზაფხულის დროის გარეშე). Clock შეყვანილია.

**რატომ** · ბაზარი საქართველოა — დღის საზღვარი მომხმარებლის დღეს უნდა ემთხვეოდეს; Clock ტესტს განსაზღვრულს ხდის.

**მაგალითი** · ღამის გადარიცხვის job Scheduler-ში Asia/Tbilisi ზონითაა; ტესტში Clock ფიქსირებულია.

```ts
// ✓ an injected Clock; instants in UTC; the business date from the single formatter
const now = deps.clock.now();
const day = businessDate(now); // Asia/Tbilisi

// ✗ the system clock in domain code, device-dependent formatting
const today = new Date().toLocaleDateString();
```

## 15 · უსაფრთხოება ნაგულისხმევად

საიდუმლო Secret Manager-ში. PII, ტოკენი და კოდი ლოგში არასდროს. ადმინს MFA. ფაილი signed URL-ით. მინიმალური უფლებები.

**რატომ** · პირადი დოკუმენტები და ფული — შეცდომის ფასი მაღალია.

**მაგალითი** · მართვის მოწმობის ფოტო — დახურული signed URL. ბარათის მონაცემი ჩვენთან არ ინახება.

```ts
// ✓ log ids, never personal data or codes
req.log.info({ bookingId }, "booking confirmed");

// ✗ PII, tokens and one-time codes in logs; a secret in the repository
req.log.info({ phone, smsCode, idToken }, "login");
const BOG_SECRET = "live-secret-123";
```

## 16 · სუფთა კოდი — მცირე ფუნქცია

ერთი პასუხისმგებლობა. სახელები დომენის ენაზე. ადრეული return. ჯადოსნური მნიშვნელობა — სახელიან კონსტანტაში ან კონფიგში. კომენტარი ხსნის „რატომ“-ს.

**რატომ** · კოდს ბევრად უფრო ხშირად კითხულობენ, ვიდრე წერენ — სიცხადე ყველაზე იაფი მხარდაჭერაა.

**მაგალითი** · cancelLesson(), არა handle(). 30 → QUICK_TEST_TICKET_COUNT.

```ts
// ✓ domain names, a named value (really: a definition/config entry), a comment that says why
const QUICK_TEST_TICKET_COUNT = 30; // the quick test is defined as 30 tickets
export function cancelLesson(lesson: Lesson, now: Date): CancelResult {
  /* … */
}

// ✗ a vague name and a magic number
export function handle(x: any) {
  if (x.n > 30) {
    /* … */
  }
}
```

## 17 · უმარტივესი გამოსავალი

ვაშენებთ იმას, რასაც მოთხოვნა დღეს ითხოვს. აბსტრაქცია — მესამე გამოყენებაზე. ახალი სერვისი ან ბიბლიოთეკა — მხოლოდ ADR-ით. ჯერ მართული Google Cloud / Firebase სერვისი.

**რატომ** · ყოველი ზედმეტი ფენა მუდმივი ხარჯია; მარტივი კოდი უფრო იოლად იზრდება და იცვლება.

**მაგალითი** · ქეში, Pub/Sub, სერვისების გაყოფა — მხოლოდ გაზომვის შემდეგ.

```ts
// ✓ the managed service answers today's requirement
const snap = await db.collection("instructorListings").limit(limit).get();

// ✗ speculative layers: a generic repository factory and a cache nobody measured
class CachedGenericRepository<T> extends RedisBackedStore<T> {
  /* … */
}
```

## 18 · მაღალი კავშირიანობა, სუსტი დამოკიდებულება

მოდული ერთ საქმეს აკეთებს. დამოკიდებულება შიგნისკენაა: domain ← application ← infrastructure. წრიული იმპორტი და გლობალური მდგომარეობა არ არსებობს.

**რატომ** · ცვლილება ლოკალური რჩება; მოდული იცვლება ან იშლება მეზობლების გარეშე.

**მაგალითი** · domain Firestore-ს არ იმპორტირებს. repository = port (ინტერფეისი).

```ts
// ✓ domain/application depend on a port; infrastructure implements it
export interface LessonRepository {
  get(tx: Tx, id: LessonId): Promise<Lesson | undefined>;
}

// ✗ domain importing the SDK
import { getFirestore } from "firebase-admin/firestore"; // inside modules/*/domain
```

## 19 · შეუძლებელი მდგომარეობა — შეუძლებელი კოდში

TypeScript strict, any-ის გარეშე. branded types (ფული, ID). discriminated union სტატუსზე. გარე მონაცემი საზღვარზე zod-ით მოწმდება.

**რატომ** · ბაგს კომპილატორი იჭერს გაშვებამდე.

**მაგალითი** · Money და LessonId სხვადასხვა ტიპია — ერთმანეთში აღრევა კომპილაციაზე ჩანს.

```ts
// ✓ distinct branded types, an exhaustive union, zod at the boundary
type LessonId = Brand<string, "LessonId">;
function refund(amount: Tetri, lesson: LessonId): void {}
type ScreenState<T> =
  | { status: "loading" }
  | { status: "empty" }
  | { status: "error"; error: ApiError }
  | { status: "ready"; data: T };
const body = BookingBody.parse(req.body);

// ✗ interchangeable primitives and an impossible-state bag
refund(lessonId, amount); // compiles when both are plain strings/numbers
type State = { loading: boolean; error?: string; data?: unknown };
```

## 20 · სუფთა ბირთვი, ეფექტები კიდეზე

ბიზნეს-ლოგიკა სუფთა ფუნქციებია. დრო (Clock), შემთხვევითობა და I/O შეყვანილია და თხელ adapter-ებშია.

**რატომ** · ლოგიკა mock-ის გარეშე ტესტირდება და განსაზღვრულია.

**მაგალითი** · calculateRefund(lesson, policy, now) — ბაზას არ ეხება.

```ts
// ✓ a pure function: same inputs, same output, no I/O
export function calculateRefund(lesson: Lesson, policy: RefundPolicy, now: Date): Tetri {
  /* … */
}

// ✗ the same logic reading the database and the system clock itself
export async function calculateRefund(id: string) {
  const lesson = await db.doc(`lessons/${id}`).get();
  return Date.now() < lesson.get("startsAt") ? lesson.get("price") : 0;
}
```

## 21 · ტესტი რისკის მიხედვით

unit — domain წესები. integration — Emulator Suite-ზე. e2e — მხოლოდ კრიტიკულ გზაზე. ტესტი ქცევას ამოწმებს. ბაგის გასწორება ჩავარდნილი ტესტით იწყება.

**რატომ** · ტესტები გვაძლევს ცვლილების გაბედვას შიშის გარეშე.

**მაგალითი** · ფული და ჯავშანი — ყველაზე მკაცრად: property-based, ერთდროული მოთხოვნა, დუბლიკატი.

```ts
// ✓ money: a property that must hold for every amount and weight list
fc.assert(
  fc.property(
    fc.integer(),
    fc.array(fc.integer({ min: 1 })),
    (total, weights) => allocate(tetri(total), weights).reduce((a, b) => a + b, 0) === total,
  ),
);
// ✓ booking: 50 parallel attempts → exactly one success (Emulator Suite)

// ✗ asserting that a mock was called
expect(repo.save).toHaveBeenCalled();
```

## 22 · ჩავარდნისთვის დაპროექტება

ყოველი გარე ზარი შეიძლება ნელი, წარუმატებელი ან გამეორებული იყოს: timeout, შეზღუდული retry backoff-ით (მხოლოდ იდემპოტენტურზე), fail fast, გრაციოზული დეგრადაცია.

**რატომ** · 10 000 ერთდროულ მომხმარებელზე ნაწილობრივი ჩავარდნა ნორმაა.

**მაგალითი** · Maps ჩავარდა → მარშრუტის შექმნა „სცადეთ ხელახლა“, დანარჩენი მუშაობს. BOG-ზე circuit breaker.

```ts
// ✓ an explicit timeout; failure becomes a retryable AppError, the rest of the app keeps working
await client.createTask(request, { timeout: timeoutMs });
// … catch → throw new AppError("dependency_unavailable", "Job queue is unavailable");

// ✗ no timeout and unbounded blind retries of a payment call
while (true) {
  try {
    return await bog.charge(request);
  } catch {}
}
```

## 23 · დაკვირვებადობა ნაგულისხმევად

structured ლოგი traceId-ით. მეტრიკა და alert სიმპტომზე: ჩავარდნილი job, გადახდის შეცდომა, 5xx, ლატენტურობა.

**რატომ** · რასაც ვერ ვხედავთ, ვერ გავასწორებთ; ჩავარდნა ჩუმი არ უნდა იყოს.

**მაგალითი** · მომხმარებლის შეცდომის traceId → ერთი ძიებით ჩანს მთელი გზა.

```ts
// ✓ structured log (traceId is added by the request logger); a failed job raises an alert field
logger.error({ jobId, jobType, attempts, alert: "job_failed" }, "job failed permanently");

// ✗ unstructured, untraceable, silent
console.log("something went wrong");
try {
  await send();
} catch {}
```

## 24 · მასშტაბი — stateless, გაზომილი

API ინსტანცია სესიას არ ინახავს. ჰორიზონტალური გაფართოება ნაგულისხმევია. ოპტიმიზაცია მხოლოდ გაზომვის შემდეგ. load-ტესტი გაშვებამდე.

**რატომ** · სიმძლავრე ინსტანციების დამატებით იზრდება; ხარჯი და სიჩქარე გამოცნობით არ იმართება.

**მაგალითი** · k6: დათვალიერება, დაჯავშნა, გადახდის callback, სწრაფი ტესტი. წაკითხვა/ჩაწერის, SMS-ისა და Maps-ის ბიუჯეტზე alert.

```ts
// ✓ state lives in Firestore (or a job), any instance can serve any request
const attempt = await attempts.get(tx, attemptId);

// ✗ per-instance memory that breaks with a second instance
const sessions = new Map<string, Session>();
```

## 25 · პატარა, ავტომატიზებული, შექცევადი ცვლილებები

პატარა PR. CI გეიტები: ტიპები, lint, ტესტები, OpenAPI diff. რისკიანი ცვლილება — kill switch-ით. ყოველი გამოშვება უკან დაბრუნებადია.

**რატომ** · პატარა და შექცევადი ცვლილება დაბალი რისკისაა.

**მაგალითი** · ბექენდი — Cloud Run revision-ზე დაბრუნება. მობილური — kill switch + მინიმალური ვერსია.

```ts
// ✓ a risky path behind a config kill switch (config document, no deploy needed to turn it off)
if (config.killSwitches.checkout)
  throw new AppError("payment_unavailable", "Checkout is switched off");

// ✗ a big-bang change with no way back
//   one PR: schema rename + new endpoint + client rewrite, deployed to everyone at once
```

## 26 · გადაწყვეტილება ჩაწერილია

არაცხადი არჩევანი და პრინციპიდან გადახვევა ADR-ში იწერება: რა და რატომ. დოკუმენტაცია კოდთან ერთად ახლდება.

**რატომ** · ახალ ადამიანსა და Claude Code-ს შედეგის გარდა მიზეზიც სჭირდება.

**მაგალითი** · მაგალითად: „ტელეფონი + პაროლი“ Firebase Auth-ზე — ADR.

```text
✓ docs/adr/0003-phone-password-sign-in.md   (context · decision · why · what we do not choose · when to revisit)
✗ a silent choice buried in a code comment: // custom token because it was easier
```

## 27 · უწყვეტი მცირე რეფაქტორინგი

კოდს უფრო სუფთას ვტოვებთ, ვიდრე ვიპოვეთ. რეფაქტორინგი პატარა ნაბიჯებით, ტესტების ქვეშ. დიდი გადაწერა არა.

**რატომ** · ტექნიკური ვალი გროვდება — პატარა გადახდები იაფია.

**მაგალითი** · ფუნქციის შეხებისას სახელებს და სტრუქტურას ვასუფთავებთ იმავე PR-ში, თუ ტესტი ფარავს.

```ts
// ✓ touching the function: rename `proc` → `cancelLesson`, extract one helper — same PR, tests green
// ✗ "we'll rewrite the whole module later" — a large rewrite with no tests around it
```
