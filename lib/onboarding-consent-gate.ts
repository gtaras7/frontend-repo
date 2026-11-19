/**
 * Interim frontend consent gate until NestJS owns progress/auth (handoff D1/D2).
 *
 * Cookie value is a non-PHI boolean flag only ("1"). It is not a consent record,
 * not durable GDPR evidence, and must be replaced by a NestJS progress check
 * before any real-user staging. Human review required for the final gate.
 */
export const CONSENT_GATE_COOKIE = "cardioguard.onboarding.consent";

export function markConsentGatePassed(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${CONSENT_GATE_COOKIE}=1; Path=/; SameSite=Lax`;
}

export function hasConsentGatePassed(cookieValue: string | undefined): boolean {
  return cookieValue === "1";
}
