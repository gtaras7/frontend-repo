"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { BaselineActions } from "@/components/features/onboarding/BaselineActions";
import { BaselineRadioGroup } from "@/components/features/onboarding/BaselineRadioGroup";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { useDemoBaseline } from "@/components/features/onboarding/useDemoBaseline";
import { colors, typography } from "@/design-tokens/tokens";
import {
  ACTIVITY_LEVELS,
  type ActivityLevel,
  optionalAnswer,
  SMOKING_OPTIONS,
  type SmokingOption,
} from "@/lib/onboarding/baseline-answers";

export function BaselineLifestyleForm() {
  const t = useTranslations("onboarding.step05.lifestyle");
  const { availability, report, skip, error, pending, saved } = useDemoBaseline("lifestyle");
  const previous = saved?.status === "reported" ? saved.value : undefined;
  const [activity, setActivity] = useState<ActivityLevel | undefined>(() =>
    previous?.activity.status === "reported" ? previous.activity.value : undefined,
  );
  const [smoking, setSmoking] = useState<SmokingOption | undefined>(() =>
    previous?.smoking.status === "reported" ? previous.smoking.value : undefined,
  );

  return (
    <>
      <p style={onboardingStyles.intro}>{t("intro")}</p>
      <BaselineRadioGroup
        name="demo-activity-level"
        label={t("title")}
        options={ACTIVITY_LEVELS}
        getLabel={(value) => t(`activity.${value}`)}
        selected={activity}
        disabled={pending !== undefined}
        onChange={setActivity}
      />
      <h2 style={styles.smoking}>{t("smokingTitle")}</h2>
      <BaselineRadioGroup
        name="demo-smoking"
        label={t("smokingTitle")}
        options={SMOKING_OPTIONS}
        getLabel={(value) => t(`smoking.${value}`)}
        selected={smoking}
        disabled={pending !== undefined}
        onChange={setSmoking}
      />
      <BaselineActions
        availability={availability}
        canContinue={activity !== undefined || smoking !== undefined}
        failed={error !== null}
        pending={pending}
        onContinue={() => {
          report({ activity: optionalAnswer(activity), smoking: optionalAnswer(smoking) });
        }}
        onSkip={() => {
          skip(() => {
            setActivity(undefined);
            setSmoking(undefined);
          });
        }}
      />
    </>
  );
}

const styles = {
  smoking: { margin: 0, color: colors.textPrimary, ...typography.textMdSemibold },
} satisfies Record<string, React.CSSProperties>;
