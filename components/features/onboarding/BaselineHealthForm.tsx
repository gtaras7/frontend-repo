"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { BaselineActions } from "@/components/features/onboarding/BaselineActions";
import { BaselineHeightForm } from "@/components/features/onboarding/BaselineHeightForm";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { OnboardingPanel } from "@/components/features/onboarding/OnboardingPanel";
import { useDemoBaseline } from "@/components/features/onboarding/useDemoBaseline";
import { Callout, Chip } from "@/components/ui";
import { AssetIcon } from "@/components/ui/AssetIcon";
import { DEMO_INVALID_HEIGHT, isDemoAccountError } from "@/lib/api/mock-account";
import {
  type BaselineAnswer,
  HEALTH_CONDITIONS,
  type HealthCondition,
  optionalAnswer,
} from "@/lib/onboarding/baseline-answers";

export function BaselineHealthForm() {
  const t = useTranslations("onboarding.step05.health");
  const { availability, report, skip, error, pending, saved } = useDemoBaseline("health");
  const [selected, setSelected] = useState<readonly HealthCondition[]>(() => {
    const conditions = saved?.status === "reported" ? saved.value.conditions : undefined;
    return conditions?.status === "reported" ? conditions.value : [];
  });
  const [checkingHeight, setCheckingHeight] = useState(false);
  const heightRejected = isDemoAccountError(error, "invalidHeight");

  function toggle(condition: HealthCondition) {
    setSelected((current) => {
      if (current.includes(condition)) return current.filter((value) => value !== condition);
      if (condition === "none") return [condition];
      return [...current.filter((value) => value !== "none"), condition];
    });
  }

  function reportHealth(height: BaselineAnswer<number>) {
    report(
      { conditions: optionalAnswer(selected), height },
      {
        onError(failure) {
          if (isDemoAccountError(failure, "invalidHeight")) setCheckingHeight(true);
        },
      },
    );
  }

  if (checkingHeight) {
    return (
      <BaselineHeightForm
        initialHeight={DEMO_INVALID_HEIGHT}
        pending={pending !== undefined}
        failed={error !== null && !heightRejected}
        onContinue={(height) => {
          reportHealth(optionalAnswer(height));
        }}
      />
    );
  }

  return (
    <OnboardingPanel eyebrow={t("eyebrow")} title={t("title")}>
      <p style={onboardingStyles.intro}>{t("intro")}</p>
      <div role="group" aria-label={t("title")} style={onboardingStyles.chips}>
        {HEALTH_CONDITIONS.map((value) => (
          <Chip
            key={value}
            selected={selected.includes(value)}
            disabled={pending !== undefined}
            onClick={() => {
              toggle(value);
            }}
          >
            {t(`options.${value}`)}
          </Chip>
        ))}
      </div>
      <Callout
        tone="info"
        title={t("medications.title")}
        icon={<AssetIcon name="shield-check" size={20} />}
      >
        {t("medications.body")}
      </Callout>
      <BaselineActions
        availability={availability}
        canContinue={selected.length > 0}
        failed={error !== null && !heightRejected}
        pending={pending}
        onContinue={() => {
          if (selected.length === 0) return;
          reportHealth(saved?.status === "reported" ? saved.value.height : { status: "missing" });
        }}
        onSkip={() => {
          skip(() => {
            setSelected([]);
          });
        }}
      />
      <p style={onboardingStyles.footnote}>{t("footnote")}</p>
    </OnboardingPanel>
  );
}
