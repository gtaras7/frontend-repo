import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

/** Figma set `513:200`; Missing uses grey/100 for the authored non-token #FAFAFA (drift #44). */
export interface ReviewRowProps {
  /** e.g. "Blood pressure". i18n string. */
  label: string;
  /** The recorded value, or the missing-state text, e.g. "Missing". i18n string. */
  value: React.ReactNode;
  missing?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function ReviewRow({ label, value, missing = false, className, style }: ReviewRowProps) {
  return (
    <div
      className={className}
      style={{
        ...styles.root,
        backgroundColor: missing ? colors.grey100 : colors.surfaceCard,
        ...style,
      }}
    >
      <p style={styles.label}>{label}</p>
      <p
        style={{
          ...styles.value,
          color: missing ? colors.textTertiary : colors.textSecondary,
        }}
      >
        {value}
      </p>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    gap: px(spacing[3]),
    padding: px(spacing[5]),
    borderRadius: radius.xl,
    border: `1px solid ${colors.grey200}`,
  },
  label: {
    margin: 0,
    flexShrink: 0,
    ...typography.textMdSemibold,
    color: colors.textPrimary,
  },
  value: {
    margin: 0,
    ...typography.textSm,
  },
} satisfies Record<string, React.CSSProperties>;
