import { expect, test } from "@playwright/test";

import el from "../i18n/el.json";
import en from "../i18n/en.json";
import { DEMO_DASHBOARD_FAILURE } from "../lib/api/mock-account";
import { openDemoPage } from "./onboarding-fixtures";

test("summary reflects reported answers and dashboard recovers after a demo failure", async ({
  page,
  baseURL,
}) => {
  const { step05, step06, step08, step09 } = en.onboarding;
  const base = "/en/onboarding";
  await openDemoPage(page, baseURL, `${base}/baseline/age`);
  const age = page.getByRole("radio", { name: step05.age.options["45to54"] });
  await expect(age).toBeEnabled();
  await page.getByText(step05.age.options["45to54"], { exact: true }).click();
  await expect(age).toBeChecked();
  await page.getByRole("button", { name: step05.actions.continue, exact: true }).click();
  const skip = page.getByRole("button", { name: step05.actions.skip, exact: true });
  for (const step of ["health", "lifestyle", "goals"]) {
    await expect(page).toHaveURL(`${base}/baseline/${step}`);
    await skip.click();
  }
  await page.getByRole("button", { name: step06.skip }).click();
  await expect(page).toHaveURL(`${base}/summary`);
  const main = page.getByRole("main");
  await expect(main.getByRole("heading", { level: 1 })).toHaveText(step08.title);
  await expect(main.getByText(step05.age.options["45to54"], { exact: true })).toBeVisible();
  await expect(main.getByRole("status")).toContainText(step08.fields.height);

  await page.evaluate((key) => {
    sessionStorage.setItem(key, "1");
  }, DEMO_DASHBOARD_FAILURE);
  await main.getByRole("link", { name: step08.dashboard }).click();
  await expect(page).toHaveURL(`${base}/dashboard`);
  const retry = main.getByRole("button", { name: step09.error.retry });
  await expect(main.getByRole("alert")).toContainText(step09.error.title);
  await expect(retry).toBeFocused();
  await page.evaluate((key) => {
    sessionStorage.removeItem(key);
  }, DEMO_DASHBOARD_FAILURE);
  await retry.click();
  await expect(main.getByText(step09.ready.title)).toBeVisible();
  await expect(main.getByRole("alert")).toHaveCount(0);
  await expect(main.getByRole("link", { name: step09.startHabit })).toHaveAttribute(
    "href",
    "/en/reminders",
  );
  await page.goBack();
  await expect(main.getByText(step05.age.options["45to54"], { exact: true })).toBeVisible();
});

test("skipping every baseline question opens the skipped dashboard in Greek", async ({
  page,
  baseURL,
}) => {
  const { step05, step06, step09 } = el.onboarding;
  const base = "/el/onboarding";
  await page.setViewportSize({ width: 375, height: 804 });
  await openDemoPage(page, baseURL, `${base}/baseline/age`);
  const skip = page.getByRole("button", { name: step05.actions.skip, exact: true });
  for (const step of ["age", "health", "lifestyle", "goals"]) {
    await expect(page).toHaveURL(`${base}/baseline/${step}`);
    await skip.click();
  }
  await page.getByRole("button", { name: step06.skip }).click();
  await expect(page).toHaveURL(`${base}/dashboard?profile=empty`);
  await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "9");
  const main = page.getByRole("main");
  await expect(main.getByText(step09.skipped.title)).toBeVisible();
  await expect(main.getByText(step09.ready.title)).toHaveCount(0);
  const education = main.getByRole("link", { name: step09.skipped.continue });
  await expect(education).toHaveAttribute("href", "/el/chat");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
});
