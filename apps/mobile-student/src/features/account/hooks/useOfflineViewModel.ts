import { useEffect, useRef, useState } from "react";

/** How long the sample connection check lasts; replaced by a real reachability check. */
const SAMPLE_CHECK_MS = 1400;

/** "You're offline" screen: Try again shows a short check and then the "still offline" notice. */
export function useOfflineViewModel() {
  const [checking, setChecking] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  return {
    retryLabel: checking ? "Checking…" : "Try again",
    checking,
    failed: failed && !checking,
    retry: () => {
      if (checking) return;
      setChecking(true);
      setFailed(false);
      timer.current = setTimeout(() => {
        setChecking(false);
        setFailed(true);
      }, SAMPLE_CHECK_MS);
    },
  };
}
