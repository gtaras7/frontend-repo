import { OnboardingQueryProvider } from "@/components/features/onboarding/OnboardingQueryProvider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <OnboardingQueryProvider>{children}</OnboardingQueryProvider>;
}
