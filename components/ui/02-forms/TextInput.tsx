import { type ComponentPropsWithRef, useId } from "react";

import {
  fieldColors,
  fieldDescriptionIds,
  fieldLabel,
  fieldRoot,
} from "@/components/ui/02-forms/field-styles";
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface TextInputProps extends Omit<ComponentPropsWithRef<"input">, "className"> {
  label: string;
  helperText?: string;
  errorText?: string;
}

export function TextInput({
  label,
  helperText,
  errorText,
  disabled,
  style,
  id,
  ref,
  "aria-describedby": describedBy,
  "aria-invalid": invalid,
  ...rest
}: TextInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const hasError = errorText !== undefined;
  const message = errorText ?? helperText;

  return (
    <div style={{ ...fieldRoot, ...style }}>
      <label htmlFor={inputId} style={fieldLabel}>
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={hasError || invalid}
        aria-describedby={fieldDescriptionIds(message ? helperId : undefined, describedBy)}
        style={{
          ...styles.input,
          border: `1px solid ${hasError ? colors.status.danger : colors.borderSubtle}`,
          ...fieldColors(disabled),
        }}
        {...rest}
      />
      {message !== undefined && (
        <p
          id={helperId}
          role={hasError ? "alert" : undefined}
          style={{
            ...styles.helper,
            color: hasError
              ? colors.status.danger
              : disabled
                ? colors.textTertiary
                : colors.textSecondary,
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

const styles = {
  input: {
    width: "100%",
    height: 40,
    borderRadius: radius.md,
    padding: `0 ${px(spacing[2.5])}`,
    ...typography.textMd,
  },
  helper: {
    margin: 0,
    ...typography.textSm,
  },
} satisfies Record<string, React.CSSProperties>;
