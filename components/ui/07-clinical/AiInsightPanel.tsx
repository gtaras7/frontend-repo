import { Brain } from "lucide-react";

import { Badge } from "@/components/ui/03-feedback/Badge";
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface AiInsightSource {
  index: number;
  /** e.g. "ESC Prevention Guidelines 2025, §6.3". i18n string. */
  citation: string;
}

export interface AiInsightPanelProps {
  /** Header label, e.g. "AI insight". i18n string. */
  title: string;
  /** Optional badge content, e.g. "Trend". i18n string. */
  badge?: React.ReactNode;
  /** The insight text (AI output). */
  children: React.ReactNode;
  /** Grounding citations. Mandatory — an AI insight without sources must not render. */
  sources: readonly AiInsightSource[];
  /** e.g. "Sources:". i18n string. */
  sourcesLabel: string;
  /** e.g. "Educational insight based on your reported readings. Not a diagnosis." i18n string. */
  disclaimer: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function AiInsightPanel({
  title,
  badge,
  children,
  sources,
  sourcesLabel,
  disclaimer,
  className,
  style,
}: AiInsightPanelProps) {
  if (sources.length === 0) return null;

  return (
    <div role="note" className={className} style={{ ...styles.root, ...style }}>
      <div style={styles.header}>
        <div style={styles.heading}>
          <Brain size={18} aria-hidden="true" style={styles.icon} />
          <p style={styles.title}>{title}</p>
        </div>
        {badge !== undefined && <Badge tone="warning">{badge}</Badge>}
      </div>

      <div style={styles.body}>{children}</div>

      <div style={styles.sources}>
        <span style={styles.sourcesLabel}>{sourcesLabel}</span>
        {sources.map((source) => (
          <span key={source.index} style={styles.source}>
            <span style={styles.sourceIndex}>{String(source.index)}</span>
            <span style={styles.citation}>{source.citation}</span>
          </span>
        ))}
      </div>

      <p style={styles.disclaimer}>{disclaimer}</p>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: px(spacing[2]),
    padding: `${px(14)} ${px(18)}`,
    borderRadius: radius.lg,
    backgroundColor: colors.primaryLight,
    border: `1px solid ${colors.primary}`,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  heading: { display: "flex", alignItems: "center", gap: px(spacing[2]), minWidth: 0 },
  icon: { color: colors.textPrimary, flexShrink: 0 },
  title: { margin: 0, ...typography.textSmSemibold, color: colors.textPrimary },
  body: { margin: 0, width: "100%", ...typography.textMd, color: colors.textPrimary },
  sources: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: px(spacing[2.5]),
    width: "100%",
    ...typography.textXs,
  },
  sourcesLabel: { flex: "0 0 auto", color: colors.textTertiary },
  source: {
    display: "flex",
    alignItems: "center",
    gap: px(spacing[1.5]),
    flex: "1 1 auto",
    minWidth: 0,
    padding: `${px(3)} ${px(spacing[2])}`,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.borderDefault}`,
  },
  sourceIndex: { color: colors.primary },
  citation: {
    color: colors.textSecondary,
    overflowWrap: "anywhere",
  },
  disclaimer: { margin: 0, width: "100%", ...typography.textXs, color: colors.textTertiary },
} satisfies Record<string, React.CSSProperties>;
