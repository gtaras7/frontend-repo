"use client";

import { useTranslations } from "next-intl";

import { DemoAccountNotice } from "@/components/features/onboarding/DemoAccountNotice";
import type { BaselineAvailability } from "@/components/features/onboarding/useDemoBaseline";
import { Button, Callout } from "@/components/ui";

interface BaselineActionsProps {
  availability: BaselineAvailability;
  canContinue: boolean;
  failed: boolean;
  pending: "reported" | "missing" | undefined;
  disabled?: boolean;
  onContinue: () => void;
  onSkip: () => void;
}

export function BaselineActions({
  availability,
  canContinue,
  failed,
  pending,
  disabled = false,
  onContinue,
  onSkip,
}: BaselineActionsProps) {
  const t = useTranslations("onboarding.step05.actions");
  const unavailable = disabled || availability !== "ready" || pending !== undefined;

  return (
    <>
      {(failed || availability === "error") && (
        <div aria-live="polite">
          <Callout tone="danger" title={t("error.title")}>
            {t("error.body")}
          </Callout>
        </div>
      )}
      <Button
        size="lg"
        fullWidth
        disabled={unavailable || !canContinue}
        loading={pending === "reported"}
        loadingLabel={t("saving")}
        onClick={onContinue}
      >
        {t("continue")}
      </Button>
      <Button
        variant="outline"
        size="md"
        fullWidth
        disabled={unavailable}
        loading={pending === "missing"}
        loadingLabel={t("saving")}
        onClick={onSkip}
      >
        {t("skip")}
      </Button>
      <DemoAccountNotice availability={availability} unavailable={t("unavailable")} />
    </>
  );
}
