import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface RiskGaugeProps {
  /** e.g. "Low-Moderate". i18n string. */
  level: string;
  /** Caption next to the badge, e.g. "Cardiovascular risk". i18n string. */
  caption: string;
  /** 0-100 position of the needle on the track. */
  value: number;
  /** Axis labels, left to right. i18n strings, e.g. ["Low", "Moderate", "High"]. */
  labels: readonly string[];
  className?: string;
  style?: React.CSSProperties;
}

const SEGMENT_COLORS = [colors.status.success, colors.status.warning, colors.status.danger];

export function RiskGauge({ level, caption, value, labels, className, style }: RiskGaugeProps) {
  if (!Number.isFinite(value)) return null;
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      <div style={styles.heading}>
        <span style={styles.level}>{level}</span>
        <span style={styles.caption}>{caption}</span>
      </div>

      <div
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={caption}
        style={styles.track}
      >
        {SEGMENT_COLORS.map((color) => (
          <span
            key={color}
            aria-hidden="true"
            style={{ ...styles.segment, backgroundColor: color }}
          />
        ))}
        <span aria-hidden="true" style={{ ...styles.needle, left: `${String(clamped)}%` }} />
      </div>

      <div style={styles.labels}>
        {labels.map((text) => (
          <span key={text}>{text}</span>
        ))}
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: px(spacing[3]),
    padding: `${px(spacing[4])} ${px(spacing[5])} ${px(spacing[3])}`,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceCard,
  },
  heading: { display: "flex", alignItems: "center", gap: px(spacing[2]) },
  level: {
    display: "inline-flex",
    alignItems: "center",
    padding: `${px(spacing[1])} ${px(spacing[2.5])}`,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    ...typography.textSmSemibold,
  },
  caption: { ...typography.textSm, color: colors.textSecondary },
  track: { display: "flex", position: "relative", width: "100%", height: 26 },
  segment: {
    flex: "1 0 0",
    minWidth: 0,
    height: "100%",
    borderRadius: 7,
  },
  needle: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 2,
    height: 26,
    borderRadius: 2,
    backgroundColor: colors.neutralDark,
  },
  labels: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    ...typography.captionXs,
    color: colors.textTertiary,
  },
} satisfies Record<string, React.CSSProperties>;
