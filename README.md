# DriveNet

pnpm monorepo (TypeScript strict). Web: `apps/web` (Next.js) · backend: `apps/api` (Cloud Run, Fastify) · shared: `packages/{schemas,api-client,i18n,ui}`.

```bash
pnpm install
pnpm dev          # web
pnpm dev:api      # API (:8080)
pnpm emulators    # Firebase Emulator Suite (needs Java)
pnpm gates        # format · lint · typecheck · architecture · tests · api contract
```

Rules and architecture: [`CLAUDE.md`](CLAUDE.md) · [`docs/architecture-digest.md`](docs/architecture-digest.md) · [`docs/adr/`](docs/adr) · [`docs/setup-firebase.md`](docs/setup-firebase.md).

The first release is English-only (code, docs and UI).

When importing into Vercel: **Root Directory = `apps/web`** (Framework: Next.js). The pnpm workspace is detected automatically.
