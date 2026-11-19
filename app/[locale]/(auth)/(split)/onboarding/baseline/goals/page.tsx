import { getTranslations } from "next-intl/server";

import { BaselineGoalsForm } from "@/components/features/onboarding/BaselineGoalsForm";
import { OnboardingPanel } from "@/components/features/onboarding/OnboardingPanel";

export default async function BaselineGoalsPage() {
  const t = await getTranslations("onboarding.step05.goals");

  return (
    <OnboardingPanel eyebrow={t("eyebrow")} title={t("title")}>
      <BaselineGoalsForm />
    </OnboardingPanel>
  );
}
