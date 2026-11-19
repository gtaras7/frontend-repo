import { expect, test } from "@playwright/test";

const locales = ["en", "el"] as const;

const COPY = {
  en: {
    title: "Welcome to CardioGuard",
    callout: "Not a doctor, and never in an emergency",
    privacy: "Privacy by design. Nothing is shared without your consent.",
    getStarted: "Get started",
    haveAccount: "I already have an account",
    stepLabel: /Step 2 of 9/,
  },
  el: {
    title: "Καλώς ήρθατε στο CardioGuard",
    callout: "Όχι γιατρός, και ποτέ σε έκτακτη ανάγκη",
    privacy: "Απόρρητο εκ σχεδιασμού. Τίποτα δεν κοινοποιείται χωρίς τη συγκατάθεσή σας.",
    getStarted: "Ξεκινήστε",
    haveAccount: "Έχω ήδη λογαριασμό",
    stepLabel: /Βήμα 2 από 9/,
  },
} as const;

for (const locale of locales) {
  const copy = COPY[locale];

  test.describe(`welcome (${locale})`, () => {
    test("renders one brand panel beside the welcome content", async ({ page }) => {
      await page.goto(`/${locale}/onboarding/welcome`);

      const brand = page.getByRole("complementary");
      const panel = page.getByRole("main");
      await expect(brand).toHaveCount(1);
      await expect(panel).toHaveCount(1);
      await expect(panel.getByRole("heading", { level: 1 })).toHaveText(copy.title);
      await expect(panel.getByText(copy.callout)).toBeVisible();
      await expect(brand.getByText(copy.privacy)).toBeVisible();
      await expect(panel.getByText(copy.privacy)).toBeVisible();
    });

    test("progress dots show step 2 of 9", async ({ page }) => {
      await page.goto(`/${locale}/onboarding/welcome`);
      const dots = page.getByRole("progressbar");
      await expect(dots).toHaveAttribute("aria-valuenow", "2");
      await expect(dots).toHaveAttribute("aria-label", copy.stepLabel);
    });

    test("Get started navigates to the consent step", async ({ page }) => {
      await page.goto(`/${locale}/onboarding/welcome`);
      await page.getByRole("link", { name: copy.getStarted }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/consent$`));
    });

    test("login CTA is a visible disabled control", async ({ page }) => {
      await page.goto(`/${locale}/onboarding/welcome`);
      const login = page.getByRole("button", { name: copy.haveAccount });
      await expect(login).toBeVisible();
      await expect(login).toBeDisabled();
    });
  });
}
