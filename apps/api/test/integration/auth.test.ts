import { beforeAll, describe, expect, it } from "vitest";
import { FirebaseTokenVerifier } from "../../src/shared/infrastructure/firebase-token-verifier.ts";

const authHost = process.env["FIREBASE_AUTH_EMULATOR_HOST"] ?? "127.0.0.1:9099";

beforeAll(() => {
  process.env["GCLOUD_PROJECT"] = "demo-drivenet";
});

/** Signs a user up through the Auth emulator's REST API and returns a real (emulator-issued) ID token. */
async function signUp(): Promise<{ idToken: string; localId: string }> {
  const res = await fetch(
    `http://${authHost}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: `u${Date.now()}@example.test`,
        password: "correct-horse-battery",
        returnSecureToken: true,
      }),
    },
  );
  return (await res.json()) as { idToken: string; localId: string };
}

describe("FirebaseTokenVerifier against the Auth emulator", () => {
  it("accepts a real ID token and returns its uid", async () => {
    const { idToken, localId } = await signUp();
    expect(await new FirebaseTokenVerifier().verify(idToken)).toEqual({ uid: localId });
  });

  it("rejects garbage and tampered tokens with a single 401 unauthenticated", async () => {
    const { idToken } = await signUp();
    const tampered = `${idToken.slice(0, -4)}AAAA`;
    for (const bad of ["not-a-jwt", "", tampered]) {
      await expect(new FirebaseTokenVerifier().verify(bad)).rejects.toMatchObject({
        code: "unauthenticated",
      });
    }
  });
});
