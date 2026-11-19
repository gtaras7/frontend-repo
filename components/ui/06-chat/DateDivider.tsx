import { LabeledSeparator } from "@/components/ui/LabeledSeparator";
import { colors, typography } from "@/design-tokens/tokens";

export interface DateDividerProps {
  /** e.g. "Today". i18n string. */
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export function DateDivider({ label, className, style }: DateDividerProps) {
  return (
    <LabeledSeparator
      label={label}
      className={className}
      style={style}
      lineColor={colors.borderSubtle}
      lineMinWidth={60}
      labelTypography={typography.textXs}
    />
  );
}
