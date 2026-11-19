import { getTranslations } from "next-intl/server";

import { BaselineAgeForm } from "@/components/features/onboarding/BaselineAgeForm";
import { OnboardingPanel } from "@/components/features/onboarding/OnboardingPanel";

export default async function BaselineAgePage() {
  const t = await getTranslations("onboarding.step05.age");

  return (
    <OnboardingPanel eyebrow={t("eyebrow")} title={t("title")}>
      <BaselineAgeForm />
    </OnboardingPanel>
  );
}
