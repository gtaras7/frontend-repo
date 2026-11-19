import { expect, test } from "@playwright/test";

/**
 * D3 (resolved in the consent plan §4): the button is disabled until both
 * statements are accepted, so 03e is reachable only via a SERVER rejection.
 * The mock's forced-fail seam (`cardioguard.mock.consentFail` sessionStorage
 * flag) simulates that; when NestJS ships `POST /onboarding/consent`, replace
 * the seam by intercepting the real request with page.route.
 */

const locales = ["en", "el"] as const;

const COPY = {
  en: {
    title: "Before we begin",
    helper:
      "You must accept both. If you do not agree, no health profile will be created or processed.",
    notDoctor:
      "I understand CardioGuard is not a doctor, does not provide a diagnosis, and does not replace a healthcare professional.",
    notEmergency:
      "I understand CardioGuard is not for emergencies and I should contact local emergency services for urgent symptoms.",
    submit: "Accept & continue",
    counterRequired: "2 required",
    counterOf: "1 of 2",
    errorTitle: "You missed a required decision",
    registerTitle: "Create your account",
  },
  el: {
    title: "Πριν ξεκινήσουμε",
    helper:
      "Πρέπει να αποδεχτείτε και τις δύο. Αν δεν συμφωνείτε, δεν θα δημιουργηθεί ούτε θα υποβληθεί σε επεξεργασία προφίλ υγείας.",
    notDoctor:
      "Κατανοώ ότι το CardioGuard δεν είναι γιατρός, δεν παρέχει διάγνωση και δεν αντικαθιστά επαγγελματία υγείας.",
    notEmergency:
      "Κατανοώ ότι το CardioGuard δεν είναι για έκτακτες ανάγκες και πρέπει να επικοινωνώ με τις τοπικές υπηρεσίες έκτακτης ανάγκης για επείγοντα συμπτώματα.",
    submit: "Αποδοχή & συνέχεια",
    counterRequired: "2 απαιτούνται",
    counterOf: "1 από 2",
    errorTitle: "Παραλείψατε μια υποχρεωτική απόφαση",
    registerTitle: "Δημιουργήστε τον λογαριασμό σας",
  },
} as const;

for (const locale of locales) {
  const c = COPY[locale];

  test.describe(`consent (${locale})`, () => {
    test("renders the gate copy, counter and step 3 dots", async ({ page }) => {
      await page.goto(`/${locale}/onboarding/consent`);

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.title);
      const panel = page.getByRole("main");
      await expect(panel.getByText(c.helper)).toBeVisible();
      await expect(panel.getByText(c.notDoctor)).toBeVisible();
      await expect(panel.getByText(c.notEmergency)).toBeVisible();
      await expect(page.getByText(c.counterRequired)).toBeVisible();

      const dots = page.getByRole("progressbar");
      await expect(dots).toHaveAttribute("aria-valuenow", "3");
    });

    test("button stays disabled until both statements are accepted", async ({ page }) => {
      await page.goto(`/${locale}/onboarding/consent`);

      const submit = page.getByRole("button", { name: c.submit });
      await expect(submit).toBeDisabled();

      await page.getByRole("checkbox").first().check();
      await expect(page.getByText(c.counterOf)).toBeVisible();
      await expect(submit).toBeDisabled();

      await page.getByRole("checkbox").nth(1).check();
      await expect(submit).toBeEnabled();
    });

    test("happy path: both accepted -> submit -> registration continues at step 4", async ({
      page,
    }) => {
      await page.goto(`/${locale}/onboarding/consent`);

      for (const box of await page.getByRole("checkbox").all()) await box.check();
      await page.getByRole("button", { name: c.submit }).click();

      await expect(page).toHaveURL(new RegExp(`/${locale}/register$`));
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(c.registerTitle);
      await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "4");
    });

    test("consent rejection retains both answers and allows retry", async ({ page }) => {
      await page.goto(`/${locale}/onboarding/consent`);
      await page.evaluate(() => {
        window.sessionStorage.setItem("cardioguard.mock.consentFail", "1");
      });

      for (const box of await page.getByRole("checkbox").all()) await box.check();
      await page.getByRole("button", { name: c.submit }).click();

      const panel = page.getByRole("main");
      await expect(panel.getByRole("alert")).toContainText(c.errorTitle);
      await expect(page.getByRole("checkbox").first()).toBeChecked();
      await expect(page.getByRole("checkbox").nth(1)).toBeChecked();
      await expect(page.getByRole("button", { name: c.submit })).toBeEnabled();
      await expect(page).toHaveURL(new RegExp(`/${locale}/onboarding/consent$`));

      await page.evaluate(() => {
        window.sessionStorage.removeItem("cardioguard.mock.consentFail");
      });
      await page.getByRole("button", { name: c.submit }).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/register$`));
    });
  });
}
