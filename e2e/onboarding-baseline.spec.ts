import { expect, test } from "@playwright/test";

import el from "../i18n/el.json";
import en from "../i18n/en.json";
import { DEMO_ACCOUNT_MARKER, DEMO_HEIGHT_FAILURE } from "../lib/api/mock-account";
import { openDemoPage } from "./onboarding-fixtures";

for (const locale of ["en", "el"] as const) {
  const onboarding = { en, el }[locale].onboarding;
  const { actions, age, health, lifestyle, goals, height } = onboarding.step05;
  const base = `/${locale}/onboarding/baseline`;
  const permissions = `/${locale}/onboarding/permissions`;

  test.describe(`baseline flow (${locale})`, () => {
    test("later baseline routes still require consent", async ({ page }) => {
      for (const step of ["health", "lifestyle", "goals"]) {
        await page.goto(`${base}/${step}`);
        await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/consent$`));
      }
    });

    test.describe("demo account", () => {
      test("walks baseline, restores saved choices and keeps step 5", async ({ page, baseURL }) => {
        await openDemoPage(page, baseURL, `${base}/age`);
        const next = page.getByRole("button", { name: actions.continue, exact: true });
        const skip = page.getByRole("button", { name: actions.skip, exact: true });
        const back = page.getByRole("link", { name: onboarding.goBack });
        const step = page.getByRole("progressbar");
        await page.getByText(age.options["35to44"], { exact: true }).click();
        await next.click();
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(health.title);
        await expect(step).toHaveAttribute("aria-valuenow", "5");
        await expect(page.getByText(health.medications.title, { exact: true })).toBeVisible();
        const pressure = page.getByRole("button", { name: health.options.bloodPressure });
        const diabetes = page.getByRole("button", { name: health.options.diabetes });
        const none = page.getByRole("button", { name: health.options.none });
        await pressure.click();
        await diabetes.click();
        await expect(pressure).toHaveAttribute("aria-pressed", "true");
        await expect(diabetes).toHaveAttribute("aria-pressed", "true");
        await none.click();
        await expect(pressure).toHaveAttribute("aria-pressed", "false");
        await expect(diabetes).toHaveAttribute("aria-pressed", "false");
        await expect(none).toHaveAttribute("aria-pressed", "true");
        await pressure.click();
        await expect(none).toHaveAttribute("aria-pressed", "false");
        await next.click();

        await expect(page.getByRole("heading", { level: 1 })).toHaveText(lifestyle.title);
        await expect(step).toHaveAttribute("aria-valuenow", "5");
        await expect(page.getByRole("radio", { checked: true })).toHaveCount(0);
        await page.getByText(lifestyle.activity.moderate, { exact: true }).click();
        await page.getByText(lifestyle.smoking.preferNotToSay, { exact: true }).click();
        await expect(page.getByRole("radio", { checked: true })).toHaveCount(2);
        await next.click();

        await expect(page.getByRole("heading", { level: 1 })).toHaveText(goals.title);
        await expect(step).toHaveAttribute("aria-valuenow", "5");
        const activityGoal = page.getByRole("button", { name: goals.options.activity });
        const stressGoal = page.getByRole("button", { name: goals.options.stress });
        await activityGoal.click();
        await stressGoal.click();
        await expect(activityGoal).toHaveAttribute("aria-pressed", "true");
        await expect(stressGoal).toHaveAttribute("aria-pressed", "true");
        await next.click();
        await expect(page).toHaveURL(permissions);
        await page.goBack();
        await expect(activityGoal).toHaveAttribute("aria-pressed", "true");
        await expect(stressGoal).toHaveAttribute("aria-pressed", "true");
        await back.click();
        await expect(page.getByRole("radio", { name: lifestyle.activity.moderate })).toBeChecked();
        await expect(
          page.getByRole("radio", { name: lifestyle.smoking.preferNotToSay }),
        ).toBeChecked();
        await back.click();
        await expect(pressure).toHaveAttribute("aria-pressed", "true");
        await skip.click();
        await expect(page).toHaveURL(new RegExp(`${base}/lifestyle$`));
        await back.click();
        await expect(pressure).toHaveAttribute("aria-pressed", "false");
        const storage = await page.evaluate(() => ({
          keys: Object.keys(sessionStorage),
          local: localStorage.length,
        }));
        expect(storage).toEqual({ keys: [DEMO_ACCOUNT_MARKER], local: 0 });
      });

      test("retains health choices through the Figma height validation state", async ({
        page,
        baseURL,
      }) => {
        await openDemoPage(page, baseURL, `${base}/health`);
        await page.evaluate((key) => {
          sessionStorage.setItem(key, "1");
        }, DEMO_HEIGHT_FAILURE);
        await page.getByRole("button", { name: health.options.bloodPressure }).click();
        const next = page.getByRole("button", { name: actions.continue, exact: true });
        await next.click();
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(height.title);
        await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "5");
        const field = page.getByRole("textbox", { name: height.label });
        await expect(field).toHaveValue("340");
        await expect(field).toBeFocused();
        await expect(field).toHaveAttribute("aria-invalid", "true");
        await expect(
          page.getByRole("alert").filter({ hasText: height.warning.title }),
        ).toBeVisible();
        await field.fill("119");
        await next.click();
        await expect(field).toHaveAttribute("aria-invalid", "true");
        await field.fill("175");
        await next.click();
        await expect(page).toHaveURL(new RegExp(`${base}/lifestyle$`));
        await page.getByRole("link", { name: onboarding.goBack }).click();
        await expect(
          page.getByRole("button", { name: health.options.bloodPressure }),
        ).toHaveAttribute("aria-pressed", "true");
        await next.click();
        await expect(page).toHaveURL(new RegExp(`${base}/lifestyle$`));
      });

      test("skips lifestyle and goals on narrow screens", async ({ page, baseURL }) => {
        await page.setViewportSize({ width: 375, height: 804 });
        await openDemoPage(page, baseURL, `${base}/lifestyle`);
        const skip = page.getByRole("button", { name: actions.skip, exact: true });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        await skip.click();
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(goals.title);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
        await skip.click();
        await expect(page).toHaveURL(permissions);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(onboarding.step06.title);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
          true,
        );
      });
    });
  });
}
