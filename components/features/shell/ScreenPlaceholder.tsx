import { getTranslations } from "next-intl/server";

import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

/** Screen bodies land in later slices; do not fill the gap with invented patient content. */
export async function ScreenPlaceholder() {
  const t = await getTranslations("shell.notBuilt");

  return (
    <div style={styles.placeholder}>
      <p style={styles.title}>{t("title")}</p>
      <p style={styles.body}>{t("body")}</p>
    </div>
  );
}

const styles = {
  placeholder: {
    display: "flex",
    flexDirection: "column",
    gap: spacing[2],
    maxWidth: 640,
    margin: `${px(spacing[8])} ${px(spacing[8])}`,
    padding: spacing[6],
    border: `1px dashed ${colors.borderDefault}`,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceCard,
  },
  title: { margin: 0, color: colors.textPrimary, ...typography.textMdSemibold },
  body: { margin: 0, color: colors.textSecondary, ...typography.textSm },
} satisfies Record<string, React.CSSProperties>;
