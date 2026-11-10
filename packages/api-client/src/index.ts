import createClient, { type Middleware } from "openapi-fetch";
import createQueryClient from "openapi-react-query";
import { newTraceId } from "./keys.ts";
import type { paths } from "./generated/schema";

export type { paths, components, operations } from "./generated/schema";

export interface ApiClientOptions {
  baseUrl: string;
  /** Firebase ID token for the signed-in user; undefined when signed out. */
  getToken: () => Promise<string | undefined>;
  /** Current school/personal workspace; the server verifies membership. */
  getWorkspaceId?: () => string | undefined;
  fetch?: (request: Request) => Promise<Response>;
}

export function createApiClient(options: ApiClientOptions) {
  const auth: Middleware = {
    async onRequest({ request }) {
      const token = await options.getToken();
      if (token) request.headers.set("Authorization", `Bearer ${token}`);
      const workspaceId = options.getWorkspaceId?.();
      if (workspaceId) request.headers.set("X-Workspace-Id", workspaceId);
      if (!request.headers.has("X-Trace-Id")) request.headers.set("X-Trace-Id", newTraceId());
      return request;
    },
  };
  const client = createClient<paths>({
    baseUrl: options.baseUrl,
    ...(options.fetch ? { fetch: options.fetch } : {}),
  });
  client.use(auth);
  return client;
}

export type ApiClient = ReturnType<typeof createApiClient>;

/** TanStack Query bindings over the same typed client (data layer: api-client + Query, FE base). */
export const createQueryApi = (client: ApiClient) => createQueryClient(client);

export { newIdempotencyKey, newTraceId } from "./keys.ts";
export { parseProblem } from "./problem.ts";
export { ApiError, behaviorFor, toApiError, type UiBehavior } from "./errors.ts";
export { toScreenState, type QueryLike, type ScreenState } from "./screen-state.ts";
export { applyServerFieldErrors } from "./forms.ts";
export { useIdempotencyKey } from "./idempotency-key.ts";
