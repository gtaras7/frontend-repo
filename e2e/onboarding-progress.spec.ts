import { expect, test } from "@playwright/test";

import {
  getOnboardingStep,
  ONBOARDING_TOTAL_STEPS,
} from "../components/features/onboarding/onboarding-progress";

test("onboarding branches and future screens keep their documented step", () => {
  expect(ONBOARDING_TOTAL_STEPS).toBe(9);
  expect(getOnboardingStep("/register")).toBe(4);
  expect(getOnboardingStep("/onboarding/guest")).toBe(4);
  for (const screen of ["age", "health", "lifestyle", "goals", "health/validation"]) {
    expect(getOnboardingStep(`/onboarding/baseline/${screen}`)).toBe(5);
  }
  expect(getOnboardingStep("/onboarding/permissions")).toBe(6);
  expect(getOnboardingStep("/onboarding/preparation")).toBe(7);
  expect(getOnboardingStep("/onboarding/preparation/error")).toBe(7);
  expect(getOnboardingStep("/onboarding/summary")).toBe(8);
  expect(getOnboardingStep("/dashboard")).toBe(9);
  expect(getOnboardingStep("/register/")).toBe(4);
});

test("unknown routes never fall back to step one or match partial path segments", () => {
  for (const route of ["/settings", "/onboarding/unknown", "/register-extra", "/dashboard-extra"]) {
    expect(getOnboardingStep(route)).toBeUndefined();
  }
});
