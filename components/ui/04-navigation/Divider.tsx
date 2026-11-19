import { LabeledSeparator } from "@/components/ui/LabeledSeparator";
import { colors, px, spacing, typography } from "@/design-tokens/tokens";

export interface DividerProps {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Divider({ label, className, style }: DividerProps) {
  return (
    <LabeledSeparator
      label={label}
      className={className}
      style={{ padding: `0 ${px(spacing[6])}`, ...style }}
      lineColor={colors.grey200}
      lineMinWidth={0}
      labelTypography={typography.textSm}
    />
  );
}
