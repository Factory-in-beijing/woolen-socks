import { en } from "./en.ts";

export * from "./format.ts";
export { en, type Messages } from "./en.ts";
export { ka } from "./ka.ts";

/** The active catalog. The first release is English-only; switching language later means changing this one binding. */
export const messages = en;
