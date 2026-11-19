import { expect, test } from "@playwright/test";

import el from "../i18n/el.json";
import en from "../i18n/en.json";
import { DEMO_ACCOUNT_MARKER, DEMO_REGISTRATION_SCENARIO } from "../lib/api/mock-account";
import { acceptConsentGate } from "./onboarding-fixtures";

const messages = { en, el };
const testEmail = "synthetic@example.com";
const testPassword = "Synthetic-passphrase-123";

for (const locale of ["en", "el"] as const) {
  const c = messages[locale].register;

  test.describe(`account setup (${locale})`, () => {
    test("deep links still require the existing consent gate", async ({ page }) => {
      await page.goto(`/${locale}/register`);
      await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/consent$`));
    });

    test("native submission without JavaScript never includes credentials", async ({
      browser,
      baseURL,
    }) => {
      if (!baseURL) throw new Error("Playwright baseURL is required");
      const context = await browser.newContext({ javaScriptEnabled: false });
      try {
        await acceptConsentGate(context, baseURL);
        const page = await context.newPage();
        await page.goto(`${baseURL}/${locale}/register`);
        await page.getByLabel(c.email.label, { exact: true }).fill(testEmail);
        await page.getByLabel(c.password.label, { exact: true }).fill(testPassword);
        const requestPromise = page.waitForRequest((request) => request.isNavigationRequest());
        await page.getByRole("button", { name: c.submit, exact: true }).click();
        const request = await requestPromise;
        expect(new URL(request.url()).searchParams.size).toBe(0);
        expect(request.postData()).toBeNull();
      } finally {
        await context.close();
      }
    });

    test.describe("after consent", () => {
      test.beforeEach(async ({ context, baseURL, page }) => {
        await acceptConsentGate(context, baseURL);
        await page.goto(`/${locale}/register`);
      });

      test("renders the Figma account form and desktop geometry", async ({ page }) => {
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.title);
        await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "4");
        await expect(page.getByText(c.intro)).toBeVisible();
        await expect(page.getByLabel(c.email.label, { exact: true })).toHaveAttribute(
          "autocomplete",
          "email",
        );
        await expect(page.getByLabel(c.password.label, { exact: true })).toHaveAttribute(
          "type",
          "password",
        );
        await expect(page.getByRole("button", { name: c.guest, exact: true })).toBeVisible();
        const main = await page.getByRole("main").boundingBox();
        expect(main?.width).toBeCloseTo(640, 0);
        const field = await page.getByLabel(c.email.label, { exact: true }).boundingBox();
        expect(field?.width).toBeCloseTo(464, 0);
      });

      test("keeps step 4 on reload and returns to consent with the back arrow", async ({
        page,
      }) => {
        const onboarding = messages[locale].onboarding;
        await page.reload();
        await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "4");
        await expect(page.getByRole("progressbar")).toHaveAttribute(
          "aria-label",
          onboarding.progressLabel.replace("{step}", "4").replace("{total}", "9"),
        );
        await expect(page.getByRole("button", { name: onboarding.goForward })).toBeDisabled();
        await page.getByRole("link", { name: onboarding.goBack }).click();
        await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/consent$`));
        await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "3");
        await expect(page.getByRole("button", { name: onboarding.goForward })).toBeDisabled();
      });

      test("validates empty fields and focuses the first error", async ({ page }) => {
        await page.getByRole("button", { name: c.submit, exact: true }).click();
        await expect(page.getByRole("alert").filter({ hasText: c.validation.title })).toBeVisible();
        await expect(page.getByLabel(c.email.label, { exact: true })).toBeFocused();
        await expect(page.getByText(c.email.error, { exact: true })).toBeVisible();
        await expect(page.getByText(c.password.error, { exact: true })).toBeVisible();
        await expect(page.getByRole("button", { name: c.guest, exact: true })).toHaveCount(0);
      });

      test("retains invalid input and recovers using only the keyboard", async ({ page }) => {
        const email = page.getByLabel(c.email.label, { exact: true });
        const password = page.getByLabel(c.password.label, { exact: true });
        await email.fill("synthetic(at)example.com");
        await password.fill("short");
        await password.press("Enter");
        await expect(email).toHaveAttribute("aria-invalid", "true");
        await expect(password).toHaveAttribute("aria-invalid", "true");
        await expect(email).toHaveValue("synthetic(at)example.com");
        await expect(password).toHaveValue("short");
        await expect(email).toBeFocused();
        await expect(email).toHaveCSS("outline-style", "solid");

        await email.fill(testEmail);
        await email.press("Tab");
        await expect(password).toBeFocused();
        await password.fill(testPassword);
        await expect(page.getByRole("main").getByRole("alert")).toHaveCount(0);
        await password.press("Enter");
        await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/baseline/age$`));
        await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "5");
      });

      test("account and guest actions keep credentials local", async ({ page }) => {
        const unexpectedRequests: string[] = [];
        page.on("request", (request) => {
          const data = [request.url(), request.postData() ?? ""];
          const leaksCredentials = data.some((value) =>
            [testEmail, testPassword].some(
              (credential) =>
                value.includes(credential) || value.includes(encodeURIComponent(credential)),
            ),
          );
          if (request.method() !== "GET" || leaksCredentials) {
            unexpectedRequests.push(request.method());
          }
        });
        await page.getByLabel(c.email.label, { exact: true }).fill(testEmail);
        await page.getByLabel(c.password.label, { exact: true }).fill(testPassword);
        await page.getByRole("button", { name: c.submit, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/baseline/age$`));
        await page.goto(`/${locale}/register`);
        await page.getByLabel(c.email.label, { exact: true }).fill(testEmail);
        await page.getByLabel(c.password.label, { exact: true }).fill(testPassword);
        await page.getByRole("button", { name: c.guest, exact: true }).click();
        await expect(page.getByRole("status")).toHaveText(c.unavailable.guest);
        await expect(page).toHaveURL(new RegExp(`/${locale}/register$`));
        expect(unexpectedRequests).toEqual([]);
        const storage = await page.evaluate(
          (key) => ({
            local: localStorage.length,
            keys: Object.keys(sessionStorage),
            marker: sessionStorage.getItem(key),
          }),
          DEMO_ACCOUNT_MARKER,
        );
        expect(storage).toEqual({ local: 0, keys: [DEMO_ACCOUNT_MARKER], marker: "1" });
      });

      test("demo rejection highlights email, retains input, and recovers", async ({ page }) => {
        await page.evaluate((key) => {
          sessionStorage.setItem(key, "duplicate-email");
        }, DEMO_REGISTRATION_SCENARIO);
        const email = page.getByLabel(c.email.label, { exact: true });
        const password = page.getByLabel(c.password.label, { exact: true });
        await email.fill(testEmail);
        await password.fill(testPassword);
        await page.getByRole("button", { name: c.submit, exact: true }).click();
        await expect(page.getByRole("button", { name: c.submitting })).toBeDisabled();
        await expect(password).toBeDisabled();
        await expect(page.getByText(c.email.inUse, { exact: true })).toBeVisible();
        await expect(email).toBeFocused();
        await expect(email).toHaveValue(testEmail);
        await expect(password).toHaveValue(testPassword);
        expect(
          await page.evaluate((key) => sessionStorage.getItem(key), DEMO_ACCOUNT_MARKER),
        ).toBeNull();
        await page.evaluate((key) => {
          sessionStorage.removeItem(key);
        }, DEMO_REGISTRATION_SCENARIO);
        await email.fill("another-synthetic@example.com");
        await page.getByRole("button", { name: c.submit, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/baseline/age$`));
      });

      test("demo service failure permits retry without losing answers", async ({ page }) => {
        await page.evaluate((key) => {
          sessionStorage.setItem(key, "unavailable");
        }, DEMO_REGISTRATION_SCENARIO);
        const email = page.getByLabel(c.email.label, { exact: true });
        const password = page.getByLabel(c.password.label, { exact: true });
        await email.fill(testEmail);
        await password.fill(testPassword);
        await page.getByRole("button", { name: c.submit, exact: true }).click();
        await expect(page.getByRole("main").getByRole("alert")).toContainText(c.requestError.title);
        await expect(password).toHaveValue(testPassword);
        await expect(page.getByRole("button", { name: c.submit, exact: true })).toBeEnabled();
        await page.evaluate((key) => {
          sessionStorage.removeItem(key);
        }, DEMO_REGISTRATION_SCENARIO);
        await page.getByRole("button", { name: c.submit, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/baseline/age$`));
      });

      test("blocked browser storage produces recoverable feedback", async ({ page }) => {
        await page.addInitScript(() => {
          Object.defineProperty(window, "sessionStorage", {
            get() {
              throw new DOMException("Disabled", "SecurityError");
            },
          });
        });
        await page.reload();
        await page.getByLabel(c.email.label, { exact: true }).fill(testEmail);
        await page.getByLabel(c.password.label, { exact: true }).fill(testPassword);
        await page.getByRole("button", { name: c.submit, exact: true }).click();
        await expect(page.getByRole("main").getByRole("alert")).toContainText(c.requestError.title);
        await expect(page.getByRole("button", { name: c.submit, exact: true })).toBeEnabled();
      });

      test("keeps long copy and controls within narrow viewports", async ({ page }) => {
        for (const width of [1100, 768, 375]) {
          await page.setViewportSize({ width, height: 900 });
          const fits = await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          );
          expect(fits).toBe(true);
          await expect(page.getByRole("button", { name: c.submit, exact: true })).toBeVisible();
          await expect(page.getByRole("button", { name: c.guest, exact: true })).toBeVisible();
        }
      });
    });
  });
}
