import { getTranslations } from "next-intl/server";

import { BaselineLifestyleForm } from "@/components/features/onboarding/BaselineLifestyleForm";
import { OnboardingPanel } from "@/components/features/onboarding/OnboardingPanel";

export default async function BaselineLifestylePage() {
  const t = await getTranslations("onboarding.step05.lifestyle");

  return (
    <OnboardingPanel eyebrow={t("eyebrow")} title={t("title")}>
      <BaselineLifestyleForm />
    </OnboardingPanel>
  );
}
