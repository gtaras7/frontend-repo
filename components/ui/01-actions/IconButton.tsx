import type { ComponentPropsWithRef } from "react";

import { colors, opacity, radius, typography } from "@/design-tokens/tokens";

export interface IconButtonProps extends ComponentPropsWithRef<"button"> {
  icon: React.ReactNode;
  label: string;
}

export function IconButton({
  icon,
  label,
  type = "button",
  style,
  disabled,
  ref,
  ...rest
}: IconButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      disabled={disabled}
      style={{
        ...styles.base,
        opacity: disabled ? opacity.disabled : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
      {...rest}
    >
      {icon}
    </button>
  );
}

const styles = {
  base: {
    display: "inline-flex",
    width: 38,
    height: 38,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    borderRadius: radius.full,
    backgroundColor: colors.grey100,
    color: colors.textSecondary,
    ...typography.textSm,
  },
} satisfies Record<string, React.CSSProperties>;
