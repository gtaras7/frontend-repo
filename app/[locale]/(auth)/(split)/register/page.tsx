import { getTranslations } from "next-intl/server";

import { requireOnboardingConsent } from "@/components/features/onboarding/OnboardingConsentGate";
import { OnboardingPanel } from "@/components/features/onboarding/OnboardingPanel";
import { RegisterForm } from "@/components/features/onboarding/RegisterForm";

/**
 * Step 04 — Account Setup (Figma 420:181; validation 420:183).
 * Frontend only until Backend provides the human-reviewed registration and
 * guest contracts. No credentials are transmitted or persisted by this screen.
 */
export default async function RegisterPage() {
  await requireOnboardingConsent();
  const t = await getTranslations("register");

  return (
    <OnboardingPanel eyebrow={t("eyebrow")} title={t("title")}>
      <RegisterForm />
    </OnboardingPanel>
  );
}
