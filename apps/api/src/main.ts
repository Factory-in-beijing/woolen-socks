import { buildApp } from "./app.ts";
import { loadEnv } from "./config.ts";
import { systemClock } from "./shared/clock.ts";
import { createLogger } from "./shared/logger.ts";

const env = loadEnv();
const logger = createLogger({ level: env.LOG_LEVEL });
const app = buildApp({ clock: systemClock, logger });

// Cloud Run sends SIGTERM before stopping an instance; stop accepting work and let in-flight requests finish.
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.once(signal, () => {
    app.close().then(
      () => process.exit(0),
      (err: unknown) => {
        logger.error({ err }, "shutdown failed");
        process.exit(1);
      },
    );
  });
}

await app.listen({ host: "0.0.0.0", port: env.PORT });
