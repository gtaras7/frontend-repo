"use client";

import { useTranslations } from "next-intl";

import {
  ONBOARDING_ROUTES,
  ONBOARDING_TRANSITIONS,
} from "@/components/features/onboarding/onboarding-progress";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { ButtonLink } from "@/components/ui/01-actions/Button";
import { AssetIcon } from "@/components/ui/AssetIcon";
import { colors, px, spacing, typography } from "@/design-tokens/tokens";

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div style={styles.feature}>
      <div style={styles.featureIcon}>{icon}</div>
      <div style={styles.featureCopy}>
        <p style={styles.featureTitle}>{title}</p>
        <p style={styles.featureBody}>{body}</p>
      </div>
    </div>
  );
}

const FEATURES = [
  { key: "numbers", icon: "numbers" },
  { key: "data", icon: "data" },
  { key: "habits", icon: "habits" },
  { key: "notMedical", icon: "shield-splash" },
] as const;

export function SplashPanel() {
  const t = useTranslations("onboarding.step01");
  const tOnboarding = useTranslations("onboarding");

  return (
    <div style={onboardingStyles.spaciousStack}>
      <h1 style={styles.title}>{t("whyTitle")}</h1>
      {FEATURES.map(({ key, icon }) => (
        <Feature
          key={key}
          icon={<AssetIcon name={icon} size={24} />}
          title={t(`features.${key}.title`)}
          body={t(`features.${key}.body`)}
        />
      ))}

      <ButtonLink
        href={ONBOARDING_TRANSITIONS[ONBOARDING_ROUTES.splash].to}
        variant="primary"
        size="lg"
        style={styles.continueLink}
      >
        {tOnboarding("continue")}
      </ButtonLink>
    </div>
  );
}

const styles = {
  feature: { display: "flex", alignItems: "center", gap: px(spacing[4]) },
  featureIcon: {
    display: "flex",
    width: spacing[12],
    height: spacing[12],
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    color: colors.primary,
  },
  featureCopy: { display: "flex", flexDirection: "column", gap: px(spacing[1]) },
  featureTitle: {
    margin: 0,
    color: colors.textPrimary,
    ...typography.text16Semibold,
  },
  featureBody: { margin: 0, color: colors.textSecondary, ...typography.text14 },
  title: {
    margin: 0,
    marginBottom: px(spacing[1]),
    color: colors.textPrimary,
    ...typography.textLgSemibold,
    fontSize: 24, // Drift W10: Figma splash heading is off-scale.
    lineHeight: 1.2,
  },
  // Drift W6: human-requested Continue action is absent from the Figma splash.
  continueLink: { ...onboardingStyles.fixedAction, marginTop: px(spacing[2]) },
} satisfies Record<string, React.CSSProperties>;
