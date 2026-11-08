# DriveNet

pnpm monorepo (TypeScript strict). ვები: `apps/web` (Next.js) · ბექენდი: `apps/api` (Cloud Run, Fastify) · საერთო: `packages/{schemas,api-client,i18n,ui}`.

```bash
pnpm install
pnpm dev          # ვები
pnpm dev:api      # API (:8080)
pnpm emulators    # Firebase Emulator Suite (Java საჭიროა)
pnpm gates        # format · lint · typecheck · architecture · tests · api contract
```

წესები და არქიტექტურა: [`CLAUDE.md`](CLAUDE.md) · [`docs/architecture-digest.md`](docs/architecture-digest.md) · [`docs/adr/`](docs/adr).

Vercel-ზე იმპორტისას: **Root Directory = `apps/web`** (Framework: Next.js). pnpm workspace ავტომატურად ამოიცნობა.
