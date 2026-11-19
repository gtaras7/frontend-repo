import { type ComponentPropsWithRef, useId } from "react";

import { focusVisibleRule } from "@/components/ui/focus-visible";
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

const OPTION_ROW_CSS = focusVisibleRule(".cg-option-row:has(> input:focus-visible)");

export interface OptionRowProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "className" | "checked"
> {
  label: React.ReactNode;
  checked: boolean;
  invalid?: boolean;
}

export function OptionRow({
  label,
  checked,
  invalid = false,
  style,
  id,
  disabled,
  ref,
  "aria-invalid": ariaInvalid,
  ...rest
}: OptionRowProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const borderColor = invalid
    ? colors.status.danger
    : checked
      ? colors.primary
      : colors.borderDefault;
  const fillColor = invalid
    ? colors.status.dangerLight
    : checked
      ? colors.primaryLight
      : colors.surfaceCard;

  return (
    <label
      className="cg-option-row"
      htmlFor={inputId}
      style={{
        ...styles.root,
        border: `1px solid ${borderColor}`,
        backgroundColor: fillColor,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      <style href="cg-option-row" precedence="components">
        {OPTION_ROW_CSS}
      </style>
      <input
        ref={ref}
        id={inputId}
        type="radio"
        checked={checked}
        disabled={disabled}
        aria-invalid={invalid || ariaInvalid}
        style={styles.input}
        {...rest}
      />
      <span aria-hidden="true" style={{ ...styles.radio, border: `2px solid ${borderColor}` }}>
        {(checked || invalid) && (
          <span
            style={{
              ...styles.dot,
              backgroundColor: invalid ? colors.status.danger : colors.primary,
            }}
          />
        )}
      </span>
      <span
        style={{
          ...typography.text16Semibold,
          color: invalid ? colors.status.danger : colors.textPrimary,
        }}
      >
        {label}
      </span>
    </label>
  );
}

const styles = {
  root: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: 14,
    borderRadius: radius.xl,
    minHeight: px(44),
    padding: `0 ${px(spacing[6])}`,
  },
  input: { position: "absolute", width: 1, height: 1, opacity: 0 },
  radio: {
    position: "relative",
    width: 20,
    height: 20,
    flexShrink: 0,
    borderRadius: radius.full,
    backgroundColor: colors.baseWhite,
  },
  dot: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 10,
    height: 10,
    borderRadius: radius.full,
    transform: "translate(-50%, -50%)",
  },
} satisfies Record<string, React.CSSProperties>;
