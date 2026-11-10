"use client";

import { QUERY_DEFAULTS, retryDelayMs } from "@drivenet/api-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

/** Query defaults: retry only idempotent reads, back off, never retry writes (a write retry needs the same Idempotency-Key). */
export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: QUERY_DEFAULTS.readRetries,
            retryDelay: retryDelayMs,
            staleTime: QUERY_DEFAULTS.staleMs,
          },
          mutations: { retry: 0 },
        },
      }),
  );
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
