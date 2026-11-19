import { ChevronDown } from "lucide-react";

import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface LanguageOption {
  value: string;
  label: string;
}

export interface LanguageSelectorProps {
  options: readonly LanguageOption[];
  value: string;
  onValueChange: (value: string) => void;
  /** Accessible name, e.g. "Language". i18n string. */
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export function LanguageSelector({
  options,
  value,
  onValueChange,
  label,
  className,
  style,
}: LanguageSelectorProps) {
  return (
    <div className={className} style={{ ...styles.root, ...style }}>
      <ChevronDown size={14} aria-hidden="true" style={styles.chevron} />

      <select
        aria-label={label}
        value={value}
        onChange={(event) => {
          onValueChange(event.target.value);
        }}
        style={styles.select}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const styles = {
  root: {
    display: "inline-flex",
    alignItems: "center",
    gap: px(spacing[1.5]),
    padding: `${px(spacing[2.5])} ${px(13)}`,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.borderDefault}`,
  },
  chevron: { color: colors.textSecondary },
  select: {
    appearance: "none",
    border: "0",
    backgroundColor: "transparent",
    color: colors.textSecondary,
    cursor: "pointer",
    padding: 0,
    ...typography.textSmSemibold,
  },
} satisfies Record<string, React.CSSProperties>;
