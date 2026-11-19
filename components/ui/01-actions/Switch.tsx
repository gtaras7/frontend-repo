import { type ComponentPropsWithRef, useId } from "react";

import { focusVisibleRule } from "@/components/ui/focus-visible";
import { clippedLabel } from "@/components/ui/visually-hidden";
import { colors, opacity, radius, spacing, typography } from "@/design-tokens/tokens";

export interface SwitchProps extends Omit<
  ComponentPropsWithRef<"input">,
  "type" | "onChange" | "checked" | "role"
> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  hideLabel?: boolean;
}

const SWITCH_CSS = `
${focusVisibleRule(".cg-switch-input:focus-visible + .cg-switch-track")}
@media (prefers-reduced-motion: no-preference) {
  .cg-switch-thumb { transition: left 150ms; }
}
`;

export function Switch({
  checked,
  onCheckedChange,
  label,
  hideLabel = false,
  disabled,
  style,
  id,
  className,
  ref,
  ...rest
}: SwitchProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <label
      htmlFor={inputId}
      style={{
        ...styles.root,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      <style href="cg-switch" precedence="components">
        {SWITCH_CSS}
      </style>
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        role="switch"
        className={className ? `cg-switch-input ${className}` : "cg-switch-input"}
        checked={checked}
        disabled={disabled}
        onChange={(event) => {
          onCheckedChange(event.target.checked);
        }}
        style={styles.input}
        {...rest}
      />
      <span
        aria-hidden="true"
        className="cg-switch-track"
        style={{
          ...styles.track,
          backgroundColor: checked ? colors.primary : colors.grey200,
          opacity: disabled ? opacity.disabled : 1,
        }}
      >
        <span className="cg-switch-thumb" style={{ ...styles.thumb, left: checked ? 21 : 3 }} />
      </span>
      <span
        style={{
          ...styles.label,
          ...(hideLabel ? clippedLabel : {}),
          ...typography.textMd,
        }}
      >
        {label}
      </span>
    </label>
  );
}

const styles = {
  root: { display: "inline-flex", alignItems: "center", gap: spacing[3] },
  input: { position: "absolute", width: 1, height: 1, opacity: 0 },
  track: {
    position: "relative",
    display: "inline-block",
    width: 44,
    height: 26,
    flexShrink: 0,
    borderRadius: radius.full,
  },
  thumb: {
    position: "absolute",
    top: 3,
    width: 20,
    height: 20,
    borderRadius: radius.full,
    backgroundColor: colors.baseWhite,
  },
  label: { color: colors.textPrimary },
} satisfies Record<string, React.CSSProperties>;
