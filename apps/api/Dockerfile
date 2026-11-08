# Build context = repository root:  docker build -f apps/api/Dockerfile -t drivenet-api .
FROM node:22-slim AS build
RUN corepack enable
WORKDIR /repo
COPY .npmrc pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.base.json ./
COPY apps/api/package.json apps/api/
COPY packages/schemas/package.json packages/schemas/
COPY packages/api-client/package.json packages/api-client/
RUN pnpm install --frozen-lockfile --filter "@drivenet/api..."
COPY apps/api apps/api
COPY packages/schemas packages/schemas
COPY packages/api-client packages/api-client
RUN pnpm --filter @drivenet/api build
# Only the packages left external in the bundle are needed at runtime.
RUN pnpm --filter @drivenet/api deploy --prod --legacy /out

FROM node:22-slim
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /out/node_modules ./node_modules
COPY --from=build /repo/apps/api/dist ./dist
USER node
# Cloud Run injects PORT. Stateless: no local state (principle 24).
CMD ["node", "dist/main.js"]
