# DriveNet — სამუშაო წესები (Claude Code)

წყარო: „DriveNet 2027 · არქიტექტურა და სამუშაო წესები“ v4. ეს ფაილი მისი შეკუმშული ვერსიაა; კონფლიქტისას მთავარია დოკუმენტი.

## პრიორიტეტი
- განმარტება (ფუნქცია, მოთხოვნები, შემთხვევები) განსაზღვრავს **რას** ვაშენებთ; ბაზა — **როგორ**.
- განმარტება ეწინააღმდეგება რეკომენდაციას → მიჰყევი განმარტებას, ანგარიშში ჩაწერე რა და რატომ.
- ეწინააღმდეგება 27 პრინციპს → შეჩერდი და იკითხე.
- რაც უცნობია → „ღიაა“ და დააბრუნე კითხვა. არ იგონო.

## სამუშაო ციკლი
1. ჯერ გეგმა (კოდი არა): ინვარიანტი, ჩავარდნები, მოთხოვნები/ინდექსები, მფლობელი მოდული, დაშვებები, ღია კითხვები.
2. ტესტები → კოდი პატარა ნაბიჯებით → გეიტები (tests, lint, tsc, architecture, rules, api diff).
3. ბოლოს ანგარიში: რა შეიცვალა · დაშვებები · რა არ გაკეთდა · რა ვერ შევამოწმე · რეკომენდაციიდან გადახვევა და რატომ.

## არქიტექტურული პრინციპები (1–15) — არ ირღვევა
1. Contract-first: OpenAPI ერთადერთი წყარო; ტიპები და api-client გენერირდება; API იცვლება მხოლოდ დამატებით.
2. სერვერი წყვეტს ფასს, უფლებას, გადახდის შედეგს, გაუქმების პირობას; კლიენტი მხოლოდ აჩვენებს.
3. მოდულური მონოლითი (Cloud Run, ერთი სერვისი); მოდული ფლობს თავის collection-ებს, საჯარო ინტერფეისი — index.ts; domain SDK-ის გარეშე.
4. Firestore მხოლოდ API-ით; Security Rules = deny-all; Admin SDK.
5. ჯერ წაკითხვის სცენარი, მერე დოკუმენტი; limit + cursor (offset არა); ცხელი დოკუმენტი/საერთო მრიცხველი არა.
6. იდემპოტენტური ჩაწერა: Idempotency-Key ან განსაზღვრული/create-only ID.
7. ერთი use case = ერთი პატარა ტრანზაქცია; ჯერ წაკითხვა, მერე ჩაწერა; გარე ზარი ტრანზაქციაში არასდროს.
8. გვერდითი ეფექტი — job (Firestore ჩანაწერი + Cloud Tasks/Scheduler), retry, ჩავარდნა → alert.
9. სტატუსი — state machine, მხოლოდ გადასვლების ცხრილით.
10. ფული: integer თეთრი, ორმაგი append-only ჩანაწერი, ჯამი = 0; შესწორება უკუ-ჩანაწერით.
11. გარე სამყარო (BOG iPay, BOnline, Maps, SMS/ელფოსტა) adapter-ის უკან; უცნობი შედეგი → სტატუსს ვკითხულობთ, ფულს თავიდან არ ვაგზავნით.
12. განმარტება ≠ ძრავა: ვადები, ზღვრები, ნაბიჯები, ტექსტები — definition ფაილში ან config-ში; ჩანაწერი ინახავს წესის ვერსიას.
13. ერთი შეცდომის მოდელი: AppError → problem+json (code, traceId, retryable).
14. დრო: instant UTC-ში; ბიზნეს-დღე და job-ები — Asia/Tbilisi (UTC+4, DST-ის გარეშე); Clock შეყვანილია.
15. უსაფრთხოება: Secret Manager; PII/ტოკენი/კოდი ლოგში არა; ადმინს MFA; ფაილი signed URL-ით; მინიმალური უფლებები.

## ზოგადი პრინციპები (16–27) — არ ირღვევა
16. სუფთა კოდი; 17. უმარტივესი გამოსავალი (აბსტრაქცია მესამე გამოყენებაზე, ახალი სერვისი — ADR-ით);
18. მაღალი კავშირიანობა, სუსტი დამოკიდებულება (domain ← application ← infrastructure);
19. TypeScript strict, any-ის გარეშე, branded types, discriminated unions, zod საზღვარზე;
20. სუფთა ბირთვი, ეფექტები კიდეზე; 21. ტესტი რისკის მიხედვით; 22. ჩავარდნისთვის დაპროექტება (timeout, retry backoff-ით);
23. დაკვირვებადობა (structured ლოგი traceId-ით); 24. stateless, გაზომილი მასშტაბი;
25. პატარა, შექცევადი ცვლილებები, CI გეიტები; 26. გადაწყვეტილება ADR-ში; 27. უწყვეტი მცირე რეფაქტორინგი.

## Repo-ს სტრუქტურა
- `apps/web` — Next.js (App Router): სტუდენტის საიტი / ლენდინგი; `data/` (api-client+Query), `features/<name>`, `app/` (თხელი route), `e2e/` (Playwright).
- `apps/api` — Cloud Run API (Fastify): `src/app.ts`, `src/shared/` (AppError, Clock, logger, trace), `src/modules/<m>/{http,application,domain,infrastructure,definition.ts,index.ts}` (M1–M8; ფენები ემატება use case-ებთან ერთად).
- `packages/schemas` — zod: შეცდომის კოდები/სტატუსი, ფული, დრო, პაგინაცია. `packages/api-client` — OpenAPI (`openapi/v1.yaml`) + გენერირებული ტიპები + ტიპიზებული კლიენტი/Query. `packages/i18n` — ქართული კატალოგი და ერთადერთი formatter. `packages/ui` — design tokens.
- `docs/architecture-digest.md` — PDF-ის სრული სამუშაო დაიჯესტი (მოდულები, ეკრანები, ნაბიჯები, ღია #1–#19). **ახალი ამოცანის წინ წაიკითხე შესაბამისი მოდული/ნაკადი.** `docs/adr/` — გადაწყვეტილებები.
- `firebase.json`, `firestore.rules`/`storage.rules` (deny-all), `firestore.indexes.json`; `infra/terraform`; `load/` (k6); `cloudbuild*.yaml`.
- მომავალი: `apps/partner`, `apps/admin`, მობილური (ფაზა 7).

## ბრძანებები
- `pnpm install` · `pnpm dev` (ვები) · `pnpm dev:api` · `pnpm emulators` · `pnpm build` · `pnpm typecheck` · `pnpm test`
- გეიტები: `pnpm format:check` · `pnpm lint` · `pnpm architecture` · `pnpm api:check` (generate + additive-only diff, `API_BASE_REF=origin/main`) · `pnpm test:integration` (Emulator Suite, საჭიროა Java) · `pnpm test:e2e` · `pnpm test:load` (k6). ყველა სწრაფი გეიტი ერთად: `pnpm gates`.
- API ცვლილება: ჯერ `packages/api-client/openapi/v1.yaml`, მერე `pnpm api:generate`, მერე კოდი.
- e2e ამ cloud-გარემოში: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/pw-browsers/chromium pnpm test:e2e` (`playwright install` არ გაუშვა).
