import { z } from "zod";

/** Instant: UTC ISO-8601 with `Z` only (principle 14). Offsets are rejected so clients cannot smuggle local time. */
export const InstantUtcSchema = z.iso.datetime({ offset: false });

/** Business date (YYYY-MM-DD, Asia/Tbilisi) — a separate field from instants, never derived on the client. */
export const BusinessDateSchema = z.iso.date();

/** Money on the wire: integer tetri + currency (principle 10). */
export const MoneyDtoSchema = z.object({
  amountTetri: z.number().int().safe(),
  currency: z.literal("GEL"),
});
export type MoneyDto = z.infer<typeof MoneyDtoSchema>;

export const MAX_PAGE_SIZE = 100;
export const DEFAULT_PAGE_SIZE = 20;

/** Lists are limit + cursor; `offset` is stripped and never honoured (principle 5). */
export const PageQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
  cursor: z.string().min(1).optional(),
});
export type PageQuery = z.infer<typeof PageQuerySchema>;

export const pageOf = <T extends z.ZodType>(item: T) =>
  z.object({ items: z.array(item), nextCursor: z.string().min(1).nullable() });
