import { expect, test } from "@playwright/test";

// App pages still have placeholder bodies; these tests cover the shell and routing.

const locales = ["en", "el"] as const;

const COPY = {
  en: {
    nav: { chat: "Chat", health: "Health", reminders: "Reminders" },
    cta: "New conversation",
    healthTitle: "Health",
    chatTitle: "CardioGuard Assistant",
    chatSubtitle: "Online · evidence-based guidance",
    settings: "Settings",
    language: "Language",
  },
  el: {
    nav: { chat: "Συνομιλία", health: "Υγεία", reminders: "Υπενθυμίσεις" },
    cta: "Νέα συνομιλία",
    healthTitle: "Υγεία",
    chatTitle: "Βοηθός CardioGuard",
    chatSubtitle: "Σε σύνδεση · τεκμηριωμένη καθοδήγηση",
    settings: "Ρυθμίσεις",
    language: "Γλώσσα",
  },
} as const;

for (const locale of locales) {
  const copy = COPY[locale];

  test.describe(`app shell (${locale})`, () => {
    test("renders the sidebar, the nav and the page header", async ({ page }) => {
      await page.goto(`/${locale}/dashboard`);

      const nav = page.getByRole("navigation");
      await expect(nav.getByRole("link", { name: copy.nav.chat })).toBeVisible();
      await expect(nav.getByRole("link", { name: copy.nav.health })).toBeVisible();
      await expect(nav.getByRole("link", { name: copy.nav.reminders })).toBeVisible();

      await expect(page.getByRole("button", { name: copy.cta })).toBeVisible();
      await expect(page.getByRole("main").getByRole("heading", { level: 1 })).toHaveText(
        copy.healthTitle,
      );
    });

    test("the current route is marked as the active nav item", async ({ page }) => {
      await page.goto(`/${locale}/dashboard`);
      const nav = page.getByRole("navigation");
      await expect(nav.getByRole("link", { name: copy.nav.health })).toHaveAttribute(
        "aria-current",
        "page",
      );
      await expect(nav.getByRole("link", { name: copy.nav.chat })).not.toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    test("nav links keep the locale and swap the screen", async ({ page }) => {
      await page.goto(`/${locale}/dashboard`);
      await page.getByRole("navigation").getByRole("link", { name: copy.nav.reminders }).click();

      await expect(page).toHaveURL(new RegExp(`/${locale}/reminders$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy.nav.reminders);
    });

    test("chat header carries its meta line", async ({ page }) => {
      await page.goto(`/${locale}/chat`);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy.chatTitle);
      await expect(page.getByText(copy.chatSubtitle)).toBeVisible();
    });

    test("the settings link opens settings", async ({ page }) => {
      await page.goto(`/${locale}/dashboard`);
      await page.getByRole("link", { name: copy.settings }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/settings$`));
    });

    test("the language pill switches locale without leaving the screen", async ({ page }) => {
      await page.goto(`/${locale}/dashboard`);
      const other = locale === "en" ? "el" : "en";

      await page.getByRole("combobox", { name: copy.language }).selectOption(other);

      await expect(page).toHaveURL(new RegExp(`/${other}/dashboard$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(COPY[other].healthTitle);
    });
  });
}
