# components/ui — design-system primitives

**All 7 sections of the Figma Components page are ported (42 components), organised in one
section folder per Figma section.** Figma is the source of truth — not the vendored
`Design System/` export, which is stale (it documents Button variants that do not exist).

**Nothing gets invented here.** Every component is ported from Figma via Dev Mode
from the frame linked in the ticket,
using the tokens from `design-tokens/tokens.ts`. If a screen needs something this folder does not
have, you port it here **once**, in the matching section folder, then everyone imports it.

## Import like this

```tsx
// Option A: Root design system barrel
import { Button, Badge, TextInput } from "@/components/ui";

// Option B: Section barrel
import { Button } from "@/components/ui/01-actions";
import { Badge } from "@/components/ui/03-feedback";

// Option C: Direct path
import { Button } from "@/components/ui/01-actions/Button";
```

The folder number matches the Figma section number, so finding a component means remembering
where it sat in Figma — nothing else.

## The sections

### `01-actions/` — 01 • Actions & Interactive Controls
Figma section `567:3271` — 7 components

| Component | Figma node | Notes |
|---|---|---|
| [`Button`](01-actions/Button.tsx) | set 96:16 | Primary/Secondary/Outline × sm/md/lg × Default/Disabled/Loading |
| [`IconButton`](01-actions/IconButton.tsx) | 4:44 | 38×38 circle, grey-100, 16px Lucide icon slot, label required |
| [`HeaderActionButton`](01-actions/HeaderActionButton.tsx) | 616:3319 | primary, radius 10, Lucide plus at 24px |
| [`SegmentedControl`](01-actions/SegmentedControl.tsx) | 96:306 | generic options/value; active segment primary |
| [`Chip`](01-actions/Chip.tsx) | set 458:148 | filter chip, aria-pressed; Default vs Selected |
| [`Switch`](01-actions/Switch.tsx) | set 211:752 | role=switch; 44×26, knob 20px inset 3px |
| [`Checkbox`](01-actions/Checkbox.tsx) | set 366:56 | controlled only; Unchecked/Checked |

### `02-forms/` — 02 • Form Inputs & Selection
Figma section `567:3293` — 4 components

| Component | Figma node | Notes |
|---|---|---|
| [`TextInput`](02-forms/TextInput.tsx) | set 73:24 | Default/Focus/Disabled/Error collapsed to errorText + disabled + CSS focus |
| [`Select`](02-forms/Select.tsx) | 75:4 | native <select>, chevron-down 20px, radius 10 |
| [`Textarea`](02-forms/Textarea.tsx) | 75:14 | native <textarea>, 96px box, right-aligned hint |
| [`OptionRow`](02-forms/OptionRow.tsx) | set 491:372 | radio row; ⚠️ 20px tall in Figma — see its defect note |

### `03-feedback/` — 03 • Feedback, Status & Progress
Figma section `567:3306` — 8 components

| Component | Figma node | Notes |
|---|---|---|
| [`Badge`](03-feedback/Badge.tsx) | set 513:2088 | 5 tones; strong colour on text, -light on background |
| [`Callout`](03-feedback/Callout.tsx) | set 4:31 | Info/Warning/Danger; Lucide shield/alert glyphs |
| [`Toast`](03-feedback/Toast.tsx) | 99:9 | accent bar + icon dot + copy + dismiss (role=status, 44px hit area) |
| [`ProgressRing`](03-feedback/ProgressRing.tsx) | 99:8 | role=progressbar; track grey200 / arc primary, 8px stroke |
| [`ProgressDots`](03-feedback/ProgressDots.tsx) | set 395:936 | step 1..9; current step is a 24×8 pill |
| [`Skeleton`](03-feedback/Skeleton.tsx) | 101:10 | grey bars + 3-up block grid, aria-hidden, optional label |
| [`SkeletonList`](03-feedback/SkeletonList.tsx) | 458:179 | 5 grey bars, widths in %, aria-hidden, optional label |
| [`EmptyState`](03-feedback/EmptyState.tsx) | 101:4 | icon circle + title + body + primary pill action |

### `04-navigation/` — 04 • Navigation, Lists & Structure
Figma section `567:3331` — 8 components

