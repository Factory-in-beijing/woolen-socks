import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/** The only way the backend touches Firestore: Admin SDK, behind the API (principle 4). Credentials come from the runtime identity. */
export function firestore(): Firestore {
  const app = getApps()[0] ?? initializeApp();
  return getFirestore(app);
}
