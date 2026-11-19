"use client";

import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useFormatter, useTranslations } from "next-intl";

import {
  demoDashboardHref,
  readDemoBaseline,
} from "@/components/features/onboarding/demo-baseline";
import { onboardingStyles } from "@/components/features/onboarding/onboarding-styles";
import { resultStyles } from "@/components/features/onboarding/result-styles";
import { setupStyles } from "@/components/features/onboarding/setup-styles";
import { ButtonLink, Callout, ListItem } from "@/components/ui";
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export function StartingSummary() {
  const t = useTranslations("onboarding.step08");
  const next = useTranslations("onboarding.nextActions");
  const baseline = useTranslations("onboarding.step05");
  const format = useFormatter();
  const client = useQueryClient();
  const { age, health, lifestyle, goals } = readDemoBaseline(client);
  const conditions = health?.status === "reported" ? health.value.conditions : undefined;
  const height = health?.status === "reported" ? health.value.height : undefined;
  const activity = lifestyle?.status === "reported" ? lifestyle.value.activity : undefined;
  const smoking = lifestyle?.status === "reported" ? lifestyle.value.smoking : undefined;

  const rows = [
    {
      label: t("fields.age"),
      value: age?.status === "reported" ? baseline(`age.options.${age.value}`) : undefined,
    },
    {
      label: t("fields.activity"),
      value:
        activity?.status === "reported"
          ? baseline(`lifestyle.activity.${activity.value}`)
          : undefined,
    },
    {
      label: t("fields.smoking"),
      value:
        smoking?.status === "reported" && smoking.value !== "preferNotToSay"
          ? baseline(`lifestyle.smoking.${smoking.value}`)
          : undefined,
    },
    {
      label: t("fields.conditions"),
      value:
        conditions?.status === "reported"
          ? format.list(conditions.value.map((value) => baseline(`health.options.${value}`)))
          : undefined,
    },
    {
      label: t("fields.height"),
      value: height?.status === "reported" ? t("heightValue", { height: height.value }) : undefined,
    },
    {
      label: t("fields.goals"),
      value:
        goals?.status === "reported"
          ? format.list(goals.value.map((value) => baseline(`goals.options.${value}`)))
          : undefined,
    },
  ];
  const reported = rows.filter(({ value }) => value !== undefined);
  const missing = [
    ...rows.filter(({ value }) => value === undefined).map(({ label }) => label),
    t("fields.weight"),
    t("fields.medication"),
  ];

  return (
    <section style={resultStyles.stack}>
      <p style={onboardingStyles.eyebrow}>{t("eyebrow")}</p>
      <h1 style={resultStyles.title}>{t("title")}</h1>
      <p style={resultStyles.intro}>{t("intro")}</p>
      <section style={styles.reported}>
        <h2 style={styles.reportedTitle}>{t("reported")}</h2>
        {reported.length === 0 ? (
          <p style={styles.label}>{t("nothingReported")}</p>
        ) : (
          <dl style={styles.rows}>
            {reported.map(({ label, value }) => (
              <div key={label} style={styles.row}>
                <dt style={styles.label}>{label}</dt>
                <dd style={styles.value}>{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </section>
      <Callout
        tone="warning"
        title={t("missingTitle")}
        icon={
          <Image src="/onboarding/summary-warning.svg" width={20} height={20} alt="" unoptimized />
        }
      >
        {t("missingBody", { fields: format.list(missing) })}
      </Callout>
      <h2 style={resultStyles.sectionTitle}>{t("suggested")}</h2>
      <div style={resultStyles.list}>
        <ListItem
          title={next("profile.title")}
          description={next(
            height?.status === "reported" ? "profile.weight" : "profile.heightWeight",
          )}
          style={resultStyles.item}
        />
        <ListItem
          title={t("walking.title")}
          description={t("walking.body")}
          style={resultStyles.item}
        />
      </div>
      <p style={onboardingStyles.footnote}>{t("footnote")}</p>
      <ButtonLink href={demoDashboardHref(client)} size="lg" fullWidth style={setupStyles.primary}>
        {t("dashboard")}
      </ButtonLink>
    </section>
  );
}

const styles = {
  reported: {
    display: "flex",
    flexDirection: "column",
    gap: spacing[3],
    padding: `${px(spacing[4])} ${px(spacing[5])}`,
    borderRadius: radius.xl,
    backgroundColor: colors.surfacePage,
  },
  reportedTitle: { ...typography.text14Semibold, margin: 0 },
  rows: { display: "flex", flexDirection: "column", gap: spacing[3], margin: 0 },
  row: { display: "flex", justifyContent: "space-between", alignItems: "start", gap: spacing[3] },
  label: { ...typography.textSm, color: colors.textTertiary, margin: 0 },
  value: { ...typography.textSmSemibold, textAlign: "right", overflowWrap: "anywhere", margin: 0 },
} satisfies Record<string, React.CSSProperties>;
