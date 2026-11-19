import { colors, px, spacing, typography } from "@/design-tokens/tokens";

export interface BrandFooterProps {
  /** First line, e.g. "Privacy by design. Nothing is shared without your consent." i18n string. */
  lines: readonly React.ReactNode[];
  className?: string;
  style?: React.CSSProperties;
}

export function BrandFooter({ lines, className, style }: BrandFooterProps) {
  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      {lines.map((line, i) => (
        <p key={i} style={styles.line}>
          {line}
        </p>
      ))}
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: px(spacing[1.5]),
    ...typography.textXs,
    color: colors.textTertiary,
  },
  line: { margin: 0, width: "100%" },
} satisfies Record<string, React.CSSProperties>;
