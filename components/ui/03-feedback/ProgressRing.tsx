import { colors, typography } from "@/design-tokens/tokens";

export interface ProgressRingProps {
  /** 0-100. */
  value: number;
  /** Accessible name, e.g. "Weekly adherence". i18n string. */
  label: string;
  /** Overrides the auto "{value}%" label. i18n string, e.g. "67% of goal". */
  labelOverride?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function ProgressRing({
  value,
  label,
  labelOverride,
  size = 96,
  className,
  style,
}: ProgressRingProps) {
  const clamped = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : undefined;
  const strokeWidth = 8;
  const r = (size - strokeWidth) / 2 - 4; // Figma: r=34 in a 96 box (4px inner breathing room)
  const circumference = 2 * Math.PI * r;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={className}
      style={{ ...styles.root, width: size, height: size, ...style }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${String(size)} ${String(size)}`}
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={colors.grey200}
          strokeWidth={strokeWidth}
        />
        {clamped !== undefined && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={colors.primary}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - clamped / 100)}
            strokeLinecap="round"
            transform={`rotate(-90 ${String(size / 2)} ${String(size / 2)})`}
          />
        )}
      </svg>

      <span style={styles.label}>
        {labelOverride ?? (clamped === undefined ? null : `${String(clamped)}%`)}
      </span>
    </div>
  );
}

const styles = {
  root: { position: "relative" },
  label: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...typography.textLgSemibold,
    color: colors.textPrimary,
  },
} satisfies Record<string, React.CSSProperties>;
