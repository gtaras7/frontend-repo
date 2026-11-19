"use client";

import { useTranslations } from "next-intl";
import { type SubmitEvent, useEffect, useRef, useState } from "react";

import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { OnboardingPanel } from "@/components/features/onboarding/OnboardingPanel";
import { Button, Callout, TextInput } from "@/components/ui";
import { colors, px, spacing, typography } from "@/design-tokens/tokens";
import { HEIGHT_MAX, HEIGHT_MIN, isValidHeight } from "@/lib/onboarding/baseline-answers";

interface BaselineHeightFormProps {
  initialHeight: number;
  pending: boolean;
  failed: boolean;
  onContinue: (height: number) => void;
}

export function BaselineHeightForm({
  initialHeight,
  pending,
  failed,
  onContinue,
}: BaselineHeightFormProps) {
  const t = useTranslations("onboarding.step05.height");
  const health = useTranslations("onboarding.step05.health");
  const actions = useTranslations("onboarding.step05.actions");
  const [height, setHeight] = useState(String(initialHeight));
  const input = useRef<HTMLInputElement>(null);
  const text = height.trim();
  const value = /^\d+(?:[.,]\d+)?$/.test(text) ? Number(text.replace(",", ".")) : Number.NaN;
  const invalid = !isValidHeight(value);
  const range = t("range", { min: HEIGHT_MIN, max: HEIGHT_MAX });
  const error = Number.isFinite(value) ? t("outsideRange", { height: value }) : range;

  useEffect(() => {
    input.current?.focus();
  }, []);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    if (invalid) {
      input.current?.focus();
      return;
    }
    onContinue(value);
  }

  return (
    <OnboardingPanel eyebrow={health("eyebrow")} title={t("title")}>
      {invalid && (
        <div role="alert" aria-live="polite">
          <Callout tone="warning" title={t("warning.title")}>
            {t("warning.body")}
          </Callout>
        </div>
      )}
      <form noValidate onSubmit={handleSubmit} style={onboardingStyles.stack}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{t("title")}</h2>
          <p style={onboardingStyles.footnote}>{range}</p>
          <TextInput
            ref={input}
            label={t("label")}
            inputMode="decimal"
            required
            disabled={pending}
            value={height}
            errorText={invalid ? error : undefined}
            onChange={(event) => {
              setHeight(event.currentTarget.value);
            }}
          />
        </div>
        {failed && (
          <div aria-live="polite">
            <Callout tone="danger" title={actions("error.title")}>
              {actions("error.body")}
            </Callout>
          </div>
        )}
        <Button
          type="submit"
          size="lg"
          fullWidth
          loading={pending}
          loadingLabel={actions("saving")}
        >
          {actions("continue")}
        </Button>
      </form>
      <p style={onboardingStyles.footnote}>{t("footnote")}</p>
    </OnboardingPanel>
  );
}

const styles = {
  card: { ...onboardingStyles.card, gap: px(spacing[2]) },
  cardTitle: { margin: 0, color: colors.textPrimary, ...typography.textMdSemibold },
} satisfies Record<string, React.CSSProperties>;
