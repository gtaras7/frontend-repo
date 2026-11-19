import { colors, px, spacing, typography } from "@/design-tokens/tokens";

const column = { display: "flex", flexDirection: "column" } as const;
const contentColumn = {
  ...column,
  width: "100%",
  maxWidth: 512, // Drift W16: shared onboarding content width.
} as const;

export const onboardingStyles = {
  stack: { ...contentColumn, gap: px(spacing[5]) },
  spaciousStack: { ...contentColumn, gap: px(spacing[6]) },
  eyebrow: { margin: 0, color: colors.textSecondary, ...typography.textSmSemibold },
  title: {
    margin: 0,
    color: colors.textPrimary,
    ...typography.display2xlBold,
    fontSize: 32, // Drift W2, W15, W18, W20 and W23: Figma onboarding headings.
    lineHeight: 1.2,
  },
  intro: { margin: 0, color: colors.textSecondary, ...typography.text16Semibold, fontWeight: 400 },
  footnote: { margin: 0, color: colors.textTertiary, ...typography.textXs },
  chips: { display: "flex", flexWrap: "wrap", gap: px(spacing[2.5]) },
  fixedAction: { width: 440, maxWidth: "100%" }, // Drift W4, W6 and W12.
  card: {
    ...column,
    gap: px(spacing[4]),
    padding: px(spacing[6]),
    backgroundColor: colors.surfacePage,
    borderRadius: 16, // Drift W11, W19 and W22: Figma onboarding cards.
  },
} satisfies Record<string, React.CSSProperties>;
