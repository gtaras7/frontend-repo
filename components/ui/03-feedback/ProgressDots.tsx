import { colors, radius, spacing } from "@/design-tokens/tokens";

export interface ProgressDotsProps {
  step: number;
  total?: number;
  label: string;
  style?: React.CSSProperties;
}

export function ProgressDots({ step, total = 9, label, style }: ProgressDotsProps) {
  const steps = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={total}
      style={{ ...styles.root, ...style }}
    >
      {steps.map((index) => {
        const isCurrent = index === step;
        return (
          <span
            key={index}
            aria-hidden="true"
            style={{
              ...styles.dot,
              width: isCurrent ? 24 : 8,
              backgroundColor: index <= step ? colors.primary : colors.grey200,
            }}
          />
        );
      })}
    </div>
  );
}

const styles = {
  root: {
    display: "flex",
    height: 8,
    alignItems: "center",
    gap: spacing[1.5],
  },
  dot: {
    display: "block",
    height: 8,
    borderRadius: radius.xs,
  },
} satisfies Record<string, React.CSSProperties>;
