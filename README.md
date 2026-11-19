# DriveNet

pnpm monorepo (TypeScript strict). Web: `apps/web` (Next.js) · backend: `apps/api` (Cloud Run, Fastify) · shared: `packages/{schemas,api-client,i18n,ui}`.

```bash
pnpm install
pnpm dev          # web
pnpm dev:api      # API (:8080)
pnpm emulators    # Firebase Emulator Suite (needs Java)
pnpm gates        # format · lint · typecheck · architecture · tests · api contract
```

Documentation index: [`docs/README.md`](docs/README.md). Rules and architecture: [`CLAUDE.md`](CLAUDE.md) · [`docs/principles.md`](docs/principles.md) · [`docs/architecture.md`](docs/architecture.md) · [`docs/patterns.md`](docs/patterns.md) · [`docs/modules/`](docs/modules) · [`docs/open-questions.md`](docs/open-questions.md) · [`docs/adr/`](docs/adr) · [`docs/setup-firebase.md`](docs/setup-firebase.md).

The first release of the website and apps is English. Documentation text is Georgian (copied from the source documents); code, comments, identifiers, file names and UI text are English.

When importing into Vercel: **Root Directory = `apps/web`** (Framework: Next.js). The pnpm workspace is detected automatically.
