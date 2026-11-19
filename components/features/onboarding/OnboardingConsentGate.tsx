import { cookies } from "next/headers";
import { getLocale } from "next-intl/server";

import { ONBOARDING_ROUTES } from "@/components/features/onboarding/onboarding-progress";
import { redirect } from "@/i18n/navigation";
import { CONSENT_GATE_COOKIE, hasConsentGatePassed } from "@/lib/onboarding-consent-gate";

export async function requireOnboardingConsent() {
  const jar = await cookies();
  if (!hasConsentGatePassed(jar.get(CONSENT_GATE_COOKIE)?.value)) {
    redirect({ href: ONBOARDING_ROUTES.consent, locale: await getLocale() });
  }
}

export async function OnboardingConsentGate({ children }: { children: React.ReactNode }) {
  await requireOnboardingConsent();
  return children;
}
