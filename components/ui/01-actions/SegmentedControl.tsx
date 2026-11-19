import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

export interface SegmentedOption<T extends string> {
  value: T;
  label: React.ReactNode;
}

export interface SegmentedControlProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  label: string;
  style?: React.CSSProperties;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onValueChange,
  label,
  style,
}: SegmentedControlProps<T>) {
  return (
    <div role="group" aria-label={label} style={{ ...styles.root, ...style }}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              onValueChange(option.value);
            }}
            style={{
              ...styles.option,
              backgroundColor: isActive ? colors.primary : "transparent",
              color: isActive ? colors.baseWhite : colors.textSecondary,
            }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  root: {
    display: "inline-flex",
    height: 33,
    alignItems: "center",
    gap: spacing[1],
    borderRadius: radius.full,
    backgroundColor: colors.grey100,
    padding: 3,
  },
  option: {
    display: "inline-flex",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    border: 0,
    borderRadius: radius.full,
    padding: `0 ${px(spacing[4])}`,
    whiteSpace: "nowrap",
    cursor: "pointer",
    ...typography.textSmSemibold,
  },
} satisfies Record<string, React.CSSProperties>;
