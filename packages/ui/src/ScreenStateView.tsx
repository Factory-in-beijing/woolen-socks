import type { ReactNode } from "react";
import { messages } from "@drivenet/i18n";
import type { ScreenState } from "@drivenet/api-client";
import { Button } from "./Button.tsx";

export interface ScreenStateViewProps<T> {
  state: ScreenState<T>;
  /** Rendered only in the `ready` state, with data narrowed to `T`. */
  children: (data: T) => ReactNode;
  /** Shown when the screen is empty; defaults to the generic catalog text. */
  empty?: ReactNode;
  onRetry?: () => void;
}

/**
 * The one place that turns a ScreenState into UI. The switch is exhaustive, so a new state cannot be forgotten.
 * Text comes from the catalog by error `code`; the traceId is shown so support can find the whole request path.
 */
export function ScreenStateView<T>({ state, children, empty, onRetry }: ScreenStateViewProps<T>) {
  switch (state.status) {
    case "loading":
      return (
        <p role="status" aria-busy="true" className="dn-state">
          {messages.screen.loading}
        </p>
      );
    case "empty":
      return <div className="dn-state">{empty ?? <p>{messages.screen.empty}</p>}</div>;
    case "error": {
      const { code, traceId, retryable } = state.error.problem;
      return (
        <div role="alert" className="dn-state dn-state--error">
          <p>{messages.errors[code]}</p>
          <p className="dn-state__trace">
            {messages.screen.errorCode}: {traceId}
          </p>
          {retryable && onRetry ? (
            <Button variant="secondary" onClick={onRetry}>
              {messages.screen.retry}
            </Button>
          ) : null}
        </div>
      );
    }
    case "ready":
      return <>{children(state.data)}</>;
  }
}
