import { expect, test } from "@playwright/test";

import en from "../i18n/en.json";
import { acceptConsentGate } from "./onboarding-fixtures";

test("a consented Preparation visit without a demo account offers recovery", async ({
  page,
  baseURL,
}) => {
  await acceptConsentGate(page.context(), baseURL);
  await page.goto("/en/onboarding/preparation");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    en.onboarding.step07.unavailable.title,
  );
  await expect(page.getByRole("link", { name: en.onboarding.demoAccount.start })).toHaveAttribute(
    "href",
    "/en/register",
  );
});

test("creating another demo account clears the previous Reminders choice", async ({
  page,
  baseURL,
}) => {
  const { register, onboarding } = en;
  await acceptConsentGate(page.context(), baseURL);
  await page.goto("/en/register");

  async function registerAndSkipBaseline() {
    await page.getByRole("textbox", { name: register.email.label }).fill("demo@example.invalid");
    await page.getByLabel(register.password.label, { exact: true }).fill("synthetic-demo-password");
    await page.getByRole("button", { name: register.submit }).click();
    for (const step of ["age", "health", "lifestyle", "goals"]) {
      await expect(page).toHaveURL(`/en/onboarding/baseline/${step}`);
      await page.getByRole("button", { name: onboarding.step05.actions.skip, exact: true }).click();
    }
    await expect(page).toHaveURL("/en/onboarding/permissions");
  }

  await registerAndSkipBaseline();
  const reminders = page.getByRole("switch", { name: onboarding.step06.options.reminders.title });
  await expect(reminders).toBeEnabled();
  await reminders.press("Space");
  await expect(reminders).toBeChecked();
  await page.getByRole("button", { name: onboarding.step06.save }).click();
  await expect(page).toHaveURL("/en/onboarding/dashboard?profile=empty");

  await page.goBack();
  await expect(page).toHaveURL("/en/onboarding/permissions");
  await expect(reminders).toBeChecked();

  for (const path of ["baseline/goals", "baseline/lifestyle", "baseline/health", "baseline/age"]) {
    await page.goBack();
    await expect(page).toHaveURL(`/en/onboarding/${path}`);
  }
  await page.goBack();
  await expect(page).toHaveURL("/en/register");
  await registerAndSkipBaseline();
  await expect(reminders).toBeEnabled();
  await expect(reminders).not.toBeChecked();
});
