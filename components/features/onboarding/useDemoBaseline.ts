"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

import { demoQueryKeys } from "@/components/features/onboarding/demo-query-keys";
import {
  ONBOARDING_ROUTES,
  ONBOARDING_TRANSITIONS,
} from "@/components/features/onboarding/onboarding-progress";
import {
  type DemoAccountAvailability,
  useDemoAccount,
} from "@/components/features/onboarding/useDemoAccount";
import { useRouter } from "@/i18n/navigation";
import { resetDemoAccount, saveDemoBaseline } from "@/lib/api/mock-account";
import type {
  BaselineAnswerFor,
  BaselineStep,
  BaselineValue,
} from "@/lib/onboarding/baseline-answers";

export type BaselineAvailability = DemoAccountAvailability;

interface SaveCallbacks {
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}

export function useDemoBaseline<Step extends BaselineStep>(step: Step) {
  const availability = useDemoAccount();
  const client = useQueryClient();
  const router = useRouter();
  const saving = useRef(false);
  const queryKey = demoQueryKeys.answer(step);
  const mutation = useMutation({
    mutationFn: (answer: BaselineAnswerFor<Step>) => saveDemoBaseline(step, answer),
    retry: false,
    gcTime: 0,
    onSuccess(answer) {
      client.setQueryData(queryKey, answer);
      client.removeQueries({ queryKey: demoQueryKeys.results });
    },
    onSettled() {
      saving.current = false;
    },
  });

  function save(answer: BaselineAnswerFor<Step>, callbacks?: SaveCallbacks) {
    if (availability !== "ready" || saving.current) return;
    saving.current = true;
    mutation.mutate(answer, {
      onError: callbacks?.onError,
      onSuccess() {
        callbacks?.onSuccess?.();
        router.push(ONBOARDING_TRANSITIONS[ONBOARDING_ROUTES[step]].to);
      },
    });
  }

  return {
    availability,
    report: (value: BaselineValue<Step>, callbacks?: SaveCallbacks) => {
      save({ status: "reported", value }, callbacks);
    },
    skip: (onSuccess: () => void) => {
      save({ status: "missing" }, { onSuccess });
    },
    error: mutation.error,
    pending: mutation.isPending ? mutation.variables.status : undefined,
    saved: mutation.data ?? client.getQueryData<BaselineAnswerFor<Step>>(queryKey),
  };
}

export function useResetDemoBaseline() {
  const client = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: () => {
      resetDemoAccount();
      return Promise.resolve();
    },
    onSuccess() {
      client.removeQueries({ queryKey: demoQueryKeys.root });
      router.replace(ONBOARDING_ROUTES.register);
    },
  });
}
