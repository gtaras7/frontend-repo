import { expect, test } from "@playwright/test";

import el from "../i18n/el.json";
import en from "../i18n/en.json";
import { DEMO_ACCOUNT_MARKER, DEMO_AGE_FAILURE } from "../lib/api/mock-account";
import { openDemoPage } from "./onboarding-fixtures";

for (const locale of ["en", "el"] as const) {
  const messages = { en, el }[locale];
  const c = { ...messages.onboarding.step05.age, ...messages.onboarding.step05.actions };
  const healthUrl = new RegExp(`/${locale}/onboarding/baseline/health$`);
  const back = messages.onboarding.goBack;

  test.describe(`baseline age (${locale})`, () => {
    test("deep links retain the existing consent gate", async ({ page }) => {
      await page.goto(`/${locale}/onboarding/baseline/age`);
      await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/consent$`));
    });

    test.describe("demo account", () => {
      test.beforeEach(async ({ page, baseURL }) => {
        await openDemoPage(page, baseURL, `/${locale}/onboarding/baseline/age`);
        await expect(page.getByRole("button", { name: c.skip, exact: true })).toBeEnabled();
      });

      test("shows step 5 without guessing an age and matches Figma rows", async ({ page }) => {
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.title);
        await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "5");
        await expect(page.getByRole("radio")).toHaveCount(5);
        await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
        await expect(page.getByRole("button", { name: c.continue, exact: true })).toBeDisabled();
        const row = page.getByRole("radio", { name: c.options.under35 }).locator("..");
        const box = await row.boundingBox();
        expect(box?.height).toBeCloseTo(52, 0);
        expect(box?.width).toBeCloseTo(512, 0);
      });

      test("keyboard selection saves only in memory and clears on reload", async ({ page }) => {
        const option = page.getByRole("radio", { name: c.options.under35 });
        await option.focus();
        await option.press("Space");
        await option.press("ArrowDown");
        await expect(page.getByRole("radio", { name: c.options["35to44"] })).toBeChecked();
        await page.getByRole("button", { name: c.continue, exact: true }).click();
        await expect(page).toHaveURL(healthUrl);
        await page.getByRole("link", { name: back }).click();
        await expect(page.getByRole("radio", { name: c.options["35to44"] })).toBeChecked();
        const stored = await page.evaluate(() => ({
          keys: Object.keys(sessionStorage),
          local: localStorage.length,
        }));
        expect(stored).toEqual({ keys: [DEMO_ACCOUNT_MARKER], local: 0 });
        await page.reload();
        await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "5");
        await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
        await expect(page.getByRole("button", { name: c.continue, exact: true })).toBeDisabled();
        await expect(page.getByRole("button", { name: c.skip, exact: true })).toBeEnabled();
        expect(await page.evaluate((key) => sessionStorage.getItem(key), DEMO_ACCOUNT_MARKER)).toBe(
          "1",
        );
      });

      test("skip explicitly replaces a previous answer with missing", async ({ page }) => {
        await page.getByText(c.options["45to54"], { exact: true }).click();
        await expect(page.getByRole("radio", { name: c.options["45to54"] })).toBeChecked();
        await page.getByRole("button", { name: c.continue, exact: true }).click();
        await expect(page).toHaveURL(healthUrl);
        await page.getByRole("link", { name: back }).click();
        await expect(page.getByRole("radio", { name: c.options["45to54"] })).toBeChecked();
        await page.getByRole("button", { name: c.skip, exact: true }).click();
        await expect(page).toHaveURL(healthUrl);
        await page.getByRole("link", { name: back }).click();
        await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
        await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/baseline/age$`));
      });

      test("save failure retains selection for retry", async ({ page }) => {
        await page.evaluate((key) => {
          sessionStorage.setItem(key, "1");
        }, DEMO_AGE_FAILURE);
        await page.getByText(c.options["55to64"], { exact: true }).click();
        await page.getByRole("button", { name: c.continue, exact: true }).click();
        await expect(page.getByRole("main").getByRole("alert")).toContainText(c.error.title);
        await expect(page.getByRole("radio", { name: c.options["55to64"] })).toBeChecked();
        await page.evaluate((key) => {
          sessionStorage.removeItem(key);
        }, DEMO_AGE_FAILURE);
        await page.getByRole("button", { name: c.continue, exact: true }).click();
        await expect(page).toHaveURL(healthUrl);
        await page.getByRole("link", { name: back }).click();
        await expect(page.getByRole("radio", { name: c.options["55to64"] })).toBeChecked();
        await expect(page.getByRole("main").getByRole("alert")).toHaveCount(0);
      });

      test("reset removes the demo marker and returns to account setup", async ({ page }) => {
        await page.getByText(c.options["65plus"], { exact: true }).click();
        await page.getByRole("button", { name: c.continue, exact: true }).click();
        await expect(page).toHaveURL(healthUrl);
        await page.getByRole("link", { name: back }).click();
        await expect(page.getByRole("radio", { name: c.options["65plus"] })).toBeChecked();
        await page.getByRole("button", { name: c.resetDemo, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/${locale}/register$`));
        expect(
          await page.evaluate((key) => sessionStorage.getItem(key), DEMO_ACCOUNT_MARKER),
        ).toBeNull();

        await page.goto(`/${locale}/onboarding/baseline/age`);
        await expect(
          page.getByRole("link", { name: messages.onboarding.demoAccount.start, exact: true }),
        ).toBeVisible();
        await expect(page.getByRole("button", { name: c.skip, exact: true })).toBeDisabled();
      });

      test("Greek and English reflow at the annotated viewport and on phones", async ({ page }) => {
        for (const width of [815, 375]) {
          await page.setViewportSize({ width, height: 804 });
          await expect(page.getByRole("radio").last()).toBeVisible();
          expect(
            await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
          ).toBe(true);
        }
      });
    });
  });
}
