import { AppError } from "../errors.ts";

type AnyTable = Readonly<Record<string, Readonly<Record<string, string>>>>;
type EventsOf<T extends AnyTable> = { [K in keyof T]: keyof T[K] & string }[keyof T];

export interface StateMachine<S extends string, E extends string> {
  /** Returns the next state or throws 409 invalid_transition. There is no free-form UPDATE of a status. */
  next(state: S, event: E): S;
  can(state: S, event: E): boolean;
  readonly terminal: readonly S[];
}

/**
 * Status changes only through a transition table (principle 9); impossible states cannot be written.
 * States are the table's keys; every transition target must itself be a state (checked once, at definition time).
 */
export function defineStateMachine<const T extends AnyTable>(
  table: T,
): StateMachine<keyof T & string, EventsOf<T>> {
  type S = keyof T & string;
  const states = Object.keys(table);
  for (const [from, events] of Object.entries(table)) {
    for (const [event, to] of Object.entries(events)) {
      if (!states.includes(to))
        throw new Error(`State machine: "${from}" --${event}--> unknown state "${to}"`);
    }
  }
  const lookup = (state: S, event: string): string | undefined => table[state]?.[event];
  return {
    next(state, event) {
      const target = lookup(state, event);
      if (target === undefined) {
        throw new AppError("invalid_transition", `Cannot apply "${event}" in state "${state}"`);
      }
      return target as S;
    },
    can: (state, event) => lookup(state, event) !== undefined,
    terminal: states.filter((s) => Object.keys(table[s] ?? {}).length === 0) as S[],
  };
}
