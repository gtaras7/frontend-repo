"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { BaselineActions } from "@/components/features/onboarding/BaselineActions";
import { BaselineRadioGroup } from "@/components/features/onboarding/BaselineRadioGroup";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import {
  useDemoBaseline,
  useResetDemoBaseline,
} from "@/components/features/onboarding/useDemoBaseline";
import { Button } from "@/components/ui";
import { AGE_BANDS, type AgeBand } from "@/lib/onboarding/baseline-answers";

export function BaselineAgeForm() {
  const t = useTranslations("onboarding.step05.age");
  const { availability, report, skip, error, pending, saved } = useDemoBaseline("age");
  const reset = useResetDemoBaseline();
  const [selected, setSelected] = useState<AgeBand | undefined>(() =>
    saved?.status === "reported" ? saved.value : undefined,
  );

  return (
    <>
      <p style={onboardingStyles.intro}>{t("intro")}</p>
      <BaselineRadioGroup
        name="demo-age-band"
        label={t("optionsLabel")}
        options={AGE_BANDS}
        getLabel={(value) => t(`options.${value}`)}
        selected={selected}
        disabled={pending !== undefined || reset.isPending}
        onChange={setSelected}
      />
      <BaselineActions
        availability={availability}
        canContinue={selected !== undefined}
        failed={error !== null || reset.isError}
        pending={pending}
        disabled={reset.isPending}
        onContinue={() => {
          if (selected !== undefined) report(selected);
        }}
        onSkip={() => {
          skip(() => {
            setSelected(undefined);
          });
        }}
      />
      <p style={onboardingStyles.footnote}>{t("footnote")}</p>
      {availability !== "disabled" && <p style={onboardingStyles.footnote}>{t("demoNote")}</p>}
      {availability === "ready" && (
        <Button
          variant="secondary"
          size="sm"
          disabled={pending !== undefined || reset.isPending}
          onClick={() => {
            reset.mutate();
          }}
        >
          {t("resetDemo")}
        </Button>
      )}
    </>
  );
}
