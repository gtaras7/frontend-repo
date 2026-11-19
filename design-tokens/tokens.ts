/**
 * CardioGuard AI design tokens.
 *
 * This is the single source of truth for web React, React Native, and JavaScript consumers.
 * Values stay platform-neutral here: web React and React Native can consume the same colors,
 * numbers, typography, and shadow parts directly.
 *
 * Source: the project Figma design system.
 */

export const colors = {
  // ---- Brand and primary action colors. ----
  primary:      "#EC6707",
  primaryLight: "#FDF1E7",
  neutralDark:  "#2B2C2E",

  // ---- Page and component surfaces. ----
  surfacePage: "#F8F9FA",
  surfaceCard: "#FFFFFF",
  baseWhite:   "#FFFFFF",

  // ---- Text hierarchy. ----
  textPrimary:   "#343434",
  textSecondary: "#6B6B6D",
  textTertiary:  "#8A8B8D",

  // ---- Borders and dividers. ----
  borderSubtle:  "#ECECEC",
  borderDefault: "#D9D9DA",

  // ---- Neutral grey scale. ----
  grey100: "#F1F1F1",
  grey200: "#E5E5E6",
  grey400: "#B0B0B2",
  grey500: "#8A8A8C",

  // ---- Health and validation states. ----
  status: {
    success:      "#1FA971",
    successLight: "#E7F7F0",
    warning:      "#D98B1F",
    warningLight: "#FDF1E0",
    danger:       "#E5484D",
    dangerLight:  "#FCE9E9",
  },

  //  ---- Data visualisation colors. ----
  chart: {
    series1: "#EC6707",
    series2: "#1FA971",
    axis:    "#8A8B8D",
    grid:    "#ECECEC",
  },

  // ---- Icon and keyboard-focus colors. ----
  iconDefault: "#6B6B6D",
  focusRing:   "rgba(236, 103, 7, 0.35)",
} as const;

export const radius = {
  xs: 4,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 12,
  full: 999,
} as const;

export const spacing = {
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

const fontFamily = "Inter";

export const typography = {
  fontFamily,

  // ---- Caption and extra-small text. ----
  captionXs: { fontFamily, fontWeight: 600, fontSize: 11, lineHeight: 1.3 },
  textXs:    { fontFamily, fontWeight: 400, fontSize: 12, lineHeight: 1.4 },

  // ---- Small text styles and weight variants. ----
  textSm:         { fontFamily, fontWeight: 400, fontSize: 13, lineHeight: 1.4 },
  textSmMedium:   { fontFamily, fontWeight: 500, fontSize: 13, lineHeight: 1.4 },
  textSmSemibold: { fontFamily, fontWeight: 600, fontSize: 13, lineHeight: 1.4 },

  // ---- 14px and medium body text styles. ----
  text14:         { fontFamily, fontWeight: 400, fontSize: 14, lineHeight: 1.4 },
  text14Semibold: { fontFamily, fontWeight: 600, fontSize: 14, lineHeight: 1.4 },
  textMd:         { fontFamily, fontWeight: 400, fontSize: 15, lineHeight: 1.45 },
  textMdSemibold: { fontFamily, fontWeight: 600, fontSize: 15, lineHeight: 1.45 },

  // ---- Larger interface text and headings. ----
  text16Semibold: { fontFamily, fontWeight: 600, fontSize: 16, lineHeight: 1.45 },
  textLgSemibold: { fontFamily, fontWeight: 600, fontSize: 18, lineHeight: 1.35 },
  textXlBold:     { fontFamily, fontWeight: 700, fontSize: 22, lineHeight: 1 },

  // ---- Prominent clinical values and display text. ----
  valueXlBold:    { fontFamily, fontWeight: 700, fontSize: 26, lineHeight: 1.05 },
  display2xlBold: { fontFamily, fontWeight: 700, fontSize: 34, lineHeight: 1.05 },
} as const;

export const opacity = {
  disabled: 0.4,
} as const;

export const shadows = {
  sm: { x: 0, y: 1, blur: 3, spread: 0, color: "#1A1A1A", opacity: 0.08 },
  lg: { x: 0, y: 12, blur: 32, spread: -4, color: "#1A1A1A", opacity: 0.16 },
} as const;

export const tokens = {
  colors,
  radius,
  spacing,
  typography,
  opacity,
  shadows,
} as const;

export type DesignTokens = typeof tokens;

export function px(value: number) {
  return `${value}px`;
}

export function shadowCss(shadow: (typeof shadows)[keyof typeof shadows]) {
  const red = Number.parseInt(shadow.color.slice(1, 3), 16);
  const green = Number.parseInt(shadow.color.slice(3, 5), 16);
  const blue = Number.parseInt(shadow.color.slice(5, 7), 16);
  return `${px(shadow.x)} ${px(shadow.y)} ${px(shadow.blur)} ${px(shadow.spread)} rgba(${String(red)}, ${String(green)}, ${String(blue)}, ${shadow.opacity})`;
}
