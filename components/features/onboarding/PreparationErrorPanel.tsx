import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { OnboardingPartnerLogo } from "@/components/features/onboarding/OnboardingPartnerLogo";
import { setupStyles } from "@/components/features/onboarding/setup-styles";
import { Button, ButtonLink } from "@/components/ui/01-actions/Button";
import { colors, spacing, typography } from "@/design-tokens/tokens";

export function PreparationErrorPanel({
  dashboardHref,
  onRetry,
}: {
  dashboardHref: React.ComponentProps<typeof ButtonLink>["href"];
  onRetry: () => void;
}) {
  const t = useTranslations("onboarding.step07.error");
  const retry = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    retry.current?.focus();
  }, []);

  return (
    <section style={onboardingStyles.stack}>
      <div style={styles.logoRow}>
        <OnboardingPartnerLogo cornerRadius={spacing[4]} />
      </div>
      <div role="alert" aria-live="assertive" style={onboardingStyles.stack}>
        <h1 style={styles.title}>{t("title")}</h1>
        <p style={setupStyles.body}>{t("body")}</p>
      </div>
      <Button ref={retry} size="lg" fullWidth style={setupStyles.primary} onClick={onRetry}>
        {t("retry")}
      </Button>
      <ButtonLink href={dashboardHref} variant="outline" fullWidth style={setupStyles.outline}>
        {t("dashboard")}
      </ButtonLink>
    </section>
  );
}

const styles = {
  logoRow: { display: "flex", justifyContent: "center" },
  title: {
    margin: 0,
    color: colors.textPrimary,
    ...typography.textLgSemibold,
    fontSize: 28, // Drift W26: Figma's preparation error heading.
    lineHeight: 1.2,
  },
} satisfies Record<string, React.CSSProperties>;
