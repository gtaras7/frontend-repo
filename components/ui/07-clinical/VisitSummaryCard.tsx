import { Badge } from "@/components/ui/03-feedback/Badge";
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

/** The provenance badge identifies clinician-entered content, not AI output; do not drop it. */
export interface VisitSummaryCardProps {
  /** e.g. "Latest clinic visit summary". i18n string. */
  title: string;
  /** e.g. "Cardiology · 2 Sep 2026 · Dr. A. Georgiou". i18n string. */
  meta: string;
  /** Provenance badge label, e.g. "Clinician entered". i18n string. */
  provenanceLabel: string;
  /** Summary body. i18n string. */
  children: React.ReactNode;
  /** Keyword badges, e.g. ["BP review", "Home monitoring"]. i18n strings. */
  tags?: readonly string[];
  className?: string;
  style?: React.CSSProperties;
}

export function VisitSummaryCard({
  title,
  meta,
  provenanceLabel,
  children,
  tags = [],
  className,
  style,
}: VisitSummaryCardProps) {
  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      <div style={styles.header}>
        <div style={styles.heading}>
          <p style={styles.title}>{title}</p>
          <p style={styles.meta}>{meta}</p>
        </div>
        <Badge tone="primary">{provenanceLabel}</Badge>
      </div>

      <p style={styles.body}>{children}</p>

      {tags.length > 0 && (
        <div style={styles.tags}>
          {tags.map((tag) => (
            <Badge key={tag} tone="neutral">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: px(spacing[2.5]),
    padding: `${px(spacing[4])} ${px(18)}`,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.borderSubtle}`,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    minWidth: 0,
  },
  heading: { display: "flex", flexDirection: "column", gap: px(spacing[1]), minWidth: 0 },
  title: { margin: 0, ...typography.textSmSemibold, color: colors.textPrimary },
  meta: { margin: 0, ...typography.textXs, color: colors.textTertiary },
  body: { margin: 0, width: "100%", ...typography.textSm, color: colors.textSecondary },
  tags: { display: "flex", alignItems: "flex-start", gap: px(spacing[2]) },
} satisfies Record<string, React.CSSProperties>;
