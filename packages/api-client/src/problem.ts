import { ProblemSchema, type Problem } from "@drivenet/schemas";

/** Returns the problem+json body if `body` is one, otherwise undefined. Screens map `code` to behaviour. */
export function parseProblem(body: unknown): Problem | undefined {
  const parsed = ProblemSchema.safeParse(body);
  return parsed.success ? parsed.data : undefined;
}
