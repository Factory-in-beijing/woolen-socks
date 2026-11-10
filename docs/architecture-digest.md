# DriveNet 2027 — Architecture digest (v6)

Source: "DriveNet 2027 · Architecture and Working Rules" v6 (32 pp.), plus the "Visual Guide" (14 pp., section 12). The PDFs are written in Georgian; this file is their complete working version in English.
CLAUDE.md = rules; this file = facts, modules, screens, steps, open questions.
**On conflict the PDFs win.** What is written neither here nor in the PDFs is "open" — we do not invent it.

## 1. The big picture

- **One backend** (Cloud Run, one service, modular monolith, stateless, autoscale) serves every client: web (student + partner), Super Admin, mobile (later). Clients change; the backend stays one.
- Transport: `HTTPS /v1 · OpenAPI · Firebase JWT · Idempotency-Key`. The server decides price, permission, payment outcome and cancellation terms; the client **only displays and sends requests**.
- Below it: Firestore (only via the API, Rules = deny-all, Admin SDK) · Cloud Storage + CDN (signed URL) · Firebase (Auth + Phone, FCM, Crashlytics) · Cloud Tasks + Scheduler (deadlines, retry, Asia/Tbilisi) · Secret Manager / Logging / Monitoring / Cloud Build / Artifact Registry.
- Third parties sit behind adapters: BOG iPay (payments), BOnline (transfers), Google Maps, SMS/email, FCM.
- Shared foundation — one monorepo (TypeScript strict): `api-client` (from OpenAPI + TanStack Query), `schemas` (zod), `i18n + tokens` (text, Noto Sans Georgian, one formatter Asia/Tbilisi, tetri → lari), `ui`.
- Design patterns (numbers on the diagram): 1 Contract-first · 2 Modular monolith · 3 Ports & Adapters · 4 Idempotency · 5 Defined ID · 6 Job (transactional queue) · 7 State machine · 8 Append-only ledger · 9 Definition ≠ engine · 10 CDN + signed URL.

## 2. Surfaces

| Surface       | Stack                                        | Notes                                                                                                  |
| ------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Web · student | Next.js App Router · Firebase App Hosting    | Flow A; landing page (PUB)                                                                             |
| Web · partner | same                                         | Flows B, C, D                                                                                          |
| Super Admin   | Next.js · **MFA** · noindex · hidden address | DriveNet team only; backend M8 + the same API + the same `can()`; there is no separate "admin backend" |
| Mobile        | React Native (student app + partner app)     | **Later phase**; same API, same packages                                                               |

Code layers (web = mobile): `app/` (route, thin) → `features/<name>/{components,hooks,api,model}` (one use case = one hook) → `data` (api-client + Query) → `packages/` (ui, tokens, i18n, schemas).
Mobile: SDKs only in `platform/` (Firebase Auth, FCM, deep link, browser, upload); offline = read-only; kill switch + minimum version from config; old versions stay in the store → the API changes only by addition; payment goes to BOG via deep link, after returning the server tells the status.

## 3. One contract for all three clients (API standards)

| Topic       | Rule                                                                                                                                         |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Auth        | Firebase ID token → `Authorization: Bearer`; the service verifies the JWT itself (no API Gateway — it only supports OpenAPI 2.0)             |
| Space       | `X-Workspace-Id` (school/personal); the server verifies membership; workspaceId comes from the principal/repository, **never from the body** |
| Writes      | `Idempotency-Key` on every POST/PUT; same key = same response                                                                                |
| Errors      | problem+json: `code · traceId · retryable`; text comes from the client catalog                                                               |
| Lists       | `cursor + limit` (**offset is forbidden**)                                                                                                   |
| Time/money  | instant — UTC ISO-8601; business date — Asia/Tbilisi as a separate field; amount = integer tetri + currency                                  |
| Version     | `/v1`, **additions only**; minimum app version — in config                                                                                   |
| Permissions | `GET /v1/me/capabilities` — for display only, enforcement is on the server                                                                   |
| Files       | signed link; files do not pass through the API                                                                                               |

Error codes → status: 400 validation_failed · 401 unauthenticated (uniform) · 403 forbidden · 404 not_found · 409 slot_taken / hold_expired / invalid_transition · 412 version_mismatch · 429 rate_limited · 503 dependency_unavailable / payment_unavailable (**retryable**). Expected failure = a value; an exception = a bug only. (`internal_error` 500 and `idempotency_conflict` 409 are our additions, see ADR-0001/0002.)

