import { defineConfig } from "vitest/config";
// Runs against the Firebase Emulator Suite (principle 21: integration without mocks of the database).
export default defineConfig({
  test: { include: ["test/integration/**/*.test.ts"], testTimeout: 20_000, fileParallelism: false },
});
