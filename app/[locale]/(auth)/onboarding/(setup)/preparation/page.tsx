import { getTranslations } from "next-intl/server";

import { BrandPanel } from "@/components/features/onboarding/BrandPanel";
import { ONBOARDING_ROUTES } from "@/components/features/onboarding/onboarding-progress";
import { PreparationFlow } from "@/components/features/onboarding/PreparationFlow";

export default async function PreparationPage() {
  const t = await getTranslations("brand");

  return (
    <PreparationFlow
      errorBrand={<BrandPanel route={ONBOARDING_ROUTES.preparation} />}
      partnerLogoLabel={t("partnerLogoAlt")}
    />
  );
}