| Component | Figma node | Notes |
|---|---|---|
| [`Sidebar`](04-navigation/Sidebar.tsx) | 12:2 | 264px charcoal chrome; all content via slots; CTA routes through Button |
| [`SidebarNavItem`](04-navigation/SidebarNavItem.tsx) | set 177:33 | Active/Inactive; link or button, aria-current |
| [`Avatar`](04-navigation/Avatar.tsx) | set 4:43 | Primary/Neutral × sm(32)/md(40); initials only |
| [`BrandFooter`](04-navigation/BrandFooter.tsx) | 464:384 | two tertiary lines, i18n at call site |
| [`Divider`](04-navigation/Divider.tsx) | 458:162 | optional centred label, role=separator |
| [`ListRow`](04-navigation/ListRow.tsx) | 458:168 | surface/page card + trailing slot |
| [`ListItem`](04-navigation/ListItem.tsx) | 458:172 | surface/page card, 14px title |
| [`LanguageSelector`](04-navigation/LanguageSelector.tsx) | 616:3267 | pill + native select; options in / value out |

### `05-data/` — 05 • Data Display, Metrics & Charts
Figma section `567:3353` — 5 components

| Component | Figma node | Notes |
|---|---|---|
| [`MetricCard`](05-data/MetricCard.tsx) | set 196:67 | Success/Warning/Danger accent bar; 26px value (drift #41) |
| [`RiskGauge`](05-data/RiskGauge.tsx) | 98:4 | 3 segments + needle, role=meter |
| [`LineChart`](05-data/LineChart.tsx) | 96:345 | data-driven SVG rebuild of the static mock; chart tokens |
| [`InfoCard`](05-data/InfoCard.tsx) | set 458:157 | Neutral/Primary tones |
| [`ReviewRow`](05-data/ReviewRow.tsx) | set 513:200 | Answered/Missing states |

### `06-chat/` — 06 • Chat & AI Conversation Primitives
Figma section `567:3372` — 4 components

| Component | Figma node | Notes |
|---|---|---|
| [`ChatBubble`](06-chat/ChatBubble.tsx) | set 211:755 | AI (white, left) / User (primary-light, right); max 560px |
| [`ChatComposer`](06-chat/ChatComposer.tsx) | 243:35 | pills + input + send + mandatory safety disclaimer |
| [`TypingIndicator`](06-chat/TypingIndicator.tsx) | 77:320 | animated dots gated behind prefers-reduced-motion, role=status |
| [`DateDivider`](06-chat/DateDivider.tsx) | 77:324 | hairlines + label, role=separator |

### `07-clinical/` — 07 • Clinical Cards, Banners & Documentation
Figma section `567:3388` — 6 components

| Component | Figma node | Notes |
|---|---|---|
| [`VisitSummaryCard`](07-clinical/VisitSummaryCard.tsx) | 550:3232 | provenance badge (clinician-entered) + tag row |
| [`AiInsightPanel`](07-clinical/AiInsightPanel.tsx) | 550:3257 | AI insight with MANDATORY sources + not-a-diagnosis line |
| [`EmergencyInterruptBanner`](07-clinical/EmergencyInterruptBanner.tsx) | 550:3287 | role=alert; both actions required; pause note mandatory |
| [`CheckInContextCard`](07-clinical/CheckInContextCard.tsx) | 529:133 | user-reported provenance pill; unreported-value state |
| [`ConversationErrorCard`](07-clinical/ConversationErrorCard.tsx) | 616:3343 | danger text + Primary/Outline actions |
| [`RiskFactorTag`](07-clinical/RiskFactorTag.tsx) | 616:3363 | grey pill + dot; label weight 500 pending #39b |

## Not ported / not in Figma as code-ready components

`Toast`'s animation, `TypingIndicator`'s dots, and the Switch/OptionRow radio states are rebuilt
in code where Figma ships static art (each file documents why). The 41 icons on Figma page
`77:315` are consumed via `lucide-react` (same Lucide set) — not ported as files.

Exported brand and onboarding artwork from `design-tokens/icons/icons-figma.ts` is rendered
through the shared `AssetIcon` in `components/ui/AssetIcon.tsx`. Features import that renderer
directly rather than sharing feature-specific helpers.

## How to port one

1. `get_design_context` on the component **set** node (not an instance — instances carry overrides).
2. Read the variant matrix: style × size × state. Implement exactly those; add nothing.
3. Map every fill/border/text to a token from `design-tokens/tokens.ts`.
4. Real semantic element (`<button>`, `<input>`, `role="switch"`...), accessible name, focus ring.
5. Verify with `npm run lint && npm run typecheck && npm run build`.

## Rules

- Port the props and variants as designed. Don't add variants nobody asked for.
- No hardcoded hex/px/font — everything from the token module.
- Focus ring on every interactive element, real accessible name on every control.
- Off-scale values found in Figma are used as literals ONLY with a comment citing the drift item
  (e.g. `OptionRow`'s 20px height, `MetricCard`'s 26px value).
