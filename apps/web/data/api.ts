import { createApiClient, createQueryApi } from "@drivenet/api-client";

/**
 * Data layer (FE base): generated api-client + TanStack Query — never fetch inside components.
 * The token getter is a placeholder until Firebase Auth lands (W4); until then every call is anonymous.
 */
export const apiClient = createApiClient({
  baseUrl: process.env["NEXT_PUBLIC_API_BASE_URL"] ?? "http://localhost:8080",
  getToken: async () => undefined,
});

export const api = createQueryApi(apiClient);
