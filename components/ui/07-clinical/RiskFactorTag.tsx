import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface RiskFactorTagProps {
  /** e.g. "Smoking". i18n string. */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function RiskFactorTag({ children, className, style }: RiskFactorTagProps) {
  return (
    <span className={className} style={{ ...styles.root, ...style }}>
      <span aria-hidden="true" style={styles.dot} />
      <span style={styles.label}>{children}</span>
    </span>
  );
}

const styles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: px(spacing[1.5]),
    padding: `${px(spacing[1.5])} ${px(spacing[3])}`,
    borderRadius: radius.full,
    backgroundColor: colors.grey100,
  },
  dot: {
    width: 8,
    height: 8,
    flexShrink: 0,
    borderRadius: 4,
    backgroundColor: colors.grey400,
  },
  label: {
    ...typography.textSmMedium,
    fontSize: 12,
    lineHeight: 1.3,
    color: colors.textSecondary,
    whiteSpace: "nowrap",
  },
} satisfies Record<string, React.CSSProperties>;
