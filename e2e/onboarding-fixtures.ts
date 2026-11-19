import type { BrowserContext, Page } from "@playwright/test";

import { DEMO_ACCOUNT_MARKER } from "../lib/api/mock-account";
import { CONSENT_GATE_COOKIE } from "../lib/onboarding-consent-gate";

export async function acceptConsentGate(context: BrowserContext, baseURL: string | undefined) {
  if (!baseURL) throw new Error("Playwright baseURL is required");
  await context.addCookies([{ name: CONSENT_GATE_COOKIE, value: "1", url: baseURL }]);
}

export async function openDemoPage(page: Page, baseURL: string | undefined, pathname: string) {
  await acceptConsentGate(page.context(), baseURL);
  const seed = await page.addInitScript((key) => {
    sessionStorage.setItem(key, "1");
  }, DEMO_ACCOUNT_MARKER);
  try {
    await page.goto(pathname);
  } finally {
    await seed.dispose();
  }
}
