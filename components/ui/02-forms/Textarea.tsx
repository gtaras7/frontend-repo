import { type ComponentPropsWithRef, useId } from "react";

import {
  fieldColors,
  fieldDescriptionIds,
  fieldLabel,
  fieldRoot,
} from "@/components/ui/02-forms/field-styles";
import { colors, radius, spacing, typography } from "@/design-tokens/tokens";

export interface TextareaProps extends Omit<ComponentPropsWithRef<"textarea">, "className"> {
  label: string;
  hint?: string;
}

export function Textarea({
  label,
  hint,
  style,
  id,
  disabled,
  ref,
  "aria-describedby": describedBy,
  ...rest
}: TextareaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hintId = `${textareaId}-hint`;

  return (
    <div style={{ ...fieldRoot, ...style }}>
      <label htmlFor={textareaId} style={fieldLabel}>
        {label}
      </label>
      <textarea
        ref={ref}
        id={textareaId}
        disabled={disabled}
        aria-describedby={fieldDescriptionIds(hint === undefined ? undefined : hintId, describedBy)}
        style={{
          ...styles.textarea,
          ...fieldColors(disabled),
          cursor: disabled ? "not-allowed" : "text",
        }}
        {...rest}
      />
      {hint !== undefined && (
        <p id={hintId} style={styles.hint}>
          {hint}
        </p>
      )}
    </div>
  );
}

const styles = {
  textarea: {
    width: "100%",
    height: 96,
    resize: "vertical",
    border: `1px solid ${colors.borderSubtle}`,
    borderRadius: radius.md,
    padding: spacing[2.5],
    ...typography.textMd,
  },
  hint: {
    alignSelf: "flex-end",
    margin: 0,
    color: colors.textTertiary,
    ...typography.textXs,
  },
} satisfies Record<string, React.CSSProperties>;
