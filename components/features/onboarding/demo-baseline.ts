import type { QueryClient } from "@tanstack/react-query";

import { demoQueryKeys } from "@/components/features/onboarding/demo-query-keys";
import {
  ONBOARDING_ROUTES,
  SKIPPED_DASHBOARD,
} from "@/components/features/onboarding/onboarding-progress";
import type { BaselineAnswerFor, BaselineStep } from "@/lib/onboarding/baseline-answers";

export function readDemoBaseline(client: QueryClient) {
  function answer<Step extends BaselineStep>(step: Step) {
    return client.getQueryData<BaselineAnswerFor<Step>>(demoQueryKeys.answer(step));
  }

  return {
    age: answer("age"),
    health: answer("health"),
    lifestyle: answer("lifestyle"),
    goals: answer("goals"),
  };
}

export function allDemoBaselineSkipped(client: QueryClient) {
  const answers = readDemoBaseline(client);
  return Object.values(answers).every((answer) => answer?.status === "missing");
}

export function demoDashboardHref(client: QueryClient) {
  return allDemoBaselineSkipped(client) ? SKIPPED_DASHBOARD : ONBOARDING_ROUTES.firstRunDashboard;
}
