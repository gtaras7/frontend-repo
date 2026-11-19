import { colors, typography } from "@/design-tokens/tokens";

export type AvatarTone = "primary" | "neutral";
export type AvatarSize = "sm" | "md";

const SIZE_PX = { sm: 32, md: 40 } as const;

export interface AvatarProps {
  /** 1-3 uppercase initials. i18n-derived where the name is user data. */
  initials: string;
  tone?: AvatarTone;
  size?: AvatarSize;
  className?: string;
  style?: React.CSSProperties;
}

export function Avatar({ initials, tone = "primary", size = "md", className, style }: AvatarProps) {
  const box = SIZE_PX[size];

  return (
    <span
      aria-hidden="true" // the surrounding UI names the person; initials are decorative
      className={className}
      style={{
        ...styles.avatar,
        width: box,
        height: box,
        borderRadius: box / 2,
        backgroundColor: tone === "primary" ? colors.primary : colors.grey200,
        color: tone === "primary" ? colors.baseWhite : colors.textPrimary,
        ...style,
      }}
    >
      {initials}
    </span>
  );
}

const styles = {
  avatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    ...typography.text14Semibold,
  },
} satisfies Record<string, React.CSSProperties>;
