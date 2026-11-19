import { expect, test } from "@playwright/test";

const locales = ["en", "el"] as const;

const COPY = {
  en: {
    continue: "Continue",
    goBack: "Go to previous step",
    goForward: "Go to next step",
  },
  el: {
    continue: "Συνέχεια",
    goBack: "Μετάβαση στο προηγούμενο βήμα",
    goForward: "Μετάβαση στο επόμενο βήμα",
  },
} as const;

for (const locale of locales) {
  const copy = COPY[locale];

  test.describe(`splash (${locale})`, () => {
    test("splash shows step 1 and Continue opens welcome", async ({ page }) => {
      await page.goto(`/${locale}/onboarding`);
      await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "1");
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      const cta = page.getByRole("link", { name: copy.continue, exact: true });
      await expect(cta).toBeVisible();
      await cta.click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/welcome$`));
      await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");
    });

    test("step arrows preserve locale, navigate both ways and disable at boundaries", async ({
      page,
    }) => {
      await page.goto(`/${locale}/onboarding`);
      await expect(page.getByRole("button", { name: copy.goBack })).toBeDisabled();

      await page.getByRole("link", { name: copy.goForward }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/welcome$`));
      await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");

      await page.getByRole("link", { name: copy.goBack }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding$`));
      await expect(page.getByRole("button", { name: copy.goBack })).toBeDisabled();

      await page.getByRole("link", { name: copy.goForward }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/welcome$`));
      await page.getByRole("link", { name: copy.goForward }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/consent$`));
      await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "3");
      await expect(page.getByRole("button", { name: copy.goForward })).toBeDisabled();

      await page.getByRole("link", { name: copy.goBack }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/welcome$`));
      await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");
    });
  });
}
