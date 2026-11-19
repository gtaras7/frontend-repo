"use client";

import { OptionRow } from "@/components/ui";
import { px, spacing } from "@/design-tokens/tokens";

interface BaselineRadioGroupProps<T extends string> {
  name: string;
  label: string;
  options: readonly T[];
  getLabel: (value: T) => string;
  selected: T | undefined;
  disabled: boolean;
  onChange: (value: T) => void;
}

export function BaselineRadioGroup<T extends string>({
  name,
  label,
  options,
  getLabel,
  selected,
  disabled,
  onChange,
}: BaselineRadioGroupProps<T>) {
  return (
    <div role="radiogroup" aria-label={label} style={styles.options}>
      {options.map((value) => (
        <OptionRow
          key={value}
          name={name}
          value={value}
          label={getLabel(value)}
          checked={selected === value}
          disabled={disabled}
          onChange={() => {
            onChange(value);
          }}
          style={{ ...styles.option, borderWidth: selected === value ? 2 : 1 }}
        />
      ))}
    </div>
  );
}

const styles = {
  options: { display: "flex", flexDirection: "column", gap: px(spacing[2.5]) },
  option: { minHeight: 52 }, // Drift W21: Figma baseline option rows.
} satisfies Record<string, React.CSSProperties>;
