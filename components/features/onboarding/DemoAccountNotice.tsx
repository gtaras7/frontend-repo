import { useTranslations } from "next-intl";

import { ONBOARDING_ROUTES } from "@/components/features/onboarding/onboarding-progress";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import type { DemoAccountAvailability } from "@/components/features/onboarding/useDemoAccount";
import { ButtonLink } from "@/components/ui/01-actions/Button";

export function DemoAccountNotice({
  availability,
  unavailable,
  linkVariant = "secondary",
}: {
  availability: DemoAccountAvailability;
  unavailable: string;
  linkVariant?: "secondary" | "outline";
}) {
  const t = useTranslations("onboarding.demoAccount");
  if (availability === "missing") {
    return (
      <ButtonLink href={ONBOARDING_ROUTES.register} variant={linkVariant} fullWidth>
        {t("start")}
      </ButtonLink>
    );
  }
  if (availability === "loading" || availability === "disabled") {
    return (
      <p role="status" style={onboardingStyles.footnote}>
        {availability === "loading" ? t("loading") : unavailable}
      </p>
    );
  }
  return null;
}
