import type { BaselineStep } from "@/lib/onboarding/baseline-answers";

const root = ["onboarding-demo"] as const;
const profile = [...root, "profile"] as const;
const baseline = [...profile, "baseline"] as const;
const results = [...profile, "results"] as const;

export const demoQueryKeys = {
  root,
  account: [...root, "account"] as const,
  profile,
  results,
  permissions: [...profile, "permissions"] as const,
  preparation: [...results, "preparation"] as const,
  dashboard: [...results, "dashboard"] as const,
  baseline,
  answer: (step: BaselineStep) => [...baseline, step] as const,
};
