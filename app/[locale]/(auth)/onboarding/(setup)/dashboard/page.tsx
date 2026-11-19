import { BrandPanel } from "@/components/features/onboarding/BrandPanel";
import { DashboardFlow } from "@/components/features/onboarding/DashboardFlow";
import {
  ONBOARDING_ROUTES,
  SKIPPED_DASHBOARD,
} from "@/components/features/onboarding/onboarding-progress";

export default async function FirstRunDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ profile?: string | string[] }>;
}) {
  const { profile } = await searchParams;
  return (
    <DashboardFlow
      brand={<BrandPanel route={ONBOARDING_ROUTES.firstRunDashboard} />}
      skipped={profile === SKIPPED_DASHBOARD.query.profile}
    />
  );
}
