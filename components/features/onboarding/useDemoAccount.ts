"use client";

import { useQuery } from "@tanstack/react-query";

import { demoQueryKeys } from "@/components/features/onboarding/demo-query-keys";
import { getDemoAccount } from "@/lib/api/mock-account";
import { isOnboardingMockEnabled } from "@/lib/api/mock-onboarding";

export type DemoAccountAvailability = "disabled" | "loading" | "error" | "ready" | "missing";

export function useDemoAccount(): DemoAccountAvailability {
  const demo = isOnboardingMockEnabled();
  const account = useQuery({
    queryKey: demoQueryKeys.account,
    queryFn: getDemoAccount,
    enabled: demo,
    retry: false,
    staleTime: Infinity,
  });

  if (!demo) return "disabled";
  if (account.isPending) return "loading";
  if (account.isError) return "error";
  return account.data ? "ready" : "missing";
}
