# ADR-0001 — Baseline stack and tooling

Status: accepted (initial, Phase 0) · Date: 2026-11-08 · Source: Architecture v6 (pp. 1–26, appendix)

## Context

The document defines the architecture (Cloud Run, Firestore, Next.js, React Native, OpenAPI, Terraform, Cloud Build…) but does not choose concrete libraries. Phase 0 requires choosing them. Rule: simplest solution (principle 17); a new service needs its own ADR.

## Decisions

| Topic             | Choice                                                                                                                                      | Why / alternative                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Package manager   | pnpm workspaces (Node 22)                                                                                                                   | Already in the repo; a separate build orchestrator (Turborepo/Nx) is not needed yet — add it when `pnpm -r` gets slow                           |
| API framework     | **Fastify 5**                                                                                                                               | Fast, built-in pino, simple hooks for traceId and problem+json. Not NestJS: a DI framework adds needless abstraction to a modular monolith (17) |
| API build         | esbuild bundle (workspace packages inlined; `firebase-admin`, `@google-cloud/tasks` external)                                               | tsc output with Bundler resolution would not run as ESM; one file = a simple image                                                              |
| Contract          | OpenAPI 3.1 (`packages/api-client/openapi/v1.yaml`) → `openapi-typescript`                                                                  | Principle 1; types are generated and committed (`generate:check` gate)                                                                          |
| Client            | `openapi-fetch` + `openapi-react-query` (TanStack Query)                                                                                    | Thin, typed, identical on every surface; no separate codegen (orval) burden                                                                     |
| Validation        | zod 4 (`packages/schemas`)                                                                                                                  | At the boundary (principle 19); form validation = server validation from one schema                                                             |
| Tests             | Vitest + fast-check (property-based, e.g. M4 allocation); Playwright (e2e); k6 (load)                                                       | Principle 21 · CI gates                                                                                                                         |
| Data tests        | Firebase Emulator Suite + `@firebase/rules-unit-testing@5`                                                                                  | v6 requires Node ≥24.12; we are on Node 22, so v5 + `firebase@12`. Upgrade when moving to Node 24                                               |
| Architecture gate | dependency-cruiser (`.dependency-cruiser.cjs`)                                                                                              | Module boundaries, layer direction, domain purity, Firestore only in infrastructure, clients never touch the backend                            |
| Style             | ESLint (flat, typescript-eslint strict, no-any) + Prettier                                                                                  | Principle 19                                                                                                                                    |
| Logging           | pino, `severity`, redacted PII/tokens/codes, `traceId`                                                                                      | Principles 15, 23                                                                                                                               |
| Infra             | Terraform (minimal) + Cloud Build                                                                                                           | PDF appendix "CI/CD and Ops"                                                                                                                    |
| CI                | **Cloud Build** (`cloudbuild.yaml`, `cloudbuild.promote.yaml`)                                                                              | Defined that way by the PDF; no GitHub Actions                                                                                                  |
| Language          | **English-only first release**: code, docs, UI. `packages/i18n` has `en` (active) and `ka` (kept in sync by the compiler and a parity test) | Product decision (2026-11-10). Business rules stay Georgian-market: Asia/Tbilisi, GEL, +995                                                     |

## Deviations from / additions to the document

- Error code `internal_error` (500) added: the document's list does not cover a bug, yet every response must be problem+json (principle 13). Addition only.
- `429 rate_limited` → `retryable=false` (the document marks only the 503s as retryable). If the business decides otherwise, it is one table in `packages/schemas/src/errors.ts`.
- `Idempotency-Key` is a `required` parameter in the contract on every POST/PUT (types force callers to pass it); the client does not generate it, so the key does not change on retry.
- English locale `en-GB` for dates (day-first, 24h) and `₾` narrow symbol for money — a presentation default, easy to change in `packages/i18n/src/format.ts`.

## Open (need a new ADR)

1. **Sign-in with phone + password** — Firebase Auth has no built-in support (B1): custom token vs synthetic email. Before M1.
2. Mobile build: EAS/Fastlane, Crashlytics threshold (M-5).
3. Support window for old app versions.
4. Move to Node 24 (test library v6).
