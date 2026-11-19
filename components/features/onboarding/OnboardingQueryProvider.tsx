"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import { demoQueryKeys } from "@/components/features/onboarding/demo-query-keys";

export function OnboardingQueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => {
    const queryClient = new QueryClient();
    queryClient.setQueryDefaults(demoQueryKeys.baseline, { gcTime: Infinity });
    queryClient.setQueryDefaults(demoQueryKeys.permissions, { gcTime: Infinity });
    return queryClient;
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
