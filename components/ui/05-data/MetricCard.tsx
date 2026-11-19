import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export type MetricStatus = "success" | "warning" | "danger";

const STATUS_COLOR: Record<MetricStatus, string> = {
  success: colors.status.success,
  warning: colors.status.warning,
  danger: colors.status.danger,
};

export interface MetricCardProps {
  /** e.g. "Resting heart rate". i18n string. */
  label: string;
  /** The clinical value, e.g. "64". Rendered 26px Bold. */
  value: string;
  /** e.g. "bpm". i18n string. */
  unit: string;
  /** Trend/delta line, e.g. "Steady" or "-4 vs last week". i18n string. */
  trend: string;
  status: MetricStatus;
  className?: string;
  style?: React.CSSProperties;
}

export function MetricCard({
  label,
  value,
  unit,
  trend,
  status,
  className,
  style,
}: MetricCardProps) {
  const statusColor = STATUS_COLOR[status];

  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      <span aria-hidden="true" style={{ ...styles.accent, backgroundColor: statusColor }} />

      <div style={styles.content}>
        <p style={styles.label}>{label}</p>

        <div style={styles.reading}>
          <span style={styles.value}>{value}</span>
          <span style={styles.unit}>{unit}</span>
        </div>

        <p style={{ ...styles.trend, color: statusColor }}>{trend}</p>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    alignItems: "flex-start",
    borderRadius: radius.md,
    backgroundColor: colors.surfaceCard,
    overflow: "hidden",
  },
  accent: { width: 4, height: 108, flexShrink: 0 },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: px(spacing[1.5]),
    padding: `${px(spacing[4])} ${px(18)} ${px(spacing[4])} ${px(spacing[4])}`,
    minWidth: 0,
  },
  label: { margin: 0, ...typography.textSm, color: colors.textTertiary },
  reading: { display: "flex", alignItems: "baseline", gap: px(5) },
  value: {
    ...typography.valueXlBold,
    color: colors.textPrimary,
  },
  unit: { ...typography.textSm, color: colors.textTertiary },
  trend: { margin: 0, ...typography.textXs },
} satisfies Record<string, React.CSSProperties>;
