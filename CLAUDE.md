# DriveNet — Working Rules (Claude Code)

Sources: "DriveNet 2027 · Architecture and Working Rules" v6, plus the "Visual Guide". This file is the compressed version; on any conflict the source documents win. Full working digest: `docs/architecture-digest.md`.

## Language
- **The first release of the website and apps is English-only.** Everything technical is English: code, comments, identifiers, tests, commit messages, PR text, docs, ADRs, logs, error messages and all UI text.
- UI text lives in `packages/i18n` (`en` is the active catalog; `ka` is kept key-for-key in sync, guarded by a test, for a later release). Never inline UI text in components.
- Georgia-specific business rules do not change with the UI language: business day/time is Asia/Tbilisi, currency is GEL (integer tetri), phone numbers are +995. Georgian proper names (people, places) are valid data.
- The source PDFs are written in Georgian; read them as they are, write everything new in English.

## Priority
- The definition (function, requirements, cases) decides **what** we build; the base decides **how**.
- Definition contradicts a recommendation → follow the definition, record what and why in the report.
- Contradicts one of the 27 principles → stop and ask.
- Anything unknown is "open" → return a question. Never invent.

## Work cycle
1. Plan first (no code): invariant, failure cases, queries/indexes, owning module, assumptions, open questions.
2. Tests → code in small steps → gates (tests, lint, tsc, architecture, rules, api diff).
3. Final report: what changed · assumptions · what was not done · what could not be verified · deviations from the recommendation and why.

## Architectural principles (1–15) — never violated
1. Contract-first: OpenAPI is the single source; types and api-client are generated; the API changes only by addition.
2. The server decides price, permission, payment outcome, cancellation terms; the client only displays.
3. Modular monolith (Cloud Run, one service); a module owns its collections, its public interface is index.ts; domain has no SDKs.
4. Firestore only through the API; Security Rules = deny-all; Admin SDK.
5. Read scenario first, then the document; limit + cursor (no offset); no hot documents/shared counters.
6. Idempotent writes: Idempotency-Key or a defined/create-only ID.
7. One use case = one small transaction; reads first, then writes; never an external call inside a transaction.
8. Side effects are jobs (Firestore record + Cloud Tasks/Scheduler), with retry, and failure → alert.
9. Status = state machine, only through a transition table.
10. Money: integer tetri, double-entry append-only records, sum = 0; corrections by reversing entries.
11. The outside world (BOG iPay, BOnline, Maps, SMS/email) sits behind adapters; unknown outcome → read the status, never resend money.
12. Definition ≠ engine: deadlines, limits, steps, texts live in a definition file or config; a record stores the rule version.
13. One error model: AppError → problem+json (code, traceId, retryable).
14. Time: instants in UTC; business day and jobs in Asia/Tbilisi (UTC+4, no DST); Clock is injected.
15. Security: Secret Manager; no PII/tokens/codes in logs; admin MFA; files via signed URL; least privilege.

## General principles (16–27) — never violated
16. Clean code; 17. simplest solution (abstract on the third use, a new service needs an ADR);
18. high cohesion, loose coupling (domain ← application ← infrastructure);
19. TypeScript strict, no any, branded types, discriminated unions, zod at the boundary;
20. pure core, effects at the edge; 21. tests by risk; 22. design for failure (timeouts, retry with backoff);
23. observability (structured logs with traceId); 24. stateless, measured scale;
25. small, reversible changes, CI gates; 26. decisions are recorded in ADRs; 27. continuous small refactoring.

## Repo structure
- `apps/web` — Next.js (App Router): student site / landing; `data/` (api-client + Query), `features/<name>`, `app/` (thin routes), `e2e/` (Playwright).
- `apps/api` — Cloud Run API (Fastify): `src/app.ts`, `src/platform.ts` (composition root), `src/shared/` (kernel: errors, clock, logger, `domain/` ids · money · ledger · state-machine · cursor · versioned-config · tx, `auth/` principal · can() · workspace, `idempotency/`, `jobs/`, `infrastructure/` Firestore/Tasks/OIDC/Firebase adapters), `src/modules/<m>/{http,application,domain,infrastructure,definition.ts,index.ts}` (M1–M8; layers are added together with use cases).
- `packages/schemas` — zod: error codes/statuses, money, time, pagination. `packages/api-client` — OpenAPI (`openapi/v1.yaml`) + generated types + typed client/Query helpers. `packages/i18n` — text catalogs and the single formatter. `packages/ui` — design tokens and base components.
- `docs/architecture-digest.md` — full working digest of the PDFs (modules, screens, steps, open questions #1–#19). **Before a new task, read the relevant module/flow.** `docs/playbook-new-feature.md` — recipe for building a feature on the kernel; `docs/adr/` — decisions (ADR-0001 stack, ADR-0002 kernel); `docs/setup-firebase.md` — environment bootstrap.
- `firebase.json`, `firestore.rules`/`storage.rules` (deny-all), `firestore.indexes.json`; `infra/terraform`; `load/` (k6); `cloudbuild*.yaml`.
- Future: `apps/partner`, `apps/admin`, mobile (phase 7).

## Commands
- `pnpm install` · `pnpm dev` (web) · `pnpm dev:api` · `pnpm emulators` · `pnpm build` · `pnpm typecheck` · `pnpm test`
- Gates: `pnpm format:check` · `pnpm lint` · `pnpm architecture` · `pnpm api:check` (generate + additive-only diff, `API_BASE_REF=origin/main`) · `pnpm test:integration` (Emulator Suite, needs Java) · `pnpm test:e2e` · `pnpm test:load` (k6). All fast gates together: `pnpm gates`.
- API change: first `packages/api-client/openapi/v1.yaml`, then `pnpm api:generate`, then code.
- e2e in this cloud environment: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/pw-browsers/chromium pnpm test:e2e` (do not run `playwright install`).
