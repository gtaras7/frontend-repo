import { getTranslations } from "next-intl/server";

import { BrandPanel } from "@/components/features/onboarding/BrandPanel";
import { ONBOARDING_ROUTES } from "@/components/features/onboarding/onboarding-progress";
import { OnboardingPanel } from "@/components/features/onboarding/OnboardingPanel";
import { OnboardingSplitLayout } from "@/components/features/onboarding/OnboardingSplitLayout";
import { PermissionsForm } from "@/components/features/onboarding/PermissionsForm";

export default async function PermissionsPage() {
  const t = await getTranslations("onboarding.step06");

  return (
    <OnboardingSplitLayout brand={<BrandPanel route={ONBOARDING_ROUTES.permissions} />}>
      <OnboardingPanel eyebrow={t("eyebrow")} title={t("title")}>
        <PermissionsForm />
      </OnboardingPanel>
    </OnboardingSplitLayout>
  );
}
