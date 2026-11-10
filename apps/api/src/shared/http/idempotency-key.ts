import type { FastifyRequest } from "fastify";
import { IdempotencyKeySchema } from "@drivenet/schemas";
import { AppError } from "../errors.ts";

/** `Idempotency-Key` is required on every POST/PUT (contract); missing or malformed → 400. */
export function readIdempotencyKey(req: FastifyRequest): string {
  const raw = req.headers["idempotency-key"];
  const parsed = IdempotencyKeySchema.safeParse(Array.isArray(raw) ? raw[0] : raw);
  if (!parsed.success)
    throw new AppError("validation_failed", "Idempotency-Key header is required");
  return parsed.data;
}
