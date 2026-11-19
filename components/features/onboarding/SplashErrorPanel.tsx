"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { Button } from "@/components/ui/01-actions/Button";
import { AssetIcon } from "@/components/ui/AssetIcon";
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export function SplashErrorPanel({ onRetry }: { onRetry: () => Promise<void> }) {
  const t = useTranslations("onboarding.step01.error");
  const retryRef = useRef<HTMLButtonElement>(null);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (!retrying) retryRef.current?.focus();
  }, [retrying]);

  return (
    <div style={styles.panel}>
      <div style={styles.warningIcon}>
        <AssetIcon name="warning" size={32} />
      </div>
      <div role="alert" aria-live="assertive" style={styles.errorCopy}>
        <h1 style={styles.title}>{t("title")}</h1>
        <p style={styles.body}>{t("body")}</p>
      </div>
      <Button
        ref={retryRef}
        size="lg"
        loading={retrying}
        onClick={() => {
          setRetrying(true);
          void onRetry().finally(() => {
            setRetrying(false);
          });
        }}
        style={styles.retryButton}
      >
        {t("retry")}
      </Button>
      <a href="mailto:support@cardioguard.example" style={styles.supportLink}>
        {t("support")}
      </a>
      <p style={onboardingStyles.footnote}>{t("a11yNote")}</p>
    </div>
  );
}

const styles = {
  panel: { ...onboardingStyles.spaciousStack, alignItems: "flex-start" },
  warningIcon: {
    display: "flex",
    width: spacing[16],
    height: spacing[16],
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.lg,
    backgroundColor: colors.status.warningLight,
    color: colors.status.warning,
  },
  errorCopy: {
    display: "flex",
    flexDirection: "column",
    gap: px(spacing[2]),
  },
  title: {
    margin: 0,
    color: colors.textPrimary,
    ...typography.textXlBold,
    fontSize: 28, // Drift W8: Figma splash-error heading is off-scale.
  },
  body: { ...onboardingStyles.intro, maxWidth: onboardingStyles.stack.maxWidth },
  // Drift W9: Figma retry action is narrower than the welcome actions.
  retryButton: { width: 360, minHeight: 56 },
  supportLink: {
    color: colors.primary,
    ...typography.text14,
    textDecoration: "none",
  },
} satisfies Record<string, React.CSSProperties>;
