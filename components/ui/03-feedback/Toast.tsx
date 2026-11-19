import { Check, X } from "lucide-react";

import {
  colors,
  px,
  radius,
  shadowCss,
  shadows,
  spacing,
  typography,
} from "@/design-tokens/tokens";

export interface ToastProps {
  /** Bold first line, e.g. "Reading saved". i18n string. */
  title: string;
  /** Supporting line, e.g. "128/82 logged this morning". i18n string. */
  message: string;
  onDismiss?: () => void;
  /** Accessible name for the dismiss button, e.g. "Dismiss notification". i18n string. */
  dismissLabel: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Toast({ title, message, onDismiss, dismissLabel, className, style }: ToastProps) {
  return (
    <div role="status" className={className} style={{ ...styles.root, ...style }}>
      <span aria-hidden="true" style={styles.accent} />

      <span aria-hidden="true" style={styles.icon}>
        <Check size={16} strokeWidth={2.5} />
      </span>

      <div style={styles.content}>
        <p style={styles.title}>{title}</p>
        <p style={styles.message}>{message}</p>
      </div>

      {onDismiss && (
        <button type="button" onClick={onDismiss} aria-label={dismissLabel} style={styles.dismiss}>
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    alignItems: "center",
    gap: px(14),
    padding: `${px(14)} ${px(spacing[4])}`,
    borderRadius: radius.xl,
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.borderDefault}`,
    boxShadow: shadowCss(shadows.sm),
  },
  accent: {
    width: 3,
    height: 36,
    flexShrink: 0,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    flexShrink: 0,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    color: colors.primary,
  },
  content: { display: "flex", flexDirection: "column", gap: px(2), minWidth: 0 },
  title: { margin: 0, ...typography.textSmSemibold, color: colors.textPrimary },
  message: { margin: 0, ...typography.textXs, color: colors.textSecondary },
  dismiss: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Keep the 24px Figma footprint while meeting the 44px touch target.
    width: 44,
    height: 44,
    padding: px(spacing[2.5]),
    margin: px(-spacing[2.5]),
    flexShrink: 0,
    border: "0",
    borderRadius: radius.xs,
    backgroundColor: "transparent",
    color: colors.textSecondary,
  },
} satisfies Record<string, React.CSSProperties>;
