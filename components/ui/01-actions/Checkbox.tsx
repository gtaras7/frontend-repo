import { type ComponentPropsWithRef, useId } from "react";

import { colors, radius, spacing, typography } from "@/design-tokens/tokens";

export interface CheckboxProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "onChange" | "checked"
> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: React.ReactNode;
}

export function Checkbox({
  checked,
  onCheckedChange,
  label,
  style,
  id,
  ref,
  ...rest
}: CheckboxProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div style={{ ...styles.root, ...style }}>
      {/* The wrapper is visual only, but it must NOT be aria-hidden: the checkbox input
          lives inside it, and aria-hidden on an ancestor removes the control from the
          accessibility tree (broke role queries and screen readers alike). Only the
          decorative glyph is hidden. */}
      <span style={styles.boxWrap}>
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            onCheckedChange(event.target.checked);
          }}
          style={{
            ...styles.input,
            border: `1px solid ${checked ? colors.primary : colors.borderDefault}`,
            backgroundColor: checked ? colors.primary : colors.surfaceCard,
            cursor: rest.disabled ? "not-allowed" : "pointer",
          }}
          {...rest}
        />
        {checked && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.baseWhite}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={styles.check}
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      <label htmlFor={inputId} style={styles.label}>
        {label}
      </label>
    </div>
  );
}

const styles = {
  root: { display: "flex", alignItems: "flex-start", gap: spacing[3] },
  boxWrap: {
    position: "relative",
    display: "flex",
    width: 22,
    height: 22,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  input: {
    appearance: "none",
    width: 22,
    height: 22,
    margin: 0,
    borderRadius: radius.sm,
  },
  check: { pointerEvents: "none", position: "absolute", width: 16, height: 16 },
  label: { color: colors.textPrimary, ...typography.textSm },
} satisfies Record<string, React.CSSProperties>;
