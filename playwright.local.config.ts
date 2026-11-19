import { defineConfig } from "@playwright/test";

import config from "./playwright.config";

// The existing server must have NEXT_PUBLIC_MOCK_ONBOARDING=1 for onboarding E2E.
export default defineConfig({
  ...config,
  webServer: undefined,
  use: {
    ...config.use,
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000",
  },
});
