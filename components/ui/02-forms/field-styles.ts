import type { CSSProperties } from "react";

import { colors, spacing, typography } from "@/design-tokens/tokens";

export const fieldRoot = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  gap: spacing[1.5],
} satisfies CSSProperties;

export const fieldLabel = { color: colors.textPrimary, ...typography.textSmSemibold };

export function fieldDescriptionIds(localId?: string, externalIds?: string) {
  return [localId, externalIds].filter(Boolean).join(" ") || undefined;
}

export function fieldColors(disabled?: boolean) {
  return {
    backgroundColor: disabled ? colors.grey100 : colors.surfaceCard,
    color: disabled ? colors.textTertiary : colors.textPrimary,
  };
}
