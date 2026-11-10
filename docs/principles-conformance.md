# Principle conformance map

Where each principle is enforced today. **Enforced** = a test or CI gate fails when it is broken; **Partial** = convention plus some checks; **Not yet** = no code exists to follow it yet. Sources: Architecture v6 + Visual Guide (both editions). Update this table when a feature lands.

| #     | Principle                                                     | Status              | Where / how                                                                                                                           |
| ----- | ------------------------------------------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Contract-first, additions only                                | Enforced            | `openapi/v1.yaml` → generated types (`generate:check`), additive-only diff (`check:additive`), error-code and bounds parity tests     |
| 2     | Server decides                                                | Partial             | `can()` + tenant invariant (tested); no price/refund logic exists yet                                                                 |
| 3     | Modular monolith, `index.ts` only                             | Enforced            | dependency-cruiser: `module-public-interface-only`, layer rules                                                                       |
| 4     | Firestore only via API, deny-all                              | Enforced            | rules tests (emulator), `firestore-only-in-infrastructure`, `clients-never-import-backend-sdk`                                        |
| 5     | Read scenario first, limit + cursor                           | Partial             | `PageQuerySchema`, opaque cursors; no queries/listings yet; `jobs` index declared (emulator does not verify indexes)                  |
| 6     | Idempotent writes                                             | Enforced            | `withIdempotency` + store contract suite on in-memory and Firestore; create-only jobs                                                 |
| 7     | One use case = one small transaction, no external call inside | Partial             | `UnitOfWork`, `runWithJobs` (dispatch after commit, tested); per-use-case review needed                                               |
| 8     | Side effects are jobs, failure → alert                        | Enforced            | transactional job record, sweeper, runner tests, `job_failed` log metric + alert (Terraform)                                          |
| 9     | State machine only                                            | Enforced            | `defineStateMachine` (invalid table fails at definition; invalid transition → 409); job states use it                                 |
| 10    | Money: integer tetri, ledger sum = 0                          | Enforced            | `Tetri`, `allocate`, `balancedTransaction`, `reversalOf` property tests; no ledger persistence yet                                    |
| 11    | Outside world behind adapters                                 | Partial             | Tasks/OIDC/Firebase adapters behind ports with fakes; BOG/BOnline/Maps/SMS adapters not built                                         |
| 12    | Definition ≠ engine                                           | Partial             | flagged definition files, env config, `resolveEffective`; module `definition.ts` files arrive with modules                            |
| 13    | One error model                                               | Enforced            | `AppError` → problem+json, code/status table, contract + catalog parity tests, client `behaviorFor` (compile-checked)                 |
| 14    | Time: UTC, Tbilisi, injected Clock                            | Partial             | `Clock` injected everywhere in the API (audited); formatter fixed to Asia/Tbilisi; web demo page still reads the server time directly |
| 15    | Security                                                      | Partial             | log redaction (tested), no secrets in repo, OIDC for `/internal`, deny-all rules; admin MFA and Secret Manager use arrive with M8/M4  |
| 16–17 | Clean code, simplest solution                                 | Convention          | review; ADRs record every library choice                                                                                              |
| 18    | domain ← application ← infrastructure                         | Enforced            | dependency-cruiser (module layers and kernel purity, planted-violation tested)                                                        |
| 19    | Strict TS, branded types, zod at boundary                     | Enforced            | `tsc` strict, ESLint no-any, one `Tetri`/`Brand`, discriminated unions with exhaustive switches                                       |
| 20    | Pure core, effects at the edge                                | Enforced            | `shared/domain` purity rule; `platform.ts` is the composition root                                                                    |
| 21    | Tests by risk                                                 | Enforced            | property-based money/ledger, emulator integration (rules, idempotency, jobs, auth), e2e                                               |
| 22    | Design for failure                                            | Partial             | timeout on Cloud Tasks, read-retry backoff, job retry/lease; circuit breaker waits for BOG                                            |
| 23    | Observability                                                 | Partial             | structured logs with traceId, job alert; 5xx/latency alerts need agreed thresholds                                                    |
| 24    | Stateless, measured scale                                     | Partial             | stateless service, `min instances ≥ 1`, k6 harness; launch scale (10 000 vs ≈20 000) still open                                       |
| 25    | Small changes, gates, kill switch                             | Partial             | all gates in CI config; `GET /v1/config` kill switch / minimum version not built (shape is an open product question)                  |
| 26    | Decisions in ADRs                                             | Enforced by process | ADR-0001, ADR-0002                                                                                                                    |
| 27    | Continuous refactoring                                        | Convention          | this audit is an example                                                                                                              |

## Known gaps (not violations — nothing to follow yet)

Kill switch and minimum-version config endpoint · 5xx/latency alert thresholds · circuit breaker (BOG) · admin MFA · Load Balancer + Cloud Armor and read cache (on demand per the guide) · tenant-scoped repositories (arrive with the first module repository).
