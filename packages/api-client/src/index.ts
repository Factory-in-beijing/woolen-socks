import createClient, { type Middleware } from "openapi-fetch";
import createQueryClient from "openapi-react-query";
import { ProblemSchema, type Problem } from "@drivenet/schemas";
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

export const newTraceId = (): string => crypto.randomUUID();

/**
 * One key per user action (e.g. one form submit). Idempotency-Key is required by the contract on POST/PUT,
 * so callers pass it explicitly; generating it here would change the key on every retry and defeat its purpose.
 */
export const newIdempotencyKey = (): string => crypto.randomUUID();

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

/** Returns the problem+json body if `body` is one, otherwise undefined. Screens map `code` to behaviour. */
export function parseProblem(body: unknown): Problem | undefined {
  const parsed = ProblemSchema.safeParse(body);
  return parsed.success ? parsed.data : undefined;
}
