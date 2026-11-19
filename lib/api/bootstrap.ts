import { apiFetch } from "@/lib/api/client";
import { isOnboardingMockEnabled } from "@/lib/api/mock-onboarding";

/**
 * Onboarding session bootstrap — step 01.
 *
 * Backend owns the pending NestJS `POST /onboarding/bootstrap` contract.
 *
 * The bootstrap response will carry the furthest incomplete step so the page
 * can enforce the deep-link redirect rule from the handoff doc (D1/D2).
 */
export interface BootstrapResult {
  furthestIncompleteStep: number;
}

export async function bootstrapSession(): Promise<BootstrapResult> {
  if (!isOnboardingMockEnabled()) {
    return apiFetch<BootstrapResult>("/onboarding/bootstrap", {
      method: "POST",
    });
  }
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { furthestIncompleteStep: 1 };
}
