import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface ListRowProps {
  title: string;
  description: string;
  descriptionId?: string;
  trailing?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ListRow({
  title,
  description,
  descriptionId,
  trailing,
  className,
  style,
}: ListRowProps) {
  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      <div style={styles.content}>
        <p style={styles.title}>{title}</p>
        <p id={descriptionId} style={styles.description}>
          {description}
        </p>
      </div>

      {trailing !== undefined && <div style={styles.trailing}>{trailing}</div>}
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    gap: px(spacing[4]),
    padding: `${px(spacing[4])} ${px(18)}`,
    borderRadius: radius.xl,
    backgroundColor: colors.surfacePage,
  },
  content: { display: "flex", flexDirection: "column", gap: px(spacing[1]), minWidth: 0 },
  title: {
    margin: 0,
    width: "100%",
    ...typography.textMdSemibold,
    lineHeight: 1.2,
    color: colors.textPrimary,
  },
  description: {
    margin: 0,
    width: "100%",
    ...typography.textSm,
    lineHeight: 1.2,
    color: colors.textSecondary,
  },
  trailing: { flexShrink: 0 },
} satisfies Record<string, React.CSSProperties>;
