"use client";

import { useTranslations } from "next-intl";

import {
  getOnboardingArrows,
  getOnboardingStep,
  ONBOARDING_TOTAL_STEPS,
} from "@/components/features/onboarding/onboarding-progress";
import { IconButton, ProgressDots } from "@/components/ui";
import { AssetIcon } from "@/components/ui/AssetIcon";
import { colors, px, radius, spacing } from "@/design-tokens/tokens";
import { Link, usePathname } from "@/i18n/navigation";

function StepArrow({
  href,
  icon,
  label,
}: {
  href?: string;
  icon: "chevron-left" | "chevron-right";
  label: string;
}) {
  const glyph = <AssetIcon name={icon} size={16} />;
  return href === undefined ? (
    <IconButton icon={glyph} label={label} disabled style={arrowSize} />
  ) : (
    <Link href={href} aria-label={label} style={styles.stepLink}>
      {glyph}
    </Link>
  );
}

export function ProgressDotsForRoute() {
  const t = useTranslations("onboarding");
  const pathname = usePathname();
  const step = getOnboardingStep(pathname);
  if (step === undefined) return null;

  const { previous, next } = getOnboardingArrows(pathname);
  return (
    <div style={styles.navigation}>
      <StepArrow href={previous} icon="chevron-left" label={t("goBack")} />
      <ProgressDots
        step={step}
        total={ONBOARDING_TOTAL_STEPS}
        label={t("progressLabel", { step, total: ONBOARDING_TOTAL_STEPS })}
      />
      <StepArrow href={next} icon="chevron-right" label={t("goForward")} />
    </div>
  );
}

// Drift W7: human-requested 32px step controls are absent from the Figma indicator.
const arrowSize = { width: 32, height: 32 };

const styles = {
  navigation: { display: "flex", alignItems: "center", gap: px(spacing[2]) },
  stepLink: {
    ...arrowSize,
    padding: 0,
    border: 0,
    borderRadius: radius.full,
    backgroundColor: colors.grey100,
    color: colors.textSecondary,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  },
} satisfies Record<string, React.CSSProperties>;
