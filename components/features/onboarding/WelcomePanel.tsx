import { getTranslations } from "next-intl/server";

import {
  ONBOARDING_ROUTES,
  ONBOARDING_TRANSITIONS,
} from "@/components/features/onboarding/onboarding-progress";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { Button, ButtonLink, Callout } from "@/components/ui";
import { px, spacing } from "@/design-tokens/tokens";

export async function WelcomePanel() {
  const t = await getTranslations("onboarding.step02");

  return (
    <section style={onboardingStyles.spaciousStack}>
      <h1 style={onboardingStyles.title}>{t("title")}</h1>

      <p style={onboardingStyles.intro}>{t("intro")}</p>

      <Callout tone="info" title={t("calloutTitle")}>
        {t("calloutBody")}
      </Callout>

      <div style={styles.actions}>
        <ButtonLink
          href={ONBOARDING_TRANSITIONS[ONBOARDING_ROUTES.welcome].to}
          variant="primary"
          size="lg"
          style={onboardingStyles.fixedAction}
        >
          {t("getStarted")}
        </ButtonLink>
        <Button
          variant="outline"
          size="lg"
          disabled
          style={onboardingStyles.fixedAction}
          aria-label={t("haveAccount")}
        >
          {t("haveAccount")}
        </Button>
      </div>

      <p style={onboardingStyles.footnote}>{t("privacyNote")}</p>
    </section>
  );
}

const styles = {
  actions: { display: "flex", flexDirection: "column", gap: px(spacing[6]) },
} satisfies Record<string, React.CSSProperties>;
