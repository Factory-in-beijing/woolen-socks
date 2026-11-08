import Fastify, {
  LogController,
  type FastifyBaseLogger,
  type FastifyError,
  type FastifyInstance,
  type FastifyReply,
} from "fastify";
import { registerHealth } from "./http/health.ts";
import type { Clock } from "./shared/clock.ts";
import { AppError, toProblem } from "./shared/errors.ts";
import type { Logger } from "./shared/logger.ts";
import { resolveTraceId } from "./shared/trace.ts";

export interface AppDeps {
  clock: Clock;
  logger: Logger;
}

/** Builds the single Cloud Run service. Modules register their routes here; dependencies arrive through `deps` (principle 20). */
export function buildApp(deps: AppDeps): FastifyInstance {
  const logger: FastifyBaseLogger = deps.logger;
  const app = Fastify({
    loggerInstance: logger,
    genReqId: (req) => resolveTraceId(req.headers["x-trace-id"]),
    logController: new LogController({ requestIdLogLabel: "traceId" }),
  });

  app.addHook("onRequest", async (req, reply) => {
    reply.header("x-trace-id", req.id);
  });

  const sendProblem = (error: unknown, traceId: string, reply: FastifyReply) => {
    const problem = toProblem(error, traceId);
    return reply.status(problem.status).type("application/problem+json").send(problem);
  };

  app.setNotFoundHandler((req, reply) =>
    sendProblem(new AppError("not_found", "Route not found"), req.id, reply),
  );

  app.setErrorHandler((error: unknown, req, reply) => {
    if (error instanceof AppError) {
      req.log.warn({ errorCode: error.code }, "request failed");
      return sendProblem(error, req.id, reply);
    }
    const status = (error as Partial<FastifyError>).statusCode;
    if (status !== undefined && status >= 400 && status < 500) {
      // Framework-level client errors (malformed JSON, oversized or unsupported body).
      return sendProblem(new AppError("validation_failed", "Malformed request"), req.id, reply);
    }
    req.log.error({ err: error }, "unexpected error");
    return sendProblem(error, req.id, reply);
  });

  registerHealth(app);
  return app;
}
