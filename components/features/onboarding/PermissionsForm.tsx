"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useId, useState } from "react";

import { demoQueryKeys } from "@/components/features/onboarding/demo-query-keys";
import { DemoAccountNotice } from "@/components/features/onboarding/DemoAccountNotice";
import {
  ONBOARDING_ROUTES,
  ONBOARDING_TRANSITIONS,
} from "@/components/features/onboarding/onboarding-progress";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { setupStyles } from "@/components/features/onboarding/setup-styles";
import { useDemoAccount } from "@/components/features/onboarding/useDemoAccount";
import { Button, Callout, ListRow, Switch } from "@/components/ui";
import { spacing } from "@/design-tokens/tokens";
import { useRouter } from "@/i18n/navigation";
import { type DemoPermissionChoices, saveDemoPermissions } from "@/lib/api/mock-account";

const NO_PERMISSIONS: DemoPermissionChoices = { reminders: false };

export function PermissionsForm() {
  const t = useTranslations("onboarding.step06");
  const client = useQueryClient();
  const router = useRouter();
  const remindersDescriptionId = useId();
  const availability = useDemoAccount();
  const [choices, setChoices] = useState(
    () => client.getQueryData<DemoPermissionChoices>(demoQueryKeys.permissions) ?? NO_PERMISSIONS,
  );
  const save = useMutation({
    mutationFn: ({ choices }: { choices: DemoPermissionChoices; skipped: boolean }) =>
      saveDemoPermissions(choices),
    retry: false,
    gcTime: 0,
    onSuccess(saved) {
      client.setQueryData(demoQueryKeys.permissions, saved);
      client.removeQueries({ queryKey: demoQueryKeys.results });
    },
  });

  const disabled = availability !== "ready" || save.isPending;

  function submitChoices(skipped: boolean) {
    if (disabled) return;
    save.mutate(
      { choices: skipped ? NO_PERMISSIONS : choices, skipped },
      {
        onSuccess() {
          router.push(ONBOARDING_TRANSITIONS[ONBOARDING_ROUTES.permissions].to);
        },
      },
    );
  }

  return (
    <form
      style={onboardingStyles.stack}
      onSubmit={(event) => {
        event.preventDefault();
        submitChoices(false);
      }}
    >
      <p style={setupStyles.body}>{t("intro")}</p>
      <div role="group" aria-label={t("title")} style={styles.rows}>
        <ListRow
          title={t("options.reminders.title")}
          description={t("options.reminders.description")}
          descriptionId={remindersDescriptionId}
          trailing={
            <Switch
              label={t("options.reminders.title")}
              hideLabel
              aria-describedby={remindersDescriptionId}
              checked={choices.reminders}
              disabled={disabled}
              onCheckedChange={(reminders) => {
                setChoices({ reminders });
              }}
            />
          }
        />
        <ListRow
          title={t("options.location.title")}
          description={t("options.location.description")}
        />
      </div>
      {(save.isError || availability === "error") && (
        <div aria-live="polite">
          <Callout tone="danger" title={t("error.title")}>
            {t("error.body")}
          </Callout>
        </div>
      )}
      <Button
        type="submit"
        size="lg"
        fullWidth
        style={setupStyles.primary}
        disabled={disabled}
        loading={save.isPending && !save.variables.skipped}
        loadingLabel={t("saving")}
      >
        {t("save")}
      </Button>
      <Button
        variant="outline"
        fullWidth
        style={setupStyles.outline}
        disabled={disabled}
        loading={save.isPending && save.variables.skipped}
        loadingLabel={t("saving")}
        onClick={() => {
          submitChoices(true);
        }}
      >
        {t("skip")}
      </Button>
      <p style={{ ...onboardingStyles.footnote, lineHeight: 1.2 }}>{t("footnote")}</p>
      <DemoAccountNotice availability={availability} unavailable={t("unavailable")} />
    </form>
  );
}

const styles = {
  rows: { display: "flex", flexDirection: "column", gap: spacing[3] },
} satisfies Record<string, React.CSSProperties>;
