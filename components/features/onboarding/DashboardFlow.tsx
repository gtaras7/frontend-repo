"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { readDemoBaseline } from "@/components/features/onboarding/demo-baseline";
import { demoQueryKeys } from "@/components/features/onboarding/demo-query-keys";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { OnboardingSplitLayout } from "@/components/features/onboarding/OnboardingSplitLayout";
import { resultStyles } from "@/components/features/onboarding/result-styles";
import { setupStyles } from "@/components/features/onboarding/setup-styles";
import { useDemoAccount } from "@/components/features/onboarding/useDemoAccount";
import { Button, ButtonLink, Callout, ListItem } from "@/components/ui";
import { colors, spacing } from "@/design-tokens/tokens";
import { APP_PATHS } from "@/i18n/app-paths";
import { loadDemoDashboard } from "@/lib/api/mock-account";

export function DashboardFlow({ brand, skipped }: { brand: React.ReactNode; skipped: boolean }) {
  const availability = useDemoAccount();
  const dashboard = useQuery({
    queryKey: demoQueryKeys.dashboard,
    queryFn: loadDemoDashboard,
    enabled: availability === "ready",
    retry: false,
    refetchOnWindowFocus: false,
  });
  const [retrying, setRetrying] = useState(false);

  if (dashboard.isError || retrying) {
    return (
      <OnboardingSplitLayout brand={brand}>
        <DashboardError
          retrying={retrying}
          onRetry={() => {
            setRetrying(true);
            void dashboard.refetch().finally(() => {
              setRetrying(false);
            });
          }}
        />
      </OnboardingSplitLayout>
    );
  }

  return (
    <OnboardingSplitLayout brand={brand} content="dashboard">
      <DashboardPanel skipped={skipped} />
    </OnboardingSplitLayout>
  );
}

function DashboardPanel({ skipped }: { skipped: boolean }) {
  const t = useTranslations("onboarding.step09");
  const next = useTranslations("onboarding.nextActions");
  const client = useQueryClient();
  const { health } = readDemoBaseline(client);
  const hasHeight =
    !skipped && health?.status === "reported" && health.value.height.status === "reported";

  return (
    <section style={resultStyles.stack}>
      <h1 style={resultStyles.title}>{t("title")}</h1>
      {!skipped && <p style={resultStyles.intro}>{t("intro")}</p>}
      <Callout
        title={t(skipped ? "skipped.title" : "ready.title")}
        icon={
          <Image src="/onboarding/dashboard-info.svg" width={20} height={20} alt="" unoptimized />
        }
      >
        {t(skipped ? "skipped.body" : "ready.body")}
      </Callout>
      <h2 style={resultStyles.sectionTitle}>{t(skipped ? "skipped.next" : "next")}</h2>
      <div style={resultStyles.list}>
        <ListItem
          title={next("profile.title")}
          description={next(hasHeight ? "profile.weight" : "profile.heightWeight")}
          style={resultStyles.item}
        />
        <ListItem
          title={next("habit.title")}
          description={next("habit.body")}
          style={resultStyles.item}
        />
        <ListItem
          title={next("education.title")}
          description={next("education.body")}
          style={resultStyles.item}
        />
      </div>
      {!skipped && <p style={onboardingStyles.footnote}>{t("footnote")}</p>}
      <ButtonLink
        href={skipped ? APP_PATHS.chat : APP_PATHS.reminders}
        size="lg"
        fullWidth
        style={setupStyles.primary}
      >
        {t(skipped ? "skipped.continue" : "startHabit")}
      </ButtonLink>
    </section>
  );
}

function DashboardError({ onRetry, retrying }: { onRetry: () => void; retrying: boolean }) {
  const t = useTranslations("onboarding.step09.error");
  const retry = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!retrying) retry.current?.focus();
  }, [retrying]);

  return (
    <section style={onboardingStyles.stack}>
      <div style={styles.icon}>
        <Image
          src="/onboarding/dashboard-alert.svg"
          width={spacing[8]}
          height={spacing[8]}
          alt=""
          unoptimized
        />
      </div>
      <div role="alert" aria-live="assertive" style={onboardingStyles.stack}>
        <h1 style={styles.errorTitle}>{t("title")}</h1>
        <p style={setupStyles.body}>{t("body")}</p>
      </div>
      <Button
        ref={retry}
        size="lg"
        fullWidth
        loading={retrying}
        loadingLabel={t("retrying")}
        style={setupStyles.primary}
        onClick={onRetry}
      >
        {t("retry")}
      </Button>
    </section>
  );
}

const styles = {
  icon: {
    display: "grid",
    placeItems: "center",
    width: spacing[16],
    height: spacing[16],
    borderRadius: spacing[4], // Drift W30: 16px Figma icon tile radius.
    backgroundColor: colors.status.dangerLight,
  },
  errorTitle: { ...resultStyles.title, fontWeight: 600 },
} satisfies Record<string, React.CSSProperties>;
