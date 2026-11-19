import { getTranslations } from "next-intl/server";

import {
  getOnboardingStep,
  ONBOARDING_TOTAL_STEPS,
} from "@/components/features/onboarding/onboarding-progress";
import { OnboardingPartnerLogo } from "@/components/features/onboarding/OnboardingPartnerLogo";
import { ProgressDotsForRoute } from "@/components/features/onboarding/ProgressDotsForRoute";
import { ProgressDots } from "@/components/ui/03-feedback/ProgressDots";
import { BrandFooter } from "@/components/ui/04-navigation/BrandFooter";
import { AssetIcon } from "@/components/ui/AssetIcon";
import { colors, px, spacing, typography } from "@/design-tokens/tokens";

export async function BrandPanel({ route }: { route?: string }) {
  const t = await getTranslations("brand");
  const onboarding = await getTranslations("onboarding");
  const step = route === undefined ? undefined : getOnboardingStep(route);
  const usesFigmaIndicator = step !== undefined;

  return (
    <aside style={styles.brandPanel}>
      {usesFigmaIndicator ? (
        <OnboardingPartnerLogo label={t("partnerLogoAlt")} />
      ) : (
        <AssetIcon name="partner-logo-dark" width={200} height={73} label={t("partnerLogoAlt")} />
      )}
      <div style={styles.logoSpacing} aria-hidden="true" />
      <p style={usesFigmaIndicator ? { ...styles.wordmark, lineHeight: 1.2 } : styles.wordmark}>
        {t("wordmark")}
      </p>
      <div
        style={usesFigmaIndicator ? { height: spacing[2] } : styles.taglineSpacing}
        aria-hidden="true"
      />
      <p style={usesFigmaIndicator ? { ...styles.tagline, lineHeight: 1.2 } : styles.tagline}>
        {t("tagline")}
      </p>
      <div style={styles.progressSpacing} aria-hidden="true" />
      {usesFigmaIndicator ? (
        <ProgressDots
          step={step}
          total={ONBOARDING_TOTAL_STEPS}
          label={onboarding("progressLabel", { step, total: ONBOARDING_TOTAL_STEPS })}
        />
      ) : (
        <ProgressDotsForRoute />
      )}
      <div style={styles.footerSpacing} aria-hidden="true" />
      <BrandFooter lines={[t("privacyLine1"), t("privacyLine2")]} />
    </aside>
  );
}

const styles = {
  brandPanel: {
    display: "flex",
    width: "clamp(320px, 55.6%, 800px)",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    // Drift W13: authored 88/96/56px padding compresses on narrow viewports.
    padding: "clamp(48px, 6.11vw, 88px) clamp(32px, 6.67vw, 96px) clamp(32px, 3.89vw, 56px)",
  },
  logoSpacing: { height: spacing[8] },
  wordmark: {
    margin: 0,
    color: colors.textPrimary,
    ...typography.display2xlBold,
  },
  taglineSpacing: { height: px(2) },
  tagline: {
    margin: 0,
    color: colors.textSecondary,
    ...typography.textLgSemibold,
    fontWeight: 400,
  },
  // Drift W14: Figma has an approximately 300px elastic spacer.
  progressSpacing: { flexGrow: 1, minHeight: spacing[12], maxHeight: 300 },
  footerSpacing: { height: spacing[12] },
} satisfies Record<string, React.CSSProperties>;
