import type {
  BeginResult,
  IdempotencyScope,
  IdempotencyStore,
  StoredOutcome,
} from "./idempotency.ts";
import { scopeId } from "./idempotency.ts";

/** Test double with the same semantics as the Firestore adapter (both run the shared contract suite). */
export class InMemoryIdempotencyStore implements IdempotencyStore {
  private readonly records = new Map<string, { hash: string; outcome?: StoredOutcome }>();

  async begin(scope: IdempotencyScope, requestHash: string): Promise<BeginResult> {
    const id = scopeId(scope);
    const existing = this.records.get(id);
    if (!existing) {
      this.records.set(id, { hash: requestHash });
      return { kind: "started" };
    }
    if (existing.hash !== requestHash) return { kind: "mismatch" };
    return existing.outcome
      ? { kind: "replay", outcome: existing.outcome }
      : { kind: "in_progress" };
  }

  async complete(scope: IdempotencyScope, outcome: StoredOutcome): Promise<void> {
    const record = this.records.get(scopeId(scope));
    if (record) record.outcome = outcome;
  }

  async abandon(scope: IdempotencyScope): Promise<void> {
    this.records.delete(scopeId(scope));
  }
}
