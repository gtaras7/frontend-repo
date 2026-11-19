import { isOnboardingMockEnabled } from "@/lib/api/mock-onboarding";
import {
  type BaselineAnswerFor,
  type BaselineStep,
  isValidHeight,
} from "@/lib/onboarding/baseline-answers";

export const DEMO_ACCOUNT_MARKER = "cardioguard.demo.account";
export const DEMO_REGISTRATION_SCENARIO = "cardioguard.mock.registration";
export const DEMO_AGE_FAILURE = "cardioguard.mock.ageFail";
export const DEMO_HEIGHT_FAILURE = "cardioguard.mock.heightFail";
export const DEMO_PREPARATION_FAILURE = "cardioguard.mock.preparationFail";
export const DEMO_DASHBOARD_FAILURE = "cardioguard.mock.dashboardFail";
export const DEMO_INVALID_HEIGHT = 340;

export interface DemoPermissionChoices {
  reminders: boolean;
}

// A synthetic fixture. The mock takes no credentials and grants no access rights.
const DEMO_USER = { id: "demo-user-001", email: "demo@cardioguard.example" } as const;

type DemoErrorCode =
  "disabled" | "storage" | "duplicateEmail" | "unavailable" | "noDemo" | "invalidHeight";

class DemoAccountError extends Error {
  constructor(readonly code: DemoErrorCode) {
    super(`Demo onboarding: ${code}`);
    this.name = "DemoAccountError";
  }
}

export function isDemoAccountError(error: Error | null, code: DemoErrorCode): boolean {
  return error instanceof DemoAccountError && error.code === code;
}

function withDemoStorage<T>(action: (storage: Storage) => T): T {
  if (!isOnboardingMockEnabled() || typeof window === "undefined") {
    throw new DemoAccountError("disabled");
  }
  try {
    return action(window.sessionStorage);
  } catch {
    throw new DemoAccountError("storage");
  }
}

function readMarker(key: string): string | null {
  return withDemoStorage((storage) => storage.getItem(key));
}

function simulateLatency(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getDemoAccount() {
  return readMarker(DEMO_ACCOUNT_MARKER) === "1" ? DEMO_USER : null;
}

export async function createDemoAccount() {
  const scenario = readMarker(DEMO_REGISTRATION_SCENARIO);
  await simulateLatency(500);
  if (scenario === "duplicate-email") throw new DemoAccountError("duplicateEmail");
  if (scenario === "unavailable") throw new DemoAccountError("unavailable");
  withDemoStorage((storage) => {
    storage.setItem(DEMO_ACCOUNT_MARKER, "1");
  });
  return DEMO_USER;
}

const validateBaseline: {
  [Step in BaselineStep]?: (answer: BaselineAnswerFor<Step>) => void;
} = {
  health(answer) {
    if (answer.status === "missing") return;
    const height = answer.value.height;
    const rejected =
      height.status === "reported"
        ? !isValidHeight(height.value)
        : readMarker(DEMO_HEIGHT_FAILURE) === "1";
    if (rejected) throw new DemoAccountError("invalidHeight");
  },
};

/** Baseline answers stay in the caller’s memory and never enter browser storage. */
export async function saveDemoBaseline<Step extends BaselineStep>(
  step: Step,
  answer: BaselineAnswerFor<Step>,
): Promise<BaselineAnswerFor<Step>> {
  if (!getDemoAccount()) throw new DemoAccountError("noDemo");
  const ageRejected = step === "age" && readMarker(DEMO_AGE_FAILURE) === "1";
  await simulateLatency(400);
  if (ageRejected) throw new DemoAccountError("unavailable");
  validateBaseline[step]?.(answer);
  return answer;
}

/** Demo preferences stay in memory and never request access to external services. */
export async function saveDemoPermissions(choices: DemoPermissionChoices) {
  if (!getDemoAccount()) throw new DemoAccountError("noDemo");
  await simulateLatency(400);
  return choices;
}

export async function prepareDemoSummary() {
  if (!getDemoAccount()) throw new DemoAccountError("noDemo");
  const rejected = readMarker(DEMO_PREPARATION_FAILURE) === "1";
  await simulateLatency(800);
  if (rejected) throw new DemoAccountError("unavailable");
  return true;
}

export async function loadDemoDashboard() {
  if (!getDemoAccount()) throw new DemoAccountError("noDemo");
  const rejected = readMarker(DEMO_DASHBOARD_FAILURE) === "1";
  await simulateLatency(500);
  if (rejected) throw new DemoAccountError("unavailable");
  return true;
}

export function resetDemoAccount(): void {
  withDemoStorage((storage) => {
    for (const key of [
      DEMO_ACCOUNT_MARKER,
      DEMO_REGISTRATION_SCENARIO,
      DEMO_AGE_FAILURE,
      DEMO_HEIGHT_FAILURE,
      DEMO_PREPARATION_FAILURE,
      DEMO_DASHBOARD_FAILURE,
    ]) {
      storage.removeItem(key);
    }
  });
}
