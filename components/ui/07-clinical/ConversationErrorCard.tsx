import { Button } from "@/components/ui/01-actions/Button";
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface ConversationErrorCardProps {
  /** e.g. "Could not load your conversation". i18n string. */
  title: string;
  /** e.g. "Check your connection and try again. You can also start a new message." i18n string. */
  children: React.ReactNode;
  /** e.g. "Try again". i18n string. */
  retryLabel: string;
  onRetry: () => void;
  /** e.g. "Start a new message". i18n string. */
  newMessageLabel: string;
  onNewMessage: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function ConversationErrorCard({
  title,
  children,
  retryLabel,
  onRetry,
  newMessageLabel,
  onNewMessage,
  className,
  style,
}: ConversationErrorCardProps) {
  return (
    <div role="alert" className={className} style={{ ...styles.root, ...style }}>
      <p style={styles.title}>{title}</p>
      <p style={styles.body}>{children}</p>

      <div style={styles.actions}>
        <Button variant="primary" size="md" onClick={onRetry}>
          {retryLabel}
        </Button>
        <Button variant="outline" size="md" onClick={onNewMessage}>
          {newMessageLabel}
        </Button>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: px(spacing[2.5]),
    padding: px(spacing[5]),
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.borderSubtle}`,
  },
  title: { margin: 0, ...typography.textSmSemibold, color: colors.status.danger },
  body: { margin: 0, ...typography.textSm, color: colors.status.danger },
  actions: { display: "flex", alignItems: "center", gap: px(spacing[3]) },
} satisfies Record<string, React.CSSProperties>;
