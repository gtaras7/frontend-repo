import { SplashFlow } from "@/components/features/onboarding/SplashFlow";

/**
 * Onboarding step 01 — Splash (`Web / 01 Splash`, Figma node 407:103).
 *
 * TODO(consent plan D1/D2): once NestJS ships `GET /onboarding/progress`, a
 * deep link to a later step must redirect to the furthest incomplete step —
 * this page is the entry of that state machine. Do not add the gate here
 * unilaterally; the shape of the progress endpoint is a Backend decision.
 */
export default function OnboardingPage() {
  return <SplashFlow />;
}
