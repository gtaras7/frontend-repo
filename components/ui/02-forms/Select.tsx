import { ChevronDown } from "lucide-react";
import { type ComponentPropsWithRef, useId } from "react";

import { fieldColors, fieldLabel, fieldRoot } from "@/components/ui/02-forms/field-styles";
import { colors, radius, spacing, typography } from "@/design-tokens/tokens";

const CHEVRON_SIZE = 20;

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<ComponentPropsWithRef<"select">, "className"> {
  label: string;
  options: readonly SelectOption[];
}

export function Select({ label, options, style, id, disabled, ref, ...rest }: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  return (
    <div style={{ ...fieldRoot, ...style }}>
      <label htmlFor={selectId} style={fieldLabel}>
        {label}
      </label>
      <div style={styles.field}>
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          style={{
            ...styles.select,
            ...fieldColors(disabled),
            cursor: disabled ? "not-allowed" : "pointer",
          }}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          size={CHEVRON_SIZE}
          color={colors.textSecondary}
          style={styles.chevron}
        />
      </div>
    </div>
  );
}

const styles = {
  field: { position: "relative" },
  select: {
    width: "100%",
    height: 40,
    appearance: "none",
    border: `1px solid ${colors.borderSubtle}`,
    borderRadius: radius.md,
    paddingInlineStart: spacing[2.5],
    paddingInlineEnd: spacing[3] + CHEVRON_SIZE + spacing[2.5],
    ...typography.textMd,
  },
  chevron: {
    position: "absolute",
    top: "50%",
    insetInlineEnd: spacing[3],
    pointerEvents: "none",
    transform: "translateY(-50%)",
  },
} satisfies Record<string, React.CSSProperties>;
