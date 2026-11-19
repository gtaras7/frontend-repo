import type { ComponentPropsWithRef } from "react";

import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface ChipProps extends ComponentPropsWithRef<"button"> {
  selected?: boolean;
  children: React.ReactNode;
}

export function Chip({
  selected = false,
  type = "button",
  disabled,
  style,
  children,
  ref,
  ...rest
}: ChipProps) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-pressed={selected}
      style={{
        ...styles.base,
        border: `1px solid ${selected ? colors.primary : colors.grey200}`,
        backgroundColor: selected ? colors.primaryLight : colors.surfaceCard,
        color: selected ? colors.primary : colors.textSecondary,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

const styles = {
  base: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    borderRadius: radius.full,
    padding: `${px(spacing[2.5])} ${px(spacing[4])}`,
    ...typography.text14Semibold,
  },
} satisfies Record<string, React.CSSProperties>;
