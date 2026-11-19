import type { Sign } from "@/data/signs/sampleSigns";

/** Number of wrong options shown next to the right one. */
const WRONG_OPTIONS = 2;

/**
 * Picks the answer options (as sign indexes) for question `q` about sign `target`: the right sign and two wrong
 * ones, a close neighbour and one from further away. Wrong options never share a name with the right answer or
 * with each other (some signs come in look-alike variants). The right answer's position cycles with `q`.
 */
export function buildQuizOptions(signs: readonly Sign[], target: number, q: number): number[] {
  const taken = new Set<string>([signs[target]?.name ?? ""]);
  const pick = (start: number): number => {
    for (let k = 0; k < signs.length; k++) {
      const j = (((start + k) % signs.length) + signs.length) % signs.length;
      const name = signs[j]?.name;
      if (j !== target && name !== undefined && !taken.has(name)) {
        taken.add(name);
        return j;
      }
    }
    return (target + 1) % signs.length;
  };
  const near = pick(target + 1 < signs.length ? target + 1 : target - 1);
  const far = pick(target + 13 + q);
  const options = [near, far].slice(0, WRONG_OPTIONS);
  options.splice(q % 3, 0, target);
  return options;
}
