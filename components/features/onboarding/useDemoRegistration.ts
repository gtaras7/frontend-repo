"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

import { demoQueryKeys } from "@/components/features/onboarding/demo-query-keys";
import {
  ONBOARDING_ROUTES,
  ONBOARDING_TRANSITIONS,
} from "@/components/features/onboarding/onboarding-progress";
import { useRouter } from "@/i18n/navigation";
import { createDemoAccount, isDemoAccountError } from "@/lib/api/mock-account";

export function useDemoRegistration(onCreated: () => void) {
  const client = useQueryClient();
  const router = useRouter();
  const started = useRef(false);
  const mutation = useMutation({
    mutationFn: createDemoAccount,
    retry: false,
    gcTime: 0,
    onSuccess(user) {
      client.removeQueries({ queryKey: demoQueryKeys.profile });
      client.setQueryData(demoQueryKeys.account, user);
    },
    onSettled() {
      started.current = false;
    },
  });

  function start() {
    if (started.current) return;
    started.current = true;
    mutation.mutate(undefined, {
      onSuccess() {
        onCreated();
        router.push(ONBOARDING_TRANSITIONS[ONBOARDING_ROUTES.register].to);
      },
    });
  }

  return {
    start,
    reset: mutation.reset,
    isPending: mutation.isPending,
    isError: mutation.isError,
    duplicateEmail: isDemoAccountError(mutation.error, "duplicateEmail"),
  };
}
