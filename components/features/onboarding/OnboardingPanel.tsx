import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";

interface OnboardingPanelProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}

export function OnboardingPanel({ eyebrow, title, children }: OnboardingPanelProps) {
  return (
    <section style={onboardingStyles.stack}>
      <p style={onboardingStyles.eyebrow}>{eyebrow}</p>
      <h1 style={onboardingStyles.title}>{title}</h1>
      {children}
    </section>
  );
}
