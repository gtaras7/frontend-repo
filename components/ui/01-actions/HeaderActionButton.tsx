import { Plus } from "lucide-react";
import type { ComponentPropsWithRef } from "react";

import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface HeaderActionButtonProps extends ComponentPropsWithRef<"button"> {
  /** Visible label — required so the control always has an accessible name. */
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function HeaderActionButton({
  icon,
  type = "button",
  style,
  disabled,
  children,
  ref,
  ...rest
}: HeaderActionButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      style={{
        ...styles.base,
        backgroundColor: disabled ? colors.grey200 : colors.primary,
        color: disabled ? colors.grey400 : colors.baseWhite,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      {...rest}
    >
      {children}
      {icon ?? <Plus size={24} aria-hidden="true" />}
    </button>
  );
}

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    border: 0,
    borderRadius: radius.md,
    padding: `${px(spacing[2.5])} ${px(spacing[4])}`,
    ...typography.textSmSemibold,
  },
} satisfies Record<string, React.CSSProperties>;
