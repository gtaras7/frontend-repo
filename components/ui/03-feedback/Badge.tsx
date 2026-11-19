import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export type BadgeTone = "neutral" | "primary" | "success" | "warning" | "danger";

const TONE_STYLES: Record<BadgeTone, React.CSSProperties> = {
  neutral: { backgroundColor: colors.grey100, color: colors.textPrimary },
  primary: { backgroundColor: colors.primaryLight, color: colors.primary },
  success: { backgroundColor: colors.status.successLight, color: colors.status.success },
  warning: { backgroundColor: colors.status.warningLight, color: colors.status.warning },
  danger: { backgroundColor: colors.status.dangerLight, color: colors.status.danger },
};

export interface BadgeProps {
  tone?: BadgeTone;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({ tone = "neutral", children, className, style }: BadgeProps) {
  return (
    <span
      className={className}
      style={{
        ...styles.badge,
        ...TONE_STYLES[tone],
        ...style,
      }}
    >
      {children}
    </span>
  );
}

const styles = {
  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height: 24,
    padding: `0 ${px(spacing[2.5])}`,
    borderRadius: radius.xl,
    whiteSpace: "nowrap",
    ...typography.textXs,
  },
} satisfies Record<string, React.CSSProperties>;
