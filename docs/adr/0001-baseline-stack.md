# ADR-0001 — საბაზო სტეკი და ინსტრუმენტები

სტატუსი: მიღებულია (საწყისი, Phase 0) · თარიღი: 2026-11-08 · წყარო: Architecture v6 (გვ. 1–26, დანართი)

## კონტექსტი

დოკუმენტი განსაზღვრავს არქიტექტურას (Cloud Run, Firestore, Next.js, React Native, OpenAPI, Terraform, Cloud Build…), მაგრამ არ ირჩევს კონკრეტულ ბიბლიოთეკებს. Phase 0 მათ არჩევას მოითხოვს. წესი: უმარტივესი გამოსავალი (პრინციპი 17); ახალი სერვისი — ცალკე ADR.

## გადაწყვეტილებები

| თემა               | არჩევანი                                                                                  | რატომ / ალტერნატივა                                                                                                                                     |
| ------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| პაკეტების მენეჯერი | pnpm workspaces (Node 22)                                                                 | უკვე repo-შია; ცალკე build-ორკესტრატორი (Turborepo/Nx) ჯერ არ გვჭირდება — დავამატებთ, როცა `pnpm -r` ნელი გახდება                                       |
| API ფრეიმვორქი     | **Fastify 5**                                                                             | სწრაფი, ჩაშენებული pino, მარტივი hook-ები traceId-სა და problem+json-ისთვის. NestJS არა: DI-ფრეიმვორქი მოდულურ მონოლითს ზედმეტ აბსტრაქციას ამატებს (17) |
| API build          | esbuild bundle (workspace პაკეტები შიგნით; `firebase-admin`, `@google-cloud/tasks` გარეთ) | tsc-ის ემიტი Bundler-resolution-ზე ESM-ში არ გაეშვებოდა; ერთი ფაილი = მარტივი image                                                                     |
| კონტრაქტი          | OpenAPI 3.1 (`packages/api-client/openapi/v1.yaml`) → `openapi-typescript`                | პრინციპი 1; ტიპები გენერირდება და commit-დება (`generate:check` გეიტი)                                                                                  |
| კლიენტი            | `openapi-fetch` + `openapi-react-query` (TanStack Query)                                  | თხელი, ტიპიზებული, იგივე ორივე ზედაპირზე; ცალკე codegen-ის (orval) ტვირთი არა                                                                           |
| ვალიდაცია          | zod 4 (`packages/schemas`)                                                                | საზღვარზე (პრინციპი 19); ფორმა=სერვერის ვალიდაცია ერთ სქემაზე                                                                                           |
| ტესტები            | Vitest + fast-check (property-based, M4 allocation); Playwright (e2e); k6 (load)          | პრინციპი 21 · CI-ის გეიტები                                                                                                                             |
| მონაცემთა ტესტი    | Firebase Emulator Suite + `@firebase/rules-unit-testing@5`                                | v6 მოითხოვს Node ≥24.12; ჩვენ Node 22-ზე ვართ, ამიტომ v5 + `firebase@12`. Node 24-ზე გადასვლისას განახლდეს                                              |
| არქიტექტურის გეიტი | dependency-cruiser (`.dependency-cruiser.cjs`)                                            | მოდულის საზღვრები, ფენების მიმართულება, domain სიწმინდე, Firestore მხოლოდ infrastructure-ში, კლიენტები backend-ს არ ეხებიან                             |
| სტილი              | ESLint (flat, typescript-eslint strict, no-any) + Prettier                                | პრინციპი 19                                                                                                                                             |
| ლოგი               | pino, `severity`, redact PII/ტოკენი/კოდი, `traceId`                                       | პრინციპები 15, 23                                                                                                                                       |
| ინფრა              | Terraform (მინიმალური) + Cloud Build                                                      | PDF დანართი „CI/CD და Ops“                                                                                                                              |
| CI                 | **Cloud Build** (`cloudbuild.yaml`, `cloudbuild.promote.yaml`)                            | PDF ასე განსაზღვრავს; GitHub Actions არ ვამატებთ                                                                                                        |

## დოკუმენტიდან გადახვევა / დამატებები

- `internal_error` (500) შეცდომის კოდი დამატებულია: დოკუმენტის სია არ ფარავს ბაგს, ხოლო ყველა პასუხი problem+json უნდა იყოს (პრინციპი 13). მხოლოდ დამატებაა.
- `429 rate_limited` → `retryable=false` (დოკუმენტი retryable-ად მხოლოდ 503-ებს ასახელებს). თუ ბიზნესი სხვაგვარად გადაწყვეტს — ერთი ცხრილი `packages/schemas/src/errors.ts`.
- Idempotency-Key კონტრაქტში `required` პარამეტრია ყოველ POST/PUT-ზე (ტიპები აიძულებს გამომძახებელს); კლიენტი მას თავად არ აგენერირებს, რომ retry-ზე გასაღები არ შეიცვალოს.

## ღია (ახალი ADR სჭირდება)

1. **შესვლა: ტელეფონი+პაროლი** — Firebase Auth-ს ჩაშენებულად არა აქვს (B1): custom token თუ სინთეტიკური email. M1-მდე.
2. მობილურის build: EAS/Fastlane, Crashlytics ზღვარი (M-5).
3. ძველი აპის ვერსიების მხარდაჭერის ვადა.
4. Node 24-ზე გადასვლა (ტესტის ბიბლიოთეკა v6).
