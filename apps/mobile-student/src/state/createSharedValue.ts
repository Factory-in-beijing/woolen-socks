import { useSyncExternalStore } from "react";

/**
 * A small app-wide value with a hook to read it and a setter. In memory for now; persistence
 * (device storage or the profile on the server) is attached when the backend arrives.
 */
export function createSharedValue<T>(initial: T) {
  let current = initial;
  const listeners = new Set<() => void>();
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };
  return {
    get: () => current,
    set(next: T) {
      if (Object.is(next, current)) return;
      current = next;
      listeners.forEach((notify) => notify());
    },
    use: () => useSyncExternalStore(subscribe, () => current),
  };
}
