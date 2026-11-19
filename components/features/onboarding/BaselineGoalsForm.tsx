"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { BaselineActions } from "@/components/features/onboarding/BaselineActions";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { useDemoBaseline } from "@/components/features/onboarding/useDemoBaseline";
import { Chip } from "@/components/ui";
import { BASELINE_GOALS, type BaselineGoal } from "@/lib/onboarding/baseline-answers";

export function BaselineGoalsForm() {
  const t = useTranslations("onboarding.step05.goals");
  const { availability, report, skip, error, pending, saved } = useDemoBaseline("goals");
  const [selected, setSelected] = useState<readonly BaselineGoal[]>(() =>
    saved?.status === "reported" ? saved.value : [],
  );

  return (
    <>
      <p style={onboardingStyles.intro}>{t("intro")}</p>
      <div role="group" aria-label={t("eyebrow")} style={onboardingStyles.chips}>
        {BASELINE_GOALS.map((value) => (
          <Chip
            key={value}
            selected={selected.includes(value)}
            disabled={pending !== undefined}
            onClick={() => {
              setSelected((current) =>
                current.includes(value)
                  ? current.filter((goal) => goal !== value)
                  : [...current, value],
              );
            }}
          >
            {t(`options.${value}`)}
          </Chip>
        ))}
      </div>
      <BaselineActions
        availability={availability}
        canContinue={selected.length > 0}
        failed={error !== null}
        pending={pending}
        onContinue={() => {
          report(selected);
        }}
        onSkip={() => {
          skip(() => {
            setSelected([]);
          });
        }}
      />
    </>
  );
}
