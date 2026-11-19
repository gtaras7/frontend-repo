import type { CSSProperties } from "react";

import { colors, px, spacing } from "@/design-tokens/tokens";

interface LabeledSeparatorProps {
  label?: string;
  className?: string;
  style?: CSSProperties;
  lineColor: string;
  lineMinWidth: number;
  labelTypography: CSSProperties;
}

export function LabeledSeparator({
  label,
  className,
  style,
  lineColor,
  lineMinWidth,
  labelTypography,
}: LabeledSeparatorProps) {
  const line: CSSProperties = {
    flex: "1 0 0",
    minWidth: lineMinWidth,
    height: 1,
    backgroundColor: lineColor,
  };

  return (
    <div role="separator" className={className} style={{ ...rootStyle, ...style }}>
      <span aria-hidden="true" style={line} />
      {label !== undefined && (
        <span style={{ ...labelTypography, color: colors.textTertiary }}>{label}</span>
      )}
      <span aria-hidden="true" style={line} />
    </div>
  );
}

const rootStyle = {
  display: "flex",
  alignItems: "center",
  gap: px(spacing[3]),
} satisfies CSSProperties;
