import { defineConfig, devices } from "@playwright/test";

// e2e on critical paths against a production build (CI: staging backend). Traces off by default; use --trace on to debug.
const port = Number(process.env["E2E_PORT"] ?? 3100);
const executablePath = process.env["PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH"];

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: process.env["CI"] ? 1 : 0,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${port}`, trace: "off" },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(executablePath ? { launchOptions: { executablePath } } : {}),
      },
    },
  ],
  webServer: {
    command: `pnpm start -p ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env["CI"],
    timeout: 60_000,
  },
});
