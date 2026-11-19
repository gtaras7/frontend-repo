import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";

export const setupStyles = {
  body: { ...onboardingStyles.intro, lineHeight: 1.2 },
  // Drift W25: these frames use 52px / 45px action instances.
  primary: { minHeight: 52, whiteSpace: "normal", textAlign: "center" },
  outline: { minHeight: 45, whiteSpace: "normal", textAlign: "center" },
} satisfies Record<string, React.CSSProperties>;
