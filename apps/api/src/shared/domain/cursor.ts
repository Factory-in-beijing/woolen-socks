import type { ZodType } from "zod";
import { AppError } from "../errors.ts";

/** Cursors are opaque to clients: base64url JSON of whatever the query needs for `startAfter`. */
export const encodeCursor = (value: unknown): string =>
  Buffer.from(JSON.stringify(value), "utf8").toString("base64url");

export function decodeCursor<T>(schema: ZodType<T>, token: string): T {
  try {
    return schema.parse(JSON.parse(Buffer.from(token, "base64url").toString("utf8")));
  } catch {
    throw new AppError("validation_failed", "Invalid cursor");
  }
}
