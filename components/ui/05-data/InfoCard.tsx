import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  tone?: "neutral" | "primary";
  className?: string;
  style?: React.CSSProperties;
}

export function InfoCard({ title, children, tone = "neutral", className, style }: InfoCardProps) {
  const isPrimary = tone === "primary";

  return (
    <div
      className={className}
      style={{
        ...styles.root,
        backgroundColor: isPrimary ? colors.primaryLight : colors.surfacePage,
        ...style,
      }}
    >
      <p
        style={{
          ...styles.title,
          color: isPrimary ? colors.primary : colors.textSecondary,
        }}
      >
        {title}
      </p>
      <p style={styles.body}>{children}</p>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: px(spacing[2]),
    padding: `${px(18)} ${px(spacing[5])}`,
    borderRadius: radius.xl,
  },
  title: {
    margin: 0,
    width: "100%",
    ...typography.text14Semibold,
  },
  body: { margin: 0, width: "100%", ...typography.textSm, color: colors.textPrimary },
} satisfies Record<string, React.CSSProperties>;
