import type { Firestore } from "firebase-admin/firestore";
import type { Clock } from "../clock.ts";
import type {
  BeginResult,
  IdempotencyScope,
  IdempotencyStore,
  StoredOutcome,
} from "../idempotency/idempotency.ts";
import { scopeId } from "../idempotency/idempotency.ts";

const COLLECTION = "idempotency";

/**
 * One document per (principal, route, key); id = hash of the scope. Starting is a create-only write inside a transaction,
 * so exactly one of any number of concurrent requests wins (principles 6, 7). `expiresAt` is a TTL-policy field
 * (Terraform); expired records are treated as absent because TTL deletion can lag.
 */
export class FirestoreIdempotencyStore implements IdempotencyStore {
  constructor(
    private readonly db: Firestore,
    private readonly clock: Clock,
    private readonly ttlMs: number,
  ) {}

  private ref(scope: IdempotencyScope) {
    return this.db.collection(COLLECTION).doc(scopeId(scope));
  }

  begin(scope: IdempotencyScope, requestHash: string): Promise<BeginResult> {
    const ref = this.ref(scope);
    return this.db.runTransaction(async (tx): Promise<BeginResult> => {
      const snap = await tx.get(ref);
      const now = this.clock.now();
      const fresh = {
        principalId: scope.principalId, // owner field (root collection + owner)
        state: "in_progress",
        requestHash,
        createdAt: now,
        expiresAt: new Date(now.getTime() + this.ttlMs),
      };
      if (!snap.exists) {
        tx.create(ref, fresh);
        return { kind: "started" };
      }
      const data = snap.data() as {
        state: string;
        requestHash: string;
        expiresAt: { toDate(): Date };
        outcomeJson?: string;
      };
      if (data.expiresAt.toDate().getTime() <= now.getTime()) {
        tx.set(ref, fresh);
        return { kind: "started" };
      }
      if (data.requestHash !== requestHash) return { kind: "mismatch" };
      if (data.state === "completed" && data.outcomeJson !== undefined) {
        return { kind: "replay", outcome: JSON.parse(data.outcomeJson) as StoredOutcome };
      }
      return { kind: "in_progress" };
    });
  }

  async complete(scope: IdempotencyScope, outcome: StoredOutcome): Promise<void> {
    await this.ref(scope).update({
      state: "completed",
      outcomeJson: JSON.stringify(outcome),
      completedAt: this.clock.now(),
    });
  }

  async abandon(scope: IdempotencyScope): Promise<void> {
    await this.ref(scope).delete();
  }
}
