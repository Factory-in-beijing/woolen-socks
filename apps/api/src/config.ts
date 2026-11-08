import { z } from "zod";

const EnvSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65535).default(8080),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info"),
});

export type Env = z.infer<typeof EnvSchema>;

/** Environment is parsed once at the edge; secrets come from Secret Manager, never from the repository (principle 15). */
export const loadEnv = (source: NodeJS.ProcessEnv = process.env): Env => EnvSchema.parse(source);
