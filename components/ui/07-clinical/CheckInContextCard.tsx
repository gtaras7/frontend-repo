import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface CheckInEntry {
  label: string;
  value: string;
  /** True renders the value in text/tertiary (Figma's "Not reported" state). */
  unreported?: boolean;
}

export interface CheckInContextCardProps {
  /** e.g. "Today's check in". i18n string. */
  title: string;
  /** e.g. "9 September · user reported". i18n string. */
  meta: string;
  /** Provenance pill label, e.g. "User reported". i18n string. */
  provenanceLabel: string;
  entries: readonly CheckInEntry[];
  /** Footnote, e.g. "Informational summary only. Not a diagnosis and not a score." i18n string. */
  footnote: string;
  className?: string;
  style?: React.CSSProperties;
}

export function CheckInContextCard({
  title,
  meta,
  provenanceLabel,
  entries,
  footnote,
  className,
  style,
}: CheckInContextCardProps) {
  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      <div style={styles.header}>
        <div style={styles.heading}>
          <p style={styles.title}>{title}</p>
          <p style={styles.meta}>{meta}</p>
        </div>
        <span style={styles.provenance}>{provenanceLabel}</span>
      </div>

      <span aria-hidden="true" style={styles.divider} />

      {entries.map((entry) => (
        <div key={entry.label} style={styles.entry}>
          <span style={styles.entryLabel}>{entry.label}</span>
          <span
            style={{
              ...styles.value,
              color: entry.unreported === true ? colors.textTertiary : colors.textPrimary,
            }}
          >
            {entry.value}
          </span>
        </div>
      ))}

      <div style={styles.footer}>
        <span aria-hidden="true" style={styles.footnoteDot} />
        <span style={styles.footnote}>{footnote}</span>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: px(spacing[2]),
    padding: `${px(14)} ${px(18)}`,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.borderSubtle}`,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minWidth: 0,
  },
  heading: { display: "flex", flexDirection: "column", gap: px(2) },
  title: { margin: 0, ...typography.textSmSemibold, color: colors.textPrimary },
  meta: { margin: 0, ...typography.textXs, color: colors.textTertiary },
  provenance: {
    display: "inline-flex",
    alignItems: "center",
    padding: `${px(3)} ${px(spacing[2])}`,
    borderRadius: radius.md,
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    flexShrink: 0,
    ...typography.textXs,
  },
  divider: { width: "100%", height: 1, backgroundColor: colors.borderSubtle },
  entry: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  entryLabel: { ...typography.textSm, color: colors.textSecondary },
  footer: {
    display: "flex",
    alignItems: "center",
    gap: px(spacing[2]),
    paddingTop: px(spacing[1.5]),
  },
  footnoteDot: {
    width: 6,
    height: 6,
    flexShrink: 0,
    borderRadius: 3,
    // Figma authors #B8B8B9 — the near-miss grey (drift #34/44); grey/400 is the token.
    backgroundColor: colors.grey400,
  },
  footnote: { ...typography.textXs, color: colors.textTertiary },
  value: { ...typography.textSmSemibold },
} satisfies Record<string, React.CSSProperties>;
