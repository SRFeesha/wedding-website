import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  use: {
    baseURL: "http://localhost:7777",
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:7777",
    reuseExistingServer: true,
  },
});
