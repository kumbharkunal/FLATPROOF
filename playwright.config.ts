import { defineConfig } from "@playwright/test";

// QA runs against the production build (npm run build && npm run start:qa). Output stays
// outside OneDrive (%LOCALAPPDATA%\flatproof-qa). BASE_URL runs the suite against a live URL.
const qa = `${process.env.LOCALAPPDATA ?? "."}/flatproof-qa`;

export default defineConfig({
  testDir: "tests",
  timeout: 120_000,
  retries: 0,
  workers: 2,
  reporter: [["list"]],
  outputDir: `${qa}/test-results`,
  use: { baseURL: process.env.BASE_URL ?? "http://localhost:4410" },
  webServer: process.env.BASE_URL
    ? undefined
    : { command: "npm run start:qa", url: "http://localhost:4410", reuseExistingServer: true, timeout: 90_000 },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "phone", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 3 } },
  ],
});
