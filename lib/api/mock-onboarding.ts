/**
 * Local/E2E onboarding stubs. Opt-in only — never the production default.
 *
 * Set `NEXT_PUBLIC_MOCK_ONBOARDING=1` in `.env.local` (or Playwright) while NestJS
 * endpoints are unavailable. Production always disables mocks. Bootstrap/consent
 * use their existing real API paths; account/baseline stay unavailable pending contracts.
 */
export function isOnboardingMockEnabled(): boolean {
  return process.env.NEXT_PUBLIC_MOCK_ONBOARDING === "1" && process.env.NODE_ENV !== "production";
}
