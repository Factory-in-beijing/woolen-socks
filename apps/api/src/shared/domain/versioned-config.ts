/** A rule/config value with a version and the instant it takes effect. Records store the version they used (principle 12). */
export interface ConfigVersion<T> {
  readonly version: number;
  /** UTC ISO-8601 instant. */
  readonly effectiveFrom: string;
  readonly value: T;
}

/** The version in force at `at`: the latest `effectiveFrom <= at`. Undefined means no rule applies yet — the question is open. */
export function resolveEffective<T>(
  versions: readonly ConfigVersion<T>[],
  at: Date,
): ConfigVersion<T> | undefined {
  const t = at.getTime();
  let best: ConfigVersion<T> | undefined;
  for (const v of versions) {
    const from = Date.parse(v.effectiveFrom);
    if (from <= t && (best === undefined || from > Date.parse(best.effectiveFrom))) best = v;
  }
  return best;
}
