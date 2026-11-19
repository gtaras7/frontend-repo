import { expect, test } from "@playwright/test";

import el from "../i18n/el.json";
import en from "../i18n/en.json";
import { DEMO_PREPARATION_FAILURE } from "../lib/api/mock-account";
import { openDemoPage } from "./onboarding-fixtures";

for (const locale of ["en", "el"] as const) {
  const { step06, step07, step08 } = { en, el }[locale].onboarding;
  const base = `/${locale}/onboarding`;

  test(`optional permissions and preparation (${locale})`, async ({ page, baseURL }) => {
    await openDemoPage(page, baseURL, `${base}/permissions`);

    const heading = page.getByRole("heading", { level: 1 });
    await expect(heading).toHaveText(step06.title);
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "6");
    await expect(page.getByRole("switch")).toHaveCount(1);
    const reminders = page.getByRole("switch", { name: step06.options.reminders.title });
    await expect(reminders).toBeEnabled();
    await expect(reminders).not.toBeChecked();
    await expect(reminders).toHaveAccessibleDescription(step06.options.reminders.description);
    await expect(page.getByText(step06.options.location.description)).toBeVisible();
    await reminders.focus();
    await reminders.press("Space");
    await expect(reminders).toBeChecked();

    await page.evaluate((key) => {
      sessionStorage.setItem(key, "1");
    }, DEMO_PREPARATION_FAILURE);
    await page.getByRole("button", { name: step06.save }).click();
    await expect(page).toHaveURL(`${base}/preparation`);
    await expect(heading).toHaveText(step07.error.title);
    await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "7");
    await expect(page.getByRole("alert").filter({ hasText: step07.error.body })).toBeVisible();
    const retry = page.getByRole("button", { name: step07.error.retry });
    await expect(retry).toBeFocused();
    await page.evaluate((key) => {
      sessionStorage.removeItem(key);
    }, DEMO_PREPARATION_FAILURE);
    await retry.click();
    await expect(page).toHaveURL(`${base}/summary`);
    await expect(heading).toHaveText(step08.title);
    await expect(page.getByRole("main").getByRole("alert")).toHaveCount(0);

    await page.goBack();
    await expect(reminders).toBeChecked();
    await page.getByRole("button", { name: step06.skip }).click();
    await expect(page).toHaveURL(`${base}/summary`);
    await page.goBack();
    await expect(reminders).not.toBeChecked();
  });
}

test("preparation error can continue to the basic dashboard", async ({ page, baseURL }) => {
  await openDemoPage(page, baseURL, "/en/onboarding/permissions");
  await page.evaluate((key) => {
    sessionStorage.setItem(key, "1");
  }, DEMO_PREPARATION_FAILURE);
  await page.getByRole("button", { name: en.onboarding.step06.skip }).click();
  await page.getByRole("link", { name: en.onboarding.step07.error.dashboard }).click();
  await expect(page).toHaveURL("/en/onboarding/dashboard");
});

test("the later onboarding steps keep the existing consent gate", async ({ page }) => {
  for (const route of ["permissions", "preparation", "summary", "dashboard"]) {
    await page.goto(`/en/onboarding/${route}`);
    await expect(page).toHaveURL("/en/onboarding/consent");
  }
});
