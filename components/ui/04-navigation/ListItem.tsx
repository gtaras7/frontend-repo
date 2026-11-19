import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface ListItemProps {
  title: string;
  description: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ListItem({ title, description, className, style }: ListItemProps) {
  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      <p style={styles.title}>{title}</p>
      <p style={styles.description}>{description}</p>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: px(spacing[1]),
    padding: `${px(14)} ${px(spacing[5])}`,
    borderRadius: radius.xl,
    backgroundColor: colors.surfacePage,
  },
  title: {
    margin: 0,
    width: "100%",
    ...typography.text14Semibold,
    color: colors.textPrimary,
  },
  description: { margin: 0, width: "100%", ...typography.textSm, color: colors.textSecondary },
} satisfies Record<string, React.CSSProperties>;
