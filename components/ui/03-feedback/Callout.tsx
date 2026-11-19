import { Shield, TriangleAlert } from "lucide-react";

import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export type CalloutTone = "info" | "warning" | "danger";

const TONE_STYLES: Record<
  CalloutTone,
  {
    role: "status" | "alert";
    background: string;
    titleColor: string;
    bodyColor: string;
    iconColor: string;
    icon: React.ReactNode;
  }
> = {
  info: {
    role: "status",
    background: colors.primaryLight,
    titleColor: colors.textPrimary,
    bodyColor: colors.textSecondary,
    iconColor: colors.primary,
    icon: <Shield size={20} aria-hidden="true" />,
  },
  warning: {
    role: "status",
    background: colors.status.warningLight,
    titleColor: colors.textPrimary,
    bodyColor: colors.textSecondary,
    // Figma strokes the warning glyph in primary #EC6707, not the status amber.
    iconColor: colors.primary,
    icon: <TriangleAlert size={20} aria-hidden="true" />,
  },
  danger: {
    role: "alert",
    background: colors.status.dangerLight,
    titleColor: colors.status.danger,
    bodyColor: colors.status.danger,
    iconColor: colors.status.danger,
    icon: <TriangleAlert size={20} aria-hidden="true" />,
  },
};

export interface CalloutProps {
  tone?: CalloutTone;
  icon?: React.ReactNode;
  /** Localized heading. */
  title: string;
  /** Localized supporting content. */
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Callout({ tone = "info", icon, title, children, className, style }: CalloutProps) {
  const {
    role,
    background,
    titleColor,
    bodyColor,
    iconColor,
    icon: defaultIcon,
  } = TONE_STYLES[tone];

  return (
    <div
      role={role}
      className={className}
      style={{
        ...styles.root,
        backgroundColor: background,
        color: bodyColor,
        ...style,
      }}
    >
      <span style={{ ...styles.icon, color: iconColor }}>{icon ?? defaultIcon}</span>

      <div style={styles.content}>
        <p style={{ ...styles.title, color: titleColor }}>{title}</p>
        <p style={{ ...styles.body, color: bodyColor }}>{children}</p>
      </div>
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    alignItems: "flex-start",
    gap: px(spacing[3]),
    padding: `${px(14)} ${px(18)}`,
    borderRadius: radius.lg,
  },
  icon: { display: "flex", flexShrink: 0 },
  content: { display: "flex", flexDirection: "column", gap: px(spacing[1]), minWidth: 0 },
  title: {
    margin: 0,
    ...typography.text14Semibold,
  },
  body: { margin: 0, ...typography.textSm },
} satisfies Record<string, React.CSSProperties>;
