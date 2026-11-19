import { type LucideIcon, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/01-actions/Button";
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface EmptyStateProps {
  title: string;
  children: React.ReactNode;
  /** Action label. i18n string. */
  actionLabel?: string;
  onAction?: () => void;
  icon?: LucideIcon;
  className?: string;
  style?: React.CSSProperties;
}

export function EmptyState({
  title,
  children,
  actionLabel,
  onAction,
  icon: Icon = MessageCircle,
  className,
  style,
}: EmptyStateProps) {
  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      <span aria-hidden="true" style={styles.icon}>
        <Icon size={24} aria-hidden="true" />
      </span>

      <p style={styles.title}>{title}</p>

      <p style={styles.body}>{children}</p>

      {actionLabel !== undefined && onAction !== undefined && (
        <Button variant="primary" size="md-compact" onClick={onAction} style={styles.action}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: px(spacing[2.5]),
    padding: `${px(36)} ${px(28)}`,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceCard,
    textAlign: "center",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56,
    flexShrink: 0,
    borderRadius: radius.full,
    backgroundColor: colors.grey100,
    color: colors.textSecondary,
  },
  title: { margin: 0, ...typography.textMdSemibold, color: colors.textPrimary },
  body: { margin: 0, ...typography.textSm, color: colors.textSecondary },
  action: { marginTop: px(spacing[2]), padding: `0 ${px(spacing[6])}` },
} satisfies Record<string, React.CSSProperties>;
