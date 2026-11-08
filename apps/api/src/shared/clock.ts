/** Time is injected, never read from `Date` inside domain code (principle 14). Instants are UTC; business days are Asia/Tbilisi. */
export interface Clock {
  now(): Date;
}

export const systemClock: Clock = { now: () => new Date() };

export interface FixedClock extends Clock {
  advanceMs(ms: number): void;
}

/** Test clock: deterministic, advanced by hand (hold expiry, cancellation windows, timers). */
export function fixedClock(isoUtc: string): FixedClock {
  let current = new Date(isoUtc).getTime();
  return {
    now: () => new Date(current),
    advanceMs(ms) {
      current += ms;
    },
  };
}
