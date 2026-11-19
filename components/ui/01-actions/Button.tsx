import type { ComponentPropsWithRef } from "react";

import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";
import { Link } from "@/i18n/navigation";

export type ButtonVariant = "primary" | "secondary" | "outline";
export type ButtonSize = "sm" | "md" | "md-compact" | "lg";

const VARIANT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: { backgroundColor: colors.primary, color: colors.baseWhite },
  secondary: {
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.borderDefault}`,
    color: colors.textSecondary,
  },
  outline: {
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.primary}`,
    color: colors.primary,
  },
};

const INERT_STYLES: Record<ButtonVariant, React.CSSProperties> = {
  primary: { backgroundColor: colors.grey200, color: colors.grey400 },
  secondary: {
    backgroundColor: colors.grey200,
    border: `1px solid ${colors.grey200}`,
    color: colors.grey400,
  },
  outline: {
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.grey200}`,
    color: colors.grey400,
  },
};

const SIZE_STYLES: Record<ButtonSize, React.CSSProperties> = {
  sm: { minHeight: 36 },
  md: { minHeight: 46 },
  "md-compact": { minHeight: 40 },
  lg: { minHeight: 53 },
};

interface ButtonAppearance {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

function appearanceStyles(
  { variant = "primary", size = "md", fullWidth = false }: ButtonAppearance,
  inert = false,
): React.CSSProperties {
  return {
    ...SIZE_STYLES[size],
    ...(inert ? INERT_STYLES[variant] : VARIANT_STYLES[variant]),
    ...(fullWidth ? { width: "100%" } : {}),
  };
}

export interface ButtonProps extends ComponentPropsWithRef<"button">, ButtonAppearance {
  loading?: boolean;
  loadingLabel?: React.ReactNode;
}

export function Button({
  variant,
  size,
  loading = false,
  loadingLabel,
  fullWidth,
  disabled,
  type = "button",
  style,
  children,
  ref,
  ...rest
}: ButtonProps) {
  const inert = disabled === true || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={inert}
      aria-busy={loading ? true : undefined}
      style={{
        ...styles.base,
        cursor: inert ? "not-allowed" : "pointer",
        ...appearanceStyles({ variant, size, fullWidth }, inert),
        ...style,
      }}
      {...rest}
    >
      {loading ? (loadingLabel ?? children) : children}
    </button>
  );
}

/** Navigation uses a native locale-aware link, including middle-click and no-JS behavior. */
export type ButtonLinkProps = Omit<React.ComponentProps<typeof Link>, "className" | "style"> &
  ButtonAppearance & {
    style?: React.CSSProperties;
    children: React.ReactNode;
  };

export function ButtonLink({
  variant,
  size,
  fullWidth,
  style,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      style={{
        ...styles.base,
        cursor: "pointer",
        textDecoration: "none",
        ...appearanceStyles({ variant, size, fullWidth }),
        ...style,
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}

const styles = {
  base: {
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    border: "0",
    borderRadius: radius.full,
    padding: `0 ${px(spacing[4])}`,
    whiteSpace: "nowrap",
    ...typography.textSmSemibold,
  },
} satisfies Record<string, React.CSSProperties>;
