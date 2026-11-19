import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/01-actions/Button";
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface EmergencyInterruptBannerProps {
  /** e.g. "Your message may describe an emergency". i18n string. */
  title: string;
  /** e.g. "CardioGuard cannot assess urgent symptoms. Call your local emergency number now (e.g. 112 in Greece)." i18n string. */
  children: React.ReactNode;
  /** Primary action label, e.g. "Call 112". i18n string. */
  callLabel: string;
  onCall: () => void;
  /** Secondary action label, e.g. "I've already called". i18n string. */
  acknowledgeLabel: string;
  onAcknowledge: () => void;
  /** e.g. "Routine conversation is paused until you exit this guidance. Your message was not stored." i18n string. */
  pauseNote: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function EmergencyInterruptBanner({
  title,
  children,
  callLabel,
  onCall,
  acknowledgeLabel,
  onAcknowledge,
  pauseNote,
  className,
  style,
}: EmergencyInterruptBannerProps) {
  return (
    <div role="alert" className={className} style={{ ...styles.root, ...style }}>
      <div style={styles.header}>
        <TriangleAlert size={24} aria-hidden="true" style={styles.icon} />
        <div style={styles.content}>
          <p style={styles.title}>{title}</p>
          <p style={styles.body}>{children}</p>
        </div>
      </div>

      <div style={styles.actions}>
        <Button variant="primary" size="md" onClick={onCall}>
          {callLabel}
        </Button>
        <Button variant="outline" size="md" onClick={onAcknowledge}>
          {acknowledgeLabel}
        </Button>
      </div>

      <p style={styles.pauseNote}>{pauseNote}</p>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: px(spacing[3]),
    padding: `${px(18)} ${px(spacing[5])}`,
    borderRadius: radius.lg,
    backgroundColor: colors.status.dangerLight,
    border: `1px solid ${colors.status.danger}`,
  },
  header: { display: "flex", alignItems: "center", gap: px(14), width: "100%" },
  icon: { color: colors.status.danger, flexShrink: 0 },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: px(3),
    minWidth: 0,
  },
  title: { margin: 0, ...typography.textLgSemibold, color: colors.status.danger },
  body: { margin: 0, ...typography.textSm, color: colors.status.danger },
  actions: { display: "flex", alignItems: "flex-start", gap: px(spacing[3]) },
  pauseNote: { margin: 0, width: "100%", ...typography.textXs, color: colors.textTertiary },
} satisfies Record<string, React.CSSProperties>;
