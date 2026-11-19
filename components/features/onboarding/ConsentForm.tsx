"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

import {
  ONBOARDING_ROUTES,
  ONBOARDING_TRANSITIONS,
} from "@/components/features/onboarding/onboarding-progress";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { Badge, Button, Callout, Checkbox } from "@/components/ui";
import { colors, px, spacing, typography } from "@/design-tokens/tokens";
import { useRouter } from "@/i18n/navigation";
import { canContinue, submitConsent } from "@/lib/api/consent";
import { markConsentGatePassed } from "@/lib/onboarding-consent-gate";

export function ConsentForm() {
  const t = useTranslations("onboarding.step03");
  const router = useRouter();

  const [notADoctor, setNotADoctor] = useState(false);
  const [notForEmergencies, setNotForEmergencies] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rejected, setRejected] = useState(false);

  const accepted = Number(notADoctor) + Number(notForEmergencies);
  const ready = canContinue({ notADoctor, notForEmergencies }) && !submitting;

  async function handleSubmit() {
    if (!canContinue({ notADoctor, notForEmergencies }) || submitting) return;
    setSubmitting(true);
    try {
      await submitConsent({ notADoctor, notForEmergencies });
      markConsentGatePassed();
      router.push(ONBOARDING_TRANSITIONS[ONBOARDING_ROUTES.consent].to);
    } catch {
      setRejected(true);
      setSubmitting(false);
    }
  }

  return (
    <div style={onboardingStyles.stack}>
      {rejected ? (
        <div aria-live="polite">
          <Callout tone="danger" title={t("error.title")}>
            {t("error.body")}
          </Callout>
        </div>
      ) : (
        <p style={onboardingStyles.intro}>{t("intro")}</p>
      )}

      <div style={onboardingStyles.card}>
        <div style={styles.cardHeading}>
          <h2 style={styles.requiredLabel}>{t("requiredLabel")}</h2>
          <Badge tone="primary">
            {accepted > 0 ? t("counter.of", { accepted }) : t("counter.required")}
          </Badge>
        </div>

        <p style={styles.helper}>{t("helper")}</p>

        <div style={styles.statements}>
          <Checkbox
            checked={notADoctor}
            onCheckedChange={setNotADoctor}
            label={t("statement.notDoctor")}
          />
          <Checkbox
            checked={notForEmergencies}
            onCheckedChange={setNotForEmergencies}
            label={t("statement.notEmergency")}
          />
        </div>
      </div>

      <Button
        variant="primary"
        size="lg"
        disabled={!ready}
        loading={submitting}
        loadingLabel={t("submitting")}
        onClick={() => {
          void handleSubmit();
        }}
        style={onboardingStyles.fixedAction}
      >
        {t("submit")}
      </Button>
    </div>
  );
}

const styles = {
  cardHeading: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  requiredLabel: { margin: 0, color: colors.textPrimary, ...typography.textMdSemibold },
  helper: { margin: 0, color: colors.textSecondary, ...typography.textSm },
  statements: { display: "flex", flexDirection: "column", gap: px(spacing[4]) },
} satisfies Record<string, React.CSSProperties>;
