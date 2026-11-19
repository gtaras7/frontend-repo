import Image from "next/image";
import { useTranslations } from "next-intl";

import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { OnboardingPartnerLogo } from "@/components/features/onboarding/OnboardingPartnerLogo";
import { setupStyles } from "@/components/features/onboarding/setup-styles";
import { SkeletonList } from "@/components/ui/03-feedback/SkeletonList";
import { colors, spacing, typography } from "@/design-tokens/tokens";

const spinnerMotion = `
@media (prefers-reduced-motion: no-preference) {
  .cg-preparation-spinner { animation: cg-preparation-spin 1s linear infinite; }
}
@keyframes cg-preparation-spin { to { transform: rotate(360deg); } }
`;

export function PreparationPanel({ partnerLogoLabel }: { partnerLogoLabel: string }) {
  const t = useTranslations("onboarding.step07");

  return (
    <main style={styles.center}>
      <style href="cardioguard-preparation-spinner" precedence="components">
        {spinnerMotion}
      </style>
      <OnboardingPartnerLogo label={partnerLogoLabel} cornerRadius={spacing[5]} />
      <Image
        className="cg-preparation-spinner"
        src="/onboarding/preparation-spinner.svg"
        alt=""
        width={spacing[10]}
        height={spacing[10]}
        unoptimized
        loading="eager"
      />
      <h1 style={styles.title}>{t("title")}</h1>
      <p style={styles.body}>{t("body")}</p>
      <SkeletonList rows={["100%", "100%", "100%", "100%", "66.6667%"]} style={styles.skeleton} />
      <p role="status" style={styles.status}>
        {t("status")}
      </p>
    </main>
  );
}

const styles = {
  center: {
    minHeight: "100dvh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[6],
    padding: spacing[6],
    backgroundColor: colors.surfacePage,
  },
  title: {
    margin: 0,
    ...typography.textLgSemibold,
    fontSize: 24, // Drift W24: Figma's preparation heading.
    lineHeight: 1.2,
    textAlign: "center",
  },
  // Drift W24: Figma gives the intro a 480px × 48px slot that can grow with copy.
  body: { ...setupStyles.body, width: "100%", maxWidth: 480, minHeight: spacing[12] },
  // Drift W24: the 420px skeleton aligns independently of the intro.
  skeleton: { width: "100%", maxWidth: 420, marginTop: spacing[10], marginBottom: spacing[8] },
  status: {
    ...onboardingStyles.footnote,
    ...typography.textSm,
    lineHeight: 1.2,
    textAlign: "center",
  },
} satisfies Record<string, React.CSSProperties>;