## 4. Firestore — NoSQL rules (for every feature)

There is no join / unique constraint / ad-hoc query → we design **from the read and concurrency scenario**. A plan always states: which queries we need · which document owns the data · which index is needed · where two requests may write at the same time · how the schema changes if the definition changes.

- **Model from the query**: one screen = one read (one document or a small group).
- **Document boundary**: what changes and is read together lives in one document; what grows (history, journal, records) goes into separate documents; document < 1 MiB.
- **IDs**: "once"/"unique" → defined ID + **create-only** (slot = person+date+cell; payout = lessonId; space = applicationId). Otherwise auto-ID.
- **Concurrency**: transaction — reads first, then writes, small, never an external call inside; on update, version/precondition → 412.
- **Hot spots**: frequent writes to one document (counter, "latest state") — spread or batch; writes to a monotonic indexed field ≈ up to 500/s.
- **Indexes and lists**: composite index lives in code (`firestore.indexes.json`) + a test; a new filter = a new index; lists: limit + cursor (startAfter).
- **Denormalisation for reads**: the source is separate and true; the listing document is refreshed by a job and has a rebuild.
- **Totals**: total/count — Firestore aggregation (count/sum) or a job rollup; reading many documents for a total is not done.
- **Schema evolution**: `schemaVersion`; a new field is optional + default; migration: expand → migrate → contract (idempotent script, dry-run).
- **Lifecycle**: temporary data (hold, code, deliveries) — TTL; history (ledger, audit) is never deleted/changed; backups (PITR) on.
- **Time**: Timestamp in UTC; the business date (day) is a separate field in Asia/Tbilisi.
- **Security/tests**: Rules deny-all; no PII in logs; tests on the Emulator Suite (repository, transaction, rules, indexes) without mocks; load — k6.

## 5. Backend modules (M1–M8)

Structure is identical everywhere: `http/` (controller, validation) · `application/` (use case = one small transaction) · `domain/` (pure TS, rules) · `infrastructure/` (repository → Firestore) · `definition.ts` (declarative definition) · `index.ts` (the only public interface). Other modules — only via index.ts.

