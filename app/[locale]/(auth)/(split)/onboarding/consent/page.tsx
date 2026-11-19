import { getTranslations } from "next-intl/server";

import { ConsentForm } from "@/components/features/onboarding/ConsentForm";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";

/**
 * Onboarding step 03 — Consent (`Web / 03 Consent`, Figma node 407:106;
 * error state 03e = node 407:107).
 *
 * HARD GATE per docs/onboarding-desktop-handoff.md: both statements required,
 * the button is disabled until then (D3), and the server — not this app —
 * owns the consent records (GDPR; BFF contract).
 *
 * TODO(consent plan D2): once NestJS ships `GET /onboarding/progress`, a deep
 * link into this step must redirect to the furthest incomplete step. Do not
 * add the gate here unilaterally; the endpoint shape is a Backend decision.
 */
export default async function ConsentPage() {
  const t = await getTranslations("onboarding.step03");

  return (
    <div style={onboardingStyles.stack}>
      <p style={onboardingStyles.eyebrow}>{t("eyebrow")}</p>

      <h1 style={onboardingStyles.title}>{t("title")}</h1>

      <ConsentForm />

      <p style={onboardingStyles.footnote}>{t("footnote")}</p>
    </div>
  );
}
