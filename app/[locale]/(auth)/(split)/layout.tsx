import { BrandPanel } from "@/components/features/onboarding/BrandPanel";
import { OnboardingSplitLayout } from "@/components/features/onboarding/OnboardingSplitLayout";

export default function SplitLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingSplitLayout brand={<BrandPanel />}>{children}</OnboardingSplitLayout>;
}
