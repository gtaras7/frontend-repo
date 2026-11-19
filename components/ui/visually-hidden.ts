import type { CSSProperties } from "react";

export const clippedLabel = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
} satisfies CSSProperties;

export const visuallyHidden: CSSProperties = {
  ...clippedLabel,
  padding: 0,
  margin: -1,
  whiteSpace: "nowrap",
  borderWidth: 0,
};
