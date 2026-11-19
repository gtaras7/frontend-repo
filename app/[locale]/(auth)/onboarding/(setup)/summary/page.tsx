import { BrandPanel } from "@/components/features/onboarding/BrandPanel";
import { ONBOARDING_ROUTES } from "@/components/features/onboarding/onboarding-progress";
import { OnboardingSplitLayout } from "@/components/features/onboarding/OnboardingSplitLayout";
import { StartingSummary } from "@/components/features/onboarding/StartingSummary";

export default function StartingSummaryPage() {
  return (
    <OnboardingSplitLayout
      brand={<BrandPanel route={ONBOARDING_ROUTES.summary} />}
      content="summary"
    >
      <StartingSummary />
    </OnboardingSplitLayout>
  );
}