**Background jobs**: job = a Firestore record in the same transaction that writes the business change → Cloud Tasks (deadline, retry) or Cloud Scheduler (periodic, zone Asia/Tbilisi) → `/internal/jobs/*` idempotent handler; failure → failed + alert, never silent.
**Definition vs engine**: deadlines, limits, steps, package composition, texts — `modules/<name>/definition.ts` or a config document (schema'd, versioned, effective-dated); **a record stores the version/snapshot used** (a new definition does not touch old records).
**External systems**: an adapter per external system: timeout; retry only on idempotent calls; circuit breaker on BOG; in tests a fake adapter (timeout, duplicate, reordering).

### M1 · Identity and permissions (A1·A7·B1·B4·B5·C7·D1 · STU-01–04,29,33,35 · PAR-01,04,06,17)

- Permission = one `can(principal, action, resource)`; role → permission-set as data.
- Sign-in: Firebase Auth has **no built-in phone + password** → choose by ADR: custom token or synthetic email (affects B1; password recovery is security-critical). **ADR needed first.**
- Page access = team permission + package; `/me/capabilities` is for navigation only.
- SMS code (6 digits PAR-04, PAR-06, STU-03): stored as hash + expiry + attempts (TTL); when the limit is exceeded sending is locked (reason: SMS cost and code guessing).
- Failure cases: one person in several spaces (D1 switch) · instructor left the school · guest (read-only) · code twice · package changed.
- Tests: can() matrix (role × action × resource) · cross-tenant access on every resource · code brute force and expiry · membership end.
- Definition-dependent: roles/permission sets (#12) → permission-set; code length/expiry/channel (#13) → config; package composition → entitlement table; guest rules (#1) → config.
- Open: #1 #2 #11 #12 #13.

### M2 · Partners: registration, fleet, team (B2·B3·C2·C3·C8·D6 · PAR-02–05,07,10,14,15,25)

- An application = state machine + server-stored **draft**; a step (2/3/4) = a schema; going back from another device must continue.
- A document is a separate record with a status; the application's status is computed from them; replacing a rejected one does not touch the rest.
- Files — signed URL straight to Storage; the database holds only the address and metadata.
- Approval — workspace + membership + package in **one Firestore transaction**, ID = applicationId (no Saga needed).
- Member activation = an invite record: `pending → claimed | rejected` (supports both "is this your profile?" B4 and "no" #11).
- Car and package change — pending, not effective until confirmed; **the contract from registration data — an immutable snapshot + hash**.
- Failure cases: upload broke midway · duplicate identification code · two admins on the same application · an instructor with several roles/schools (D1).
- Tests: transition table · double approval = one space · replacing a rejected document · invite: claimed/rejected.
- Open: #10 #11 #14.

### M3 · Marketplace: search, schedule, booking (A3·A4·C1·C5·D1·D4 · STU-15–22,24,25,27,28 · PAR-09,19,20)

- An instructor card = one "listing" document with filter fields (the source is separate; a job refreshes the listing and it has a rebuild).
- **Bookable** (who is visible and who can be booked) is one function — in the list and in booking.
- A time slot has one owner: slot defined ID (person+date+cell) + create-only transaction; one or several times — in one transaction; booking, break and personal lesson are locked the same way. Firestore has no exclusion constraint.
- Holding before payment — a `hold` status; expiry runs through a job and is also checked on read. Cancellation/transfer — the rule is one function + preview; the record stores the policy version.
- An index for every filter combination (college, city/district, type).
- Failure cases: two students at the same time · payment arrived after the hold expired (refund via M4) · cancel and transfer at once · instructor switched off while having bookings · day boundary (00:00 Asia/Tbilisi).
- Tests: 50 parallel attempts = 1 success · hold expiry (fake Clock) · cancellation threshold ±1 s · listing rebuild = same result.
- Definition: cancellation/transfer deadline (STU-24) → config + version on the record; hold expiry → config; lesson duration/cell size → partner parameter; rating (#5) → a new listing field (additive).
- Open: #1 #3 #4 #5 #15.

### M4 · Money: payment, payout, finances (A3·A4·A5·C1·C6·D5·D6 · STU-10,23,24,26 · PAR-16,22,26)

- **Ledger = append-only, double entry, integer tetri, sum = 0; a mistake → a reversing entry**.
- **BOG callback**: signature (Callback-Signature SHA256withRSA) on the **raw body**; fast 200 → create-only record (event id) → verify the status via receipt (a callback can repeat, get lost or be forged; the truth is the bank's status).
- Bank timeout/unknown result → **we read the status; the money operation is not resent**.
- On lesson completion: split the share (commission + partner share) and a payout item (ID = lessonId); nightly job (Scheduler, Asia/Tbilisi) → BOnline. A lesson is paid out once.
- "Instructor did not show up" (STU-26): the payout item is held and a support case is created — in one transaction.
- Payable abstraction (lesson, course); finance totals = aggregation + rollup; kill switch (config) on checkout and on payouts; nightly reconciliation with BOG.
- BOG cards: the card lives at the bank (not stored with us), Apple Pay, Google Pay, pre-authorization, refund. BOnline: individual or batch payment document; **limit 5 req/s, 10 000/day**.
- Failure cases: callback twice or reordered · callback never came · refund on cancellation · BOnline limit · partner bank requisites — **not in the document (open)**.
- Tests: allocation sum = 0 for any amount (property-based) · 100 duplicate callbacks = 1 effect · job twice = no duplicate · fake adapter: timeout, duplicate, reordering.
- Definition: commission (not in the document) → config, versioned + snapshot on the record; payout time/frequency → config; refund rules (STU-24) → config (with M3); simulator tariff → config.
- Open: #3 #4.

### M5 · Theory (A5 · STU-10–14, 30)

- Course access = enrollment; refund → access closes; video link is short-lived and checked on every link. **Paid content must not stay open behind a URL.**
- Video — Storage + CDN signed URL; does not pass through the API; transcoding on upload. 10 000 viewers must not load the API.
- Quick test (30 tickets · 5 mistakes · 30 min): timer on the server; an attempt = one record (seed, answers, deadline); **rules live in config**; we do not trust the client clock.
- Answer order is shuffled by seed; the seed is stored on the attempt (repeatability, testability).
- Progress — monotonic (never decreases), rare writes (switch/leave/periodic) — frequent writes create a hot document.
- Tickets and marks — a versioned static bundle on the CDN.
- Failure cases: video link expired · test broke midway/two devices · course refunded · new ticket version during an attempt.
- Tests: selection by seed is deterministic · late/duplicate answer · refund → access closes · timer with fake Clock.
- Definition: test rules (#8: stop at the 6th mistake or not) → config; free/paid content (#9) → access rule — definition/config; course structure → content data.
- Open: #8 #9.

### M6 · Routes and simulator (A6·C1·C4·C6·D2·D3·D6 · STU-31,32 · PAR-11,18,21,27,28)

- A route = **Value Object** with validation (start = end); a published route is immutable, a change = a new version.
- Road rules/restrictions (PAR-11) are computed at creation with a geo library and stored in the description; auto/manual (#19) — an override field. Maps behind an interface; limit and budget alert.
- A simulation = state machine + `CanStart` condition (PAR-19); a session counts once (ID = sessionId). The invoice depends on that count.
- Monthly invoice — a job; ID = workspace_period; the month boundary is in Asia/Tbilisi.
- Simulation rules are behind a port (PAR-28 is a separate document and we do not have it yet) — we cannot design the simulator's content.
- Failure cases: session broke · finished twice · invoice on the month boundary · new rule version on already created routes.
- Tests: trajectory validation (closed, limits) · finishing a session twice = 1 record · invoice job twice = 1 invoice.
- Definition: simulation tariff and invoice form → config; rules dataset → versioned data; result screen and SMS to the student (#17) → mapping (M7) + config.
- Open: #17 #19.

### M7 · Notifications (A1·A2·A7·D1·D2 · STU-05,33 · PAR-19)

- Event → notification: mapping table + template (data); **a new notification = a new record** (the inbox screen and types are not described yet — #6).
- A channel (push, SMS, email, inbox) is one interface; channels are independent.
- Sending — a job after the transaction; deliveries key: event + recipient + channel (create-only) → a duplicate is not sent.
- Failure — retry (Cloud Tasks) → failed + alert; the business operation does not stop.
- The user's setting (STU-33) is checked before sending; a switched-off notification is not sent.
- Failure cases: FCM invalid token · provider unavailable · template missing · recipient language.
- Tests: mapping + template · one event twice = 1 delivery · provider fails → retry → failed + alert.
- Definition: texts and channels (#6, #17) → mapping + template (data); SMS/email provider → adapter.
- Open: #6 #17.

### M8 · Administration (Super Admin) (B2·B3·C3·C8·A4 · Super Admin · PAR-02,03,07,15,25 · STU-26)

- The approval queue = a list with status; the admin claims an item in a transaction (two admins cannot process the same one).
- An admin changes another module's data through the same use case the module itself uses (one place for rules).
- **Every action is in the audit** (functional document, chapter 2): the record is in the same transaction — who, what, when, previous/new value.
- The admin's personal account and MFA sign-in; a separate tenant. Super Admin screens are not described yet (#18): we prepare queues, audit, MFA; analytics — aggregation, BigQuery export if needed.
- Failure cases: two admins on the same item · admin action in a version conflict (412) · a support case (STU-26) together with a payout.
- Tests: every admin endpoint writes audit · MFA is mandatory · two-admin concurrency.
- Open: #18.

## 6. Front-end

**Stack**: Next.js App Router (web), React Native (mobile), TypeScript strict. **Data**: only the generated api-client + TanStack Query; no fetch in components. **Forms**: react-hook-form + zod (schemas in `packages/schemas`; server 400s bind to fields). **Text/time/money**: i18n catalog; one formatter (Asia/Tbilisi, tetri → lari). **Files**: signed URL straight to Storage; payment outcome — by server status.

Rules:

- Every screen: `loading | empty | error | ready` — a discriminated union + exhaustive switch (an impossible UI state shows up at compile time).
- `AppError.code` → behaviour (`slot_taken` → alternatives; `hold_expired` → new selection); `retryable` → "try again"; `traceId` — for support.
- Writes: submit lock + Idempotency-Key; the outcome of a payment/external flow — **by server status (polling with backoff), not by redirect**.
- Deadlines/rules/steps come from config/definition (GET /v1/config, i18n); an unknown enum value is handled safely. Business rules (price, permission, refund, payment outcome) — on the server.
- A new component only if no archetype covers it. 16 archetypes cover flows A–D (the simulator PAR-28 is a separate document).
- Tests: mapper/hook/schema unit · component behaviour with MSW (from OpenAPI) · e2e on the critical path · a11y and i18n from day one.
- Build order: 1) shared components first (colours, Noto Sans Georgian font, button, field, card, header, bottom navigation, burger menu, bottom sheet, confirmation dialog) → packages/ui + tokens; 2) flows A → B → C → D; 3) the simulator last.

**Screen anatomy** (every archetype): route (thin, guard) → Screen (composition) → Feature hook (use case) → Query + api-client → View-model (mapper).

**Archetypes**: Form · Dashboard · Profile/Params/Info · Report · Wizard · List + Filter + Card · Detail/BottomSheet · DaySchedule · Confirm · Payment (state machine: idle → holding → redirected → confirming → confirmed | failed) · Status · Test/Ticket · Video + Syllabus · Map · Capability-guarded navigation · Empty/Loading/Error.

### Flows and screens

- **A · Student** (PUB-01 landing; A1 sign-in STU-01–04; A2 home STU-05–09; A3 search/profile STU-15–22; A4 schedule, cancel/transfer, "did not show up" STU-24–28; A5 theory STU-10–14 (video, tickets, quick test 30·5·30 min); A6 routes STU-31/32; A7 account STU-29–35). Guest: read-only; a write → sign-in → back to the same selection. **We never hold card data; the button locks + Idempotency-Key.** Open: #1 #3 #4 #8 #9 #15.
- **B · Partner sign-in and registration** (B1 sign-in phone + password (+995); PAR-01 role choice; B2 independent (wizard, 2 steps); B3 driving school (wizard, 3); B4 activation (wizard, 4: 6-digit SMS → "is this your profile?" → password); "under review" (status + demo); rejected; PAR-05 first steps (checklist of 5); B5 recovery). Open: #10 #11 #12 #13.
- **C · Driving-school admin** (C1 home; C2 instructors; C3 fleet; C4 routes; C5 schedule (package 2 only); C6 finances; C7 team; C8 account/package). Open: #14 #15 #19.
- **D · Instructor** (D1 home + role switcher; D2 lesson + simulator ("call", CanStart); D3 routes; D4 schedule; D5 my account; D6 extras: fleet, finances (package 2), simulator stats). Role switch = change X-Workspace-Id + clear the query cache. Open: #16 #17.

### Function map (functional document v2: STU-01–35 · PAR-01–28 · PUB-01–02)

M1: STU-01–04,29,33,35; PAR-01,04,06,17 · M2: PAR-02,03,05,07,10,14,15,25 · M3: STU-07,15–22,24–28; PAR-08,09,19,20 · M4: STU-23; PAR-16,22,26 · M5: STU-10–14,30 · M6: STU-31,32; PAR-11,18,21,27,28 · M7: STU-05; (OTP use) · M8: approvals, support STU-26/34.
Client-only: STU-06 hero, STU-08 footer, STU-09 navigation, STU-34 info/Support, PAR-12/13/23/24 navigation, PUB-01 header, PUB-02 landing sections (⏳ not there yet).

## 7. Phases, teams, steps

**Phases**: 0 foundation (monorepo, CI/CD, OpenAPI, minimal Terraform; api-client·tokens·i18n·ui) → 1 core (M1; web: sign-in + capabilities) → 2 partner (M2 + M8 approval; portal B, C, D + Super Admin) → 3 marketplace (M3; student site A) → 4 money (M4) → 5 content (M5·M6·M7) → 6 launch (k6, security review, prod) → 7 mobile (RN: student app → partner app → store).

**Teams (a proposal, not a rule of the document)**: 0 platform · 1 backend (1a: M1 M2 M8 | 1b: M3 M5 M6 | 1c: M4 M7; **M4 — double review on money and auth**) · 2 web · 3 Super Admin · 4 mobile. **The only contract between teams is OpenAPI**: backend first adds the endpoint to OpenAPI; clients work on the schema with the generated api-client; BE works on the implementation.

**Backend steps**: B1 OpenAPI + /v1 skeleton, AppError, Clock, logs with traceId · B2 M1 (sign-in, can(), /me/capabilities) · B3 M2 · B4 M3 (double booking impossible) · B5 M4 (BOG iPay, ledger, BOnline; double review) · B6 M5·M6 · B7 M7 (via jobs) · B8 M8 · B9 k6 load test → prod.
**Web**: W1 monorepo + packages + CI gates · W2 api-client from OpenAPI · W3 shared UI + tokens + i18n · W4 sign-in (A1/B1) Firebase Auth → JWT → /me/capabilities · W5 flow A · W6 flows B–D · W7 staging e2e (Playwright) → prod.
**Super Admin**: A1 sign-in + MFA · A2 application approval · A3 support · A4 finances and analytics · A5 audit view (every action is an immutable record).
**Mobile**: M-1 RN project + platform/adapters · M-2 Auth + push · M-3 student app (A) · M-4 partner app (B–D) · M-5 internal testing (App Distribution) · M-6 store.

## 8. Scale

Preliminary target: **50 000 users, 10 000 concurrent at peak** (v6) — see section 12 for the Visual Guide's different figure. Working assumption (**not a fact**): one active user ≈ 1 request per 5–10 s → ~1 000–2 000 requests/s at peak. The load test will refine this.
API: stateless Cloud Run (**min instances ≥ 1**, max instances and concurrency — by load test); Firestore scales itself, our job is to avoid hot spots; files/video via CDN + signed URL; BOG callback is idempotent, Maps/SMS — limit and budget alert; sign-off — k6 with 10 000 virtual users before launch.
**Not built today**: cache (Memorystore), read/write split into two services, Pub/Sub, API Gateway — only when a load test or real load shows the need.

## 9. CI/CD and Ops

One contract, one pipeline, three release paths — each with its own rollback.
**PR gates (Cloud Build, for everyone)**: lint + typecheck (strict, no-any, module boundaries) · unit (domain, property-based) · integration (Emulator Suite, failure checks) · rules + contract (Firestore/Storage rules, OpenAPI diff) · security (dependencies, secrets scan).

- **Backend**: build → gates → deploy staging (new revision) → smoke + e2e (Playwright) → prod (traffic split) → rollback (previous revision).
- **Web (Firebase App Hosting)**: PR build (types, unit) → staging (separate backend) → e2e → prod rollout (git commit → rollout) → instant rollback (previous image; staged rollout is not confirmed).
- **Mobile**: PR build (types, unit, Maestro) → internal build (EAS/Fastlane — ADR) → App Distribution → TestFlight/Play internal → store release → Crashlytics (threshold — ADR); no rollback exists → kill switch + minimum version.
- Environments: dev (Emulator Suite) · staging (separate project) · prod (separate project). Infra: Terraform (minimal: Cloud Run, Tasks, Scheduler, IAM; rules/indexes — Firebase CLI, only after rules tests). Secrets: Secret Manager, never in the client.
- Rules: 1 one contract (OpenAPI diff gate; old app versions are supported, the window — ADR) · 2 schema change expand → deploy → contract, backfill job with dry-run · 3 release/rollback · 4 load and security (k6 before launch and on big changes; protected branches; secrets scanning; double review on money and auth code; the same gates for Claude Code PRs).

## 10. Verified facts (official documentation) and open places

**Verified**: API Gateway supports only OpenAPI 2.0 → Cloud Run directly + JWT in the service · Firebase Auth: phone + password is not built in (ADR) · BOG callback signature on the raw body; payment details/receipt · BOG cards (saved card, Apple Pay, Google Pay, pre-auth, refund) · BOnline: individual/batch document, 5 req/s, 10 000/day · App Hosting instant rollback to a specific commit; staged rollout not available · Firestore: ≤500 writes/s on a monotonic indexed field; index exemption recommended on TTL fields; the single-document limit depends on load.
**Not yet verified (confirm against documentation on first use)**: Cloud Run revisions and traffic split · Cloud Tasks retry · Scheduler time zone · Firestore aggregation (count/sum) · Transcoder → HLS · Identity Platform MFA.

**Not in the document — we put no value on it**: cancellation/transfer deadline (STU-24/25) · DriveNet commission and simulation tariff · partner bank requisites · hold deadline at payment time (STU-18 → STU-23) · languages (STU-33) · support and "did not show up" resolution process · OTP attempts and expiry (the code is 6 digits, PAR-04) · simulator rules (PAR-28, a separate document we do not have yet).
**Our design decisions (not product rules)**: splitting into modules · screen archetypes · API standards, patterns, tests · the Google Cloud / Firebase choice. 💡 and ❓ in the flows are not decisions.

### Open questions (#1–#19) and the protection

| #       | Question                                                 | Concerns | Architectural protection (both variants supported)                                         |
| ------- | -------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| 1       | Can a guest book?                                        | M1·M3    | guest principal read-only; writing is one configurable condition                           |
| 2,10,13 | SMS confirmation at registration; code 4 or 6 digits     | M1·M7    | the OTP service is parameterised (length, channel, TTL); enabling it in any flow is config |
| 3,4,15  | Screen after success; button placement; tapping a lesson | FE·M3    | screen placement is the FE's decision (cancel · reschedule · no-show · details)            |
| 5       | Instructor rating                                        | M3       | a rating is a record attached to a lesson; the screen comes later                          |
| 6       | Notifications screen                                     | M7       | the inbox API is generic; types are added via mapping                                      |
| 7       | Burger menu contents                                     | FE       | the menu comes from config; items similar to footer links (💡)                             |
| 8,9     | Stopping the test at the 6th mistake; free/paid content  | M5       | rules are config; the access rule is one function                                          |
| 11,12   | "This is not mine"; operator role                        | M1·M2    | invite: pending → claimed \| rejected; role = permission set                               |
| 14      | Instructor add form (school)                             | M2       | the same invite + SMS flow as B4                                                           |
| 16      | "+ add role" and the next screen (D1)                    | M1·M2    | via config                                                                                 |
| 17      | Simulation result and SMS to the student                 | M6·M7    | SessionCompleted → notification mapping                                                    |
| 18      | Landing and Super Admin                                  | M8       | we prepare queues, audit, MFA; screens after the description                               |
| 19      | Route rules: automatic or manual                         | M6       | computed with a geo library at creation + an override field                                |

**Rule**: a decision is open → we do not hard-code it: configuration, a mapping, or one rule function; once decided → configuration changes, not the architecture.

## 11. Change checklist (when a definition changes)

Is this engine or definition? · Does the API change only by addition? · Is a data migration needed (expand → migrate → contract)? · Do old records keep the old version (snapshot)? · Do clients handle an unknown value? · Are policy tests updated while invariant tests stay unchanged? The engine (ledger, idempotency, state machine, error model, tenant isolation) changes rarely — ADR + review. The definition lives in config/definition/i18n. **Three levels**: 1 a constant in code (a declarative file) — the default · 2 config — only if the matter is open (❓) or has already changed · 3 a generic rule engine / form builder — **we do not build**.

Where a definition lives: cancellation deadline (STU-24) config (the record stores the policy version) · quick-test rules (#8) config (30·5·30) · package 1/2 (PAR-07) an entitlement table in the definition · notifications (#6, #17) mapping + template · registration steps (#10) step definitions · route rules auto/manual (#19) a config flag.

## 12. Addendum — "Visual Guide" (14 pp.)

Source: "DriveNet 2027 · Engineering principles, architecture and patterns" (visual assistant). The same 27 principles and architecture, visually; below is what exceeds or differs from v6.

- **Three levels**: 🔒 fixed (the 27 principles, module layers, OpenAPI rules, money/permission/concurrency mechanisms, error model) · 🔧 configuration (deadlines, limits, steps, texts, package composition, kill switches; a record stores the version) · 🟢 free (a new endpoint, use case, screen, field, rule inside a module).
- **One request path**: JWT → `can()` (principal, workspace) → validation (zod + Idempotency-Key) → use case (one small transaction; "read → write + job record") → response or AppError (problem+json) → job → idempotent handler → adapter → on failure: failed + alert.
- **Connections between modules**: M1 gives everyone the principal and permissions · M3 ⇄ M4 (booking ← payment; cancellation → refund) · M2 ⇄ M8 (application ← admin approval) · everyone → M7 (event → notification via a job).
- **Pattern catalog** (a new feature is assembled from these; a new pattern needs an ADR): Contract-first · Modular monolith · Ports & Adapters (M1·M4·M6·M7) · Idempotency-Key (every POST/PUT) · create-only ID (M2·M3·M4·M6·M7) · State machine (M2·M3·M5·M6) · Append-only ledger (M4·M6·M8) · Transactional job (M3·M4·M6·M7) · Listing / read model (M3) · Policy function `can()` (M1 + all) · Declarative definition (all) · Value Object / branded types (Money, ID, Route) · Clock port · Signed URL + CDN (M2·M5).
- **Three concurrency techniques**: (1) defined ID + create-only (the first wins; the second → 409 slot_taken); (2) transaction + job record (both writes together or neither); (3) Idempotency-Key (a double tap = one booking/payment).
- **Five Firestore modelling rules**: one screen = one read · what changes together lives in one document, history separate · root collection + an owner field (workspaceId) · a new field is optional + default, `schemaVersion` · migration expand → migrate → contract · totals — aggregation or job rollup.
- **Senior decisions** (changing one needs an ADR): one Cloud Run service (❌ microservices; 🔁 revisit: load test or team growth) · Firestore deny-all, access via the API (🔒) · Cloud Run directly, JWT in the service (❌ API Gateway; 🔁 Load Balancer + Armor if needed) · job = Firestore record + Tasks/Scheduler (❌ external call in a transaction, Pub/Sub; 🔁 Pub/Sub when events grow) · money: append-only ledger + verifying BOG status (🔒) · Contract-first OpenAPI + generated api-client (🔒) · files/video via CDN + signed URL (🔒) · definition declarative/config, versioned (🔒) · web first, mobile later (🔁 at the mobile phase) · monorepo trunk-based, small PRs (🔁 as the team grows) · TypeScript strict + zod at the boundary (🔒) · mobile: kill switch + minimum version (🔒).
- **Never**: free-form UPDATE of a status · an external call inside a transaction · editing or deleting a money record · direct client access to the database · computing price/permission on the client · PII, tokens, codes in logs · a number (deadline, limit) in code without a definition.
- **The path of a new feature (7 steps)**: 1 explain the feature in detail (by hand) → 2 choose a module (a new one — ADR) → 3 endpoint in OpenAPI (addition only) → 4 changeable rule → definition/config → 5 use case: 1 transaction + a job for effects → 6 test → code in small steps → 7 gates green → PR · kill switch for risk. The path of a change: a new field/endpoint — add to OpenAPI (🟢) · a new external system — port + adapter + fake (🟡) · a new module — ADR + layers + index.ts (🟡) · a breaking change — expand → deploy → migrate → contract (🔴 never directly) · deviation from a principle — we stop, ask, write an ADR (🔴).
- **Scale — contradiction with v6**: Visual Guide: **100 000 users ≈ 20 000 at peak ≈ 2 000–4 000 req/s, k6 will refine**; v6: 50 000 users, 10 000 at peak, ≈1 000–2 000 req/s. **Open which is the launch target** → `load/peak.js` is parameterised (`PEAK_VUS`). The architecture withstands both (horizontal growth); only min/max instances and the load-test pass threshold change.
- **Diagram legend**: Cloud CDN + Storage (signed URL) · Load Balancer + Cloud Armor (enable if needed) · read cache (level 1 — if needed; not now) · Firestore: deny-all · PITR · TTL.

### Visual Guide, revised edition (file "KA_3") — differences from the first edition

- **Cloud Run: `min instances ≥ 1`** (fixed rule, shown on the diagram; no cold start for users). Terraform now defaults to 1 and rejects 0.
- **Read path** (shown explicitly): client → CDN / Cloud Run → listing document (Firestore) → response. **Write path**: JWT → `can()` → 1 transaction (+ job record) → response → job → adapter.
- **Load Balancer + Cloud Armor**: rate limit → 429, enabled only when needed. Secret Manager feeds Cloud Run, "secrets never in clients"; Ops security: Secret Manager · MFA · IAM.
- Firestore box: deny-all · PITR · TTL **+ config / definitions** (definitions live in Firestore config documents as well as in code).
- 14 numbered patterns on the diagram — added to the earlier ten: 11 Observability (traceId, alert) · 12 Circuit breaker · timeout · retry (protection from the outside world) · 13 Stateless autoscale (horizontal growth) · 14 Secret Manager · MFA (security by default).
- `/internal/jobs` is called with **OIDC** (implemented: `InternalCallerVerifier`).
