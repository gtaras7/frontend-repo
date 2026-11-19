# CardioGuard AI — Design Tokens

Generated from the Figma design system
used by the project
(variables: **Color** + **Layout** collections, text styles, effect styles).

`tokens.ts` is the source of truth for web React, React Native, and JavaScript. If a value
disagrees with an older export in the repo, this TypeScript map wins.

## Files

| File | Use |
|---|---|
| `tokens.ts` | Typed, platform-neutral tokens for React, React Native, and JavaScript. |
| `icons/icons-figma.ts` | Icon name list, Figma node ids, and raw SVG markup (platform-neutral). Web rendering lives in `components/ui/AssetIcon.tsx`. |

## Quick start (web React)

There is **no Tailwind and no CSS framework** in this project. Import the token module and apply
values through the `style` prop. Never write a hex, a px size or a font stack by hand.

```tsx
import { colors, px, radius, spacing, typography } from "@/design-tokens/tokens";

<div
  style={{
    backgroundColor: colors.surfaceCard,
    border: `1px solid ${colors.borderDefault}`,
    borderRadius: radius.md,
    padding: px(spacing[4]),
    color: colors.textPrimary,
    ...typography.textMd,
  }}
/>
```

`px()` turns a numeric token into a CSS length. Status chips pair the strong colour with its
`-light` variant:

```tsx
<span style={{ backgroundColor: colors.status.successLight, color: colors.status.success }} />
```

Typography entries are ready to spread (`...typography.textSmSemibold`), and
`shadowCss(shadows.sm)` returns a box-shadow string.

### The few values CSS needs

There is no `app/globals.css` and no `tokenCss()` helper. The document box-sizing reset and the
`:focus-visible` focus ring are inlined once in `app/[locale]/layout.tsx`, interpolating
`colors.focusRing` (and related) straight from this module. Do not add a second global CSS file —
extend that layout `<style>` block with token values only.

## Type scale (Figma style -> token)

| Figma | `typography` key |
|---|---|
| Caption/XS Semibold Uppercase | `captionXs` (plus uppercase + 0.06em letter-spacing) |
| Text/XS Regular | `textXs` |
| Text/SM Regular | `textSm` |
| Text/SM Semibold | `textSmSemibold` |
| Text/MD Regular | `textMd` |
| Text/MD Semibold | `textMdSemibold` |
| Text/LG Semibold | `textLgSemibold` |
| Text/XL Bold | `textXlBold` |
| Display/2XL Bold | `display2xlBold` |

## React Native

The planned React Native app can reuse the numeric spacing and radius tokens and the same colors.
Apply typography to a React Native `Text` component after converting the web line-height ratio to
the distance between native text baselines. Load Inter with the mobile app and use its registered
family name. [React Native Text Style Props](https://reactnative.dev/docs/text-style-props#lineheight)

```ts
import { colors, spacing, typography } from "./design-tokens/tokens";

const surfaceStyle = {
  backgroundColor: colors.surfaceCard,
  padding: spacing[4],
};

const { lineHeight, ...textMd } = typography.textMd;
const textStyle = {
  ...textMd,
  lineHeight: textMd.fontSize * lineHeight,
};
```

## Ground rules

1. **Never hardcode a value.** Import from `tokens.ts`. A hex, a px size or a font stack inside a
   component is a bug.
2. **Orange (`colors.primary`) = action only.** Buttons, links, active nav. Never health status.
3. **Status colours = health signals only.** success = on track, warning = watch closely,
   danger = act now. Chips pair `status/X` (text) with `status/X-light` (background).
4. **Focus ring:** every interactive element gets a 3px `colors.focusRing` outline on
   `:focus-visible`. That is wired once in `app/[locale]/layout.tsx` — do not override it away.
5. **Disabled:** `opacity.disabled` (40%).
6. Missing a token? Ask design. Do not invent values.
