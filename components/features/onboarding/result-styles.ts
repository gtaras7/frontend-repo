import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { colors, spacing, typography } from "@/design-tokens/tokens";

export const resultStyles = {
  // Drift W27: 528px of content after the two 56px insets.
  stack: { ...onboardingStyles.stack, maxWidth: 528, gap: spacing[4] },
  // Drift W28: the three result frames use a 28px heading.
  title: { ...onboardingStyles.title, fontSize: 28 },
  intro: { ...onboardingStyles.intro, ...typography.textMd, lineHeight: 1.2 },
  sectionTitle: {
    ...typography.text16Semibold,
    margin: 0,
    color: colors.textPrimary,
    lineHeight: 1.2,
  },
  list: { display: "flex", flexDirection: "column", gap: spacing[3] },
  // Drift W29: Figma's action cards are 177px tall. Min-height allows long copy to wrap.
  item: { minHeight: 177 },
} satisfies Record<string, React.CSSProperties>;
