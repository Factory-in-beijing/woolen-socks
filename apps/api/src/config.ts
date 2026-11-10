import { z } from "zod";

const EnvSchema = z
  .object({
    PORT: z.coerce.number().int().min(1).max(65535).default(8080),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
      .default("info"),

    // Cloud Tasks / Scheduler wiring — all three or none (none = local dev, /internal/jobs not mounted).
    SERVICE_URL: z.url().optional(),
    TASKS_QUEUE_PATH: z.string().min(1).optional(),
    TASKS_INVOKER_SA: z.email().optional(),

    // Operational parameters (principle 12: not buried in code). Defaults are working assumptions, not product rules;
    // JOB_MAX_ATTEMPTS must match the Cloud Tasks queue retry_config in Terraform.
    JOB_MAX_ATTEMPTS: z.coerce.number().int().min(1).default(8),
    JOB_LEASE_SECONDS: z.coerce.number().int().min(1).default(300),
    JOB_SWEEP_AFTER_SECONDS: z.coerce.number().int().min(1).default(60),
    JOB_SWEEP_LIMIT: z.coerce.number().int().min(1).max(500).default(100),
    IDEMPOTENCY_TTL_HOURS: z.coerce.number().int().min(1).default(24),
  })
  .refine(
    (e) =>
      [e.SERVICE_URL, e.TASKS_QUEUE_PATH, e.TASKS_INVOKER_SA].every(Boolean) ||
      [e.SERVICE_URL, e.TASKS_QUEUE_PATH, e.TASKS_INVOKER_SA].every((v) => v === undefined),
    { message: "SERVICE_URL, TASKS_QUEUE_PATH and TASKS_INVOKER_SA must be set together" },
  );

export type Env = z.infer<typeof EnvSchema>;

/** Environment is parsed once at the edge; secrets come from Secret Manager, never from the repository (principle 15). */
export const loadEnv = (source: NodeJS.ProcessEnv = process.env): Env => EnvSchema.parse(source);
