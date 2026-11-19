import { ApiError, apiFetch } from "@/lib/api/client";
import { isOnboardingMockEnabled } from "@/lib/api/mock-onboarding";

/**
 * Consent submission — step 03. GDPR SURFACE.
 *
 * Backend owns validation and durable consent records for the pending
 * NestJS `POST /onboarding/consent` contract.
 *
 * E2E sets `cardioguard.mock.consentFail` to "1" to exercise rejection with
 * both statements checked. The UI gate (D3) prevents incomplete submissions.
 */
export interface ConsentPayload {
  notADoctor: boolean;
  notForEmergencies: boolean;
}

export function canContinue(c: ConsentPayload): boolean {
  return c.notADoctor && c.notForEmergencies;
}

export async function submitConsent(payload: ConsentPayload): Promise<void> {
  if (!isOnboardingMockEnabled()) {
    await apiFetch<unknown>("/onboarding/consent", { method: "POST", json: payload });
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!canContinue(payload)) {
    throw new ApiError(422, "Both consent statements are required", payload);
  }

  const forceFail =
    typeof window !== "undefined" &&
    window.sessionStorage.getItem("cardioguard.mock.consentFail") === "1";
  if (forceFail) {
    throw new ApiError(422, "Mock: forced consent rejection", payload);
  }
}
