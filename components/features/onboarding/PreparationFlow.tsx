"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import {
  allDemoBaselineSkipped,
  demoDashboardHref,
} from "@/components/features/onboarding/demo-baseline";
import { demoQueryKeys } from "@/components/features/onboarding/demo-query-keys";
import { DemoAccountNotice } from "@/components/features/onboarding/DemoAccountNotice";
import {
  ONBOARDING_ROUTES,
  SKIPPED_DASHBOARD,
} from "@/components/features/onboarding/onboarding-progress";
import { OnboardingPanel } from "@/components/features/onboarding/OnboardingPanel";
import { OnboardingSplitLayout } from "@/components/features/onboarding/OnboardingSplitLayout";
import { PreparationErrorPanel } from "@/components/features/onboarding/PreparationErrorPanel";
import { PreparationPanel } from "@/components/features/onboarding/PreparationPanel";
import { useDemoAccount } from "@/components/features/onboarding/useDemoAccount";
import { useRouter } from "@/i18n/navigation";
import { prepareDemoSummary } from "@/lib/api/mock-account";

export function PreparationFlow({
  errorBrand,
  partnerLogoLabel,
}: {
  errorBrand: React.ReactNode;
  partnerLogoLabel: string;
}) {
  const t = useTranslations("onboarding.step07.unavailable");
  const availability = useDemoAccount();
  const router = useRouter();
  const client = useQueryClient();
  const preparation = useQuery({
    queryKey: demoQueryKeys.preparation,
    queryFn: prepareDemoSummary,
    enabled: availability === "ready",
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (availability === "ready" && preparation.isSuccess) {
      router.replace(
        allDemoBaselineSkipped(client) ? SKIPPED_DASHBOARD : ONBOARDING_ROUTES.summary,
      );
    }
  }, [availability, client, preparation.isSuccess, router]);

  if (availability === "disabled" || availability === "missing" || availability === "error") {
    return (
      <OnboardingSplitLayout brand={errorBrand}>
        <OnboardingPanel eyebrow={t("eyebrow")} title={t("title")}>
          {availability !== "disabled" && <p role="status">{t(availability)}</p>}
          <DemoAccountNotice
            availability={availability}
            unavailable={t("disabled")}
            linkVariant="outline"
          />
        </OnboardingPanel>
      </OnboardingSplitLayout>
    );
  }

  if (preparation.isError && !preparation.isFetching) {
    return (
      <OnboardingSplitLayout brand={errorBrand}>
        <PreparationErrorPanel
          dashboardHref={demoDashboardHref(client)}
          onRetry={() => {
            void preparation.refetch();
          }}
        />
      </OnboardingSplitLayout>
    );
  }

  return <PreparationPanel partnerLogoLabel={partnerLogoLabel} />;
}
