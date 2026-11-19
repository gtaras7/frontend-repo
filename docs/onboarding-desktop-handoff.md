# CardioGuard AI — Onboarding Desktop Handoff (US 001–009)

**Design reference:** the `Onboarding Flowboard` page. Ask a maintainer for the frame linked to your ticket.
**Screenshots:** `demo_screens/new_design/01-03 …`, `04-05 …`, `06-09 …` (one PNG per screen, named after the Figma frame).

The Figma onboarding frames are **desktop web, 1440×900**. The split frames share this layout:

- **Left brand column (800px)** — ProgressDots (step indicator), Agios Loukas partner logo, CardioGuard wordmark + tagline, privacy footer. Background `surface/page`.
- **Right content panel (640px)** — white `surface/card` with `shadow-lg`. Summary starts at the top. The Dashboard panel can grow vertically to keep its actions reachable.

Preparation uses a full-page loading view. Preparation Error returns to the split layout.

## Route mapping

URLs carry an `el` or `en` locale prefix. Every visible string lives in `i18n/el.json` and `i18n/en.json`.

| # | Figma frame (id) | URL without locale prefix | Notes |
|---|---|---|---|
| 01 | `Web / 01 Splash` (407:103) | `/onboarding` | Shown while bootstrapping the session. |
| 01e | `Web / 01 Splash Error` (407:104) | same route, retry state | "Try again" re-runs bootstrap. |
| 02 | `Web / 02 Welcome` (407:105) | `/onboarding/welcome` | Get started opens consent. Login is pending. |
| 03 | `Web / 03 Consent` (407:106) | `/onboarding/consent` | Both checkboxes are required to enable the submit button. NestJS owns durable consent records. |
| 03e | `Web / 03 Consent Error` (407:107) | same route, rejection state | A rejected submission keeps both selections and announces the error. |
| 04 | `Web / 04 Account Setup` (420:181) | `/register` | Uses an opt-in demo account until the NestJS registration contract is available. |
| 04v | `Web / 04 Account Validation` (420:183) | same route, field errors | Error fields and a warning callout explain why the account was not created. |
| 04g | `Web / 04 Guest Path` (420:185) | `/onboarding/guest` (planned) | Reversible local-only mode. |
| 05a | `Web / 05 Baseline Age` (420:187) | `/onboarding/baseline/age` | Skip records a missing answer. |
| 05h | `Web / 05 Baseline Health History` (420:189) | `/onboarding/baseline/health` | User-reported conditions with multi-select chips. |
| 05l | `Web / 05 Baseline Lifestyle` (420:191) | `/onboarding/baseline/lifestyle` | Optional activity and smoking radios. |
| 05g | `Web / 05 Baseline Goals` (420:193) | `/onboarding/baseline/goals` | Multi-select for education. |
| 05v | `Web / 05 Baseline Validation` (420:195) | `/onboarding/baseline/health` validation state | An implausible height opens the correction form. |
| 06 | `Web / 06 Permissions` (432:310) | `/onboarding/permissions` | Reminders preference and a location notice. |
| 07 | `Web / 07 Preparation` (432:312) | `/onboarding/preparation` | Loading state with spinner and skeleton. |
| 07e | `Web / 07 Preparation Error` (432:314) | same route, failure state | Retry or continue to basic dashboard. |
| 08 | `Web / 08 Starting Summary` (432:316) | `/onboarding/summary` | Reported, missing and suggested sections. |
| 09 | `Web / 09 Dashboard` (432:318) | `/onboarding/dashboard` | First-run home. The app shell's Health route is `/dashboard`. |
| 09e | `Web / 09 Dashboard Error` (432:320) | same route, failure state | Retry keeps onboarding answers. |
| 09s | `Web / 09 Dashboard Skipped` (432:322) | same route, `?profile=empty` | Skipping every baseline question leaves core education available. |

The demo places baseline under `app/[locale]/(auth)/(split)/onboarding/baseline/` and steps 6–9
under `app/[locale]/(auth)/onboarding/(setup)/`. Registration, baseline and steps 6–9 use the
interim consent gate. Session ownership, the progress endpoint and final route grouping remain
part of the NestJS handoff. Both acknowledgements are required; see the [consent form](../components/features/onboarding/ConsentForm.tsx). The [demo account](../lib/api/mock-account.ts) defines synthetic fixtures and failure switches.

## Shared building blocks (all already in the design system)

| Piece | Figma | Component / token |
|---|---|---|
| Step indicator | `ProgressDots` (395:936) | Variants `Step=1..9`; `inst.setProperties({ Step: '3' })` |
| Alerts | `Callout` (4:31) | `Tone=Info / Warning / Danger`; Danger = blocking errors only |
| Consent checks | `Checkbox` (366:56) | `State=Unchecked / Checked` |
| Account toggles | `Switch` (211:752) | `State=On / Off` |
| Inputs | `TextInput` (73:24) | `State=Default / Focus / Disabled / Error` |
| Actions | `Button` (96:16) | lg for primary CTAs, md for secondary; Disabled/Loading variants exist |
| Chips (multi-select) | built inline on 05 screens | candidate for a `Chip` component if reused elsewhere |
| Partner logo | image on all screens | `agiosLoukas_logo.png` (transparent, 1181×433) |
| ProgressDots gallery doc | Components page | "Onboarding additions" card documents steps + rules |

## Implementation notes

1. **State machine, not pages.** Steps 1–9 are one flow with persisted progress; deep links into a later step must redirect to the furthest incomplete step (consent is a hard gate before anything else).
2. **Consent is server-validated.** The disabled "Accept & continue" is UX only; NestJS must reject any payload without both consent records.
3. **"Not requested" ≠ disabled.** Location has no toggle at all until a product decision grants a purpose — do not render it as a switch.
4. **Skip semantics.** Every optional screen (05 series) writes an explicit `missing` value so downstream guidance can say "we don't know" instead of assuming.
5. **Errors never lose data.** All error screens (01e, 04v, 05v, 07e, 09e) guarantee answers are retained; retry resumes, not restarts.
6. **i18n.** Copy in this doc is reference English; ship `el.json` + `en.json` keys per screen (`onboarding.step03.consentTitle` etc.). Greek review needed before launch (partner hospital is Greek-facing).
7. **A11y baseline.** Error callouts announce via `role="alert"`; checkbox rows are real `<label>`+`<input type="checkbox">`; focus ring token on all interactive elements.

## Design-system additions made during this work

- `ProgressDots` upgraded from a single-state component to a `Step=1..9` variant set (documented on the Components page gallery card).
- `Callout` gained `Tone=Danger`; all tones reflowed (fixed-width text clipping bug) and given a white icon bubble.
- `Checkbox Checked` master fixed to 22×22 with centered glyph.
- `Badge` tone fills bound to `status/*-light` + `grey/100` tokens (were hardcoded mid-grey).
- Tokens: re-synced against Figma — all 21 exported color variables match; no export change required.
