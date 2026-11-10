import { useCallback, useState } from "react";
import { newIdempotencyKey } from "./keys.ts";

/**
 * The key for the current user action (e.g. one booking submit). Keep it while retrying so a double click or a lost
 * response cannot create a second effect; call `rotate()` after the action succeeded or the user changed their input.
 */
export function useIdempotencyKey(): { key: string; rotate: () => void } {
  const [key, setKey] = useState(newIdempotencyKey);
  const rotate = useCallback(() => setKey(newIdempotencyKey()), []);
  return { key, rotate };
}
