# CardioGuard AI — Frontend AI Prompt Pack

For frontend contributors.
**Use these prompts instead of freestyle chatting with an AI.** They're built so that Claude, GPT, Gemini, Copilot and Cursor all land on the same code.

---

## The thing that actually makes the code look the same

Prompts alone won't do it. Two students on two different models will still diverge. What keeps a codebase consistent is this, in order of strength:

| Layer | What it does | Where |
|---|---|---|
| **1. Repo rules file** | Every repo-aware AI tool reads it automatically before it writes a line. This is why the code stays consistent across models. | `AGENTS.md` at repo root |
| **2. Linter / formatter / CI** | Rules that can be checked mechanically should be. Nobody argues with a failing check. | ESLint + Prettier + husky pre-commit + CI gate |
| **3. Prompts (this doc)** | Only the judgment calls a linter can't check: design fidelity, structure, edge cases. | the 5 prompts below |

**Rule of thumb: if a rule can be enforced by lint, enforce it there. Prompt only for the things lint can't see.**

So before any prompt below works, Step 0 has to be true.

---

## Step 0 — Repo setup (do once, as a team)

Every student's repo must have these at the root, or the prompts reference files that don't exist:

- [ ] `AGENTS.md` — copy from the project folder. This is the single rules file.
- [ ] `design-tokens/` — `tokens.ts`, `README.md`
- [ ] `Design System/CardioGuard AI Design System/` — `design.md`, `readme.md`, `components/*/`, `ui_kits/cardioguard-web/`
- [ ] `docs/onboarding-desktop-handoff.md` — route map + layout rules
- [ ] `demo_screens/` — reference screenshots
- [ ] `.prettierrc` — one format, applied on save
- [ ] `eslint.config.mjs` — `typescript-eslint` strict, import order, no-`any`, no silenced compiler errors
- [ ] `.husky/pre-commit` — `lint-staged` → lint + format on commit. This is what stops the sloppy code from ever entering git.
- [ ] CI job on the PR — `lint` + `tsc --noEmit` + `build`. Merge blocked when red.

Same repo, same config, same rules for all five of you. That's the part that actually holds.

## Ground rules for the students

1. **Use a tool that can read files** — Claude Code, Cursor, Copilot agent mode, Codex CLI. Don't screenshot Figma into a plain chat and copy-paste code out, you lose all project context.
2. **One screen / one feature per branch.** Small PRs only. AI works better on a small scope and the review stays sane.
3. **Run the prompt, read the output, don't blind-accept it.** You are accountable for what you commit, not the model.
4. **Never paste real patient data.** Synthetic data only — including in prompts.
5. **If the AI invents a component, a token, or a colour: reject it.** Missing token → ask design.

---

## Prompt 1 — Implement a screen from the Figma design

Use for: building any new screen or section.

```xml
<role>
Senior frontend engineer implementing ONE screen in the CardioGuard AI frontend: Next.js 16 App
Router, TypeScript, TanStack Query, next-intl, Zustand for UI state only. Follow this repo's
conventions exactly; never port patterns in from another project.
</role>

<style_do_this_first>
Inline styles driven by `design-tokens/tokens.ts`, a platform-neutral token module shared with the
React Native app. There is NO Tailwind, NO shadcn/ui, NO CSS framework, NO tailwind.config. Do not
add one, do not use utility classes, do not reach for a UI library. Install nothing, ask instead.
</style_do_this_first>

<read_first>
1. AGENTS.md (root) — rules, non-negotiables. If it conflicts with this prompt, AGENTS.md wins.
2. Its Next.js 16 note, then node_modules/next/dist/docs/ for each Next API you use — this version
   differs from your training data, so do not write one from memory.
3. design-tokens/tokens.ts — the only colour, spacing, radius, type and shadow values. Import
   { colors, spacing, radius, typography, shadows, px } from "@/design-tokens/tokens"; apply via `style`.
4. components/ui/README.md — the only source of UI primitives.
5. design-tokens/README.md — how to use the shared tokens.
6. docs/onboarding-desktop-handoff.md — route map, layout, per-screen notes.
7. The finished screen closest to yours (the consent slice) — copy its shape.
</read_first>

<task>
Screen: [NAME]
Figma frame: [link to the frame from the ticket]
Screenshots: [demo_screens/...]
Route: [app/[locale]/...]
Acceptance criteria: [paste ticket]
A blank line means ask, do not invent.
</task>

<figma_is_the_source_of_truth>
It wins over the PNG and over every other source.
- Read the frame via Figma MCP. Walk the tree for structure and
  copy, then re-read those nodes for fontSize, fontName, cornerRadius, fills and instance variant
  names (e.g. `Style=Primary lg Disabled`).
- Guard text reads — not every node has `characters`. Read the component SET, never an instance.
- The vendored `Design System/` export is stale; components/ui/ beats it, Figma beats both.
- Frame contradicts an earlier screen's geometry? Flag it, do not silently pick one.
</figma_is_the_source_of_truth>

<reuse_never_hand_roll>
Button, IconButton, HeaderActionButton, SegmentedControl, Chip, Switch, Checkbox, TextInput, Select,
Textarea, OptionRow, Badge, Callout, Toast, ProgressRing, ProgressDots, Skeleton, SkeletonList,
EmptyState, Sidebar, SidebarNavItem, Avatar, BrandFooter, Divider, ListRow, ListItem,
LanguageSelector, MetricCard, RiskGauge, LineChart, InfoCard, ReviewRow, ChatBubble, ChatComposer,
TypingIndicator, DateDivider, VisitSummaryCard, AiInsightPanel, EmergencyInterruptBanner,
CheckInContextCard, ConversationErrorCard, RiskFactorTag — all 42 are in components/ui/, import from
`@/components/ui` or a section barrel. Missing something? STOP and ask: it is ported from Figma once
into the matching section folder, never approximated inside components/features/.
</reuse_never_hand_roll>

<rules>
- Tokens only: no hardcoded hex/rgb, px, radii, gaps or shadows — even "just this once". Off-scale
  Figma value? Cite the frame and explain the exception in the PR and beside the literal.
- Orange #EC6707 = action only. Status colours = health signals only, never chrome, never decoration.
- No hardcoded strings: i18n/el.json + i18n/en.json, same key path, e.g.
  onboarding.step03.consentTitle. Write the Greek in the same pass — it runs longer than English.
- Server Component by default. 'use client' only for real interactivity or a browser API, on the
  smallest island that needs it, never on a whole screen "just in case".
- No API routes, no server actions, no prisma/db imports — that is NestJS and CI greps for it. Data
  via lib/api + TanStack Query. Zustand is UI state only, never a cache.
- Link, useRouter, usePathname from `@/i18n/navigation`, never from next/* — the plain imports drop
  the active locale.
- No `any`, no cast that only silences an error, no @ts-ignore/@ts-expect-error/eslint-disable. Fix
  the type instead.
- Every control: real semantic element, focus-ring token, accessible name. Errors: role="alert" +
  aria-live. Animation: gated behind prefers-reduced-motion.
- No real patient data anywhere — synthetic only.
- No new dependencies, no edits outside this screen's scope, no reformatting files you did not touch.
</rules>

<process_stop_where_i_say_stop>
1. Readiness report, no code. Exact sections: Route / Reuse (element to component) / Tokens (per
   property) / i18n keys / Client islands / Gaps (no matching component or token, or Figma vs design
   system conflict, each with your recommendation), plus which edge cases apply from loading, empty,
   error, disabled, slow network, long Greek strings, keyboard-only, reduced motion. Then STOP. Max 3
   questions. Clean mapping? Say "ready" and stop.
   Gap done right: GAP — "Share with my doctor": Figma shows a secondary-sm Button we do not have.
   Port it once into 01-actions/Button.tsx, or use the existing Button secondary md? Recommend
   porting — it repeats on 3 screens.
2. On my confirm: write it — route file, components/features/<feature>/, hooks/, both i18n files, an
   e2e/ spec if there is behaviour worth testing.
3. Self-review on real output: run `npm run lint`, `npm run typecheck`, `npm run format:check` and
   `npm run build`, paste the raw output, fix and re-run. Then list what you hardcoded (should be
   nothing), what you reused, what you assumed, what you could not verify. Revert stray files.
</process_stop_where_i_say_stop>

<never_yours>
Screenshot and design system disagree? Say so and ask, do not guess. Architecture, auth, streaming,
GDPR and final UX calls are never yours — stop and flag them for a human.
</never_yours>
```

## Prompt 2 — Investigate and fix a bug

Use for: something broken, an error, "it works locally but not in the build".

```xml
<role>
Debugging a CardioGuard AI frontend bug: Next.js 16 App Router, TypeScript, next-intl. I want the
root cause, not a symptom patch. Every claim you make needs output you actually ran.
</role>

<read_first>
AGENTS.md (root), then its Next.js 16 note and the matching guide in node_modules/next/dist/docs/
for any API in the failing path — this version differs from your training data (routing, caching,
params, server/client boundaries). Check the guide before theorising.
</read_first>

<bug_report>
Expected / Actual: [describe]
Reproduce: [1., 2., 3.]
Error / stack trace: [paste raw]
Files: [paths] · Route + locale: [e.g. /el/onboarding/consent] · Last change: [diff / what I touched]
Terminal, console and network output: [paste raw]
Also fails on `npm run build`, or only in dev? [yes/no/unknown] · On a fresh clone? [yes/no/unknown]
Synthetic data only — never real patient data in this report.
</bug_report>

<how_to_work>
1. One sentence on the bug, then the 2-3 most likely causes ranked, with your reasoning. No fix yet.
2. Name the cheapest check that would confirm or kill the top cause, run it, paste the raw result.
   Move to the next cause only if that one dies.
3. Then the smallest fix that removes the root cause, as a focused diff — not a rewritten file.
4. Prove it: re-run the failing command or spec and paste the output. "Should work now" is not a fix.
</how_to_work>

<usual_suspects>
- Locale: `Link`/`useRouter`/`usePathname` imported from `next/*` instead of `@/i18n/navigation` —
  silently drops the /el or /en prefix.
- Styling: a hardcoded value, a token that does not exist, or a hand-rolled element that
  `components/ui/` already covers.
- Data: server state cached in Zustand instead of TanStack Query, or a call bypassing `lib/api`. The
  onboarding mock is `lib/api/mock-onboarding.ts` — fix the call site or that mock, never add a
  second mock.
- i18n: a key present in `i18n/en.json` but missing from `i18n/el.json`, or a Greek string
  overflowing its container.
- Client/server: a Server Component touching a browser API, or `'use client'` where it never needed it.
- Runner: `playwright.config.ts` starts its own web server, so it misfires when a dev server is
  already running. Use `npx playwright test --config playwright.local.config.ts` instead of killing
  the server.
</usual_suspects>

<rules>
- No whole-file rewrites to fix a one-line bug. No new dependencies to work around it. No silencing:
  @ts-ignore, @ts-expect-error, eslint-disable, an empty try/catch, or a disabled/deleted spec are
  all failures.
- Match the project idiom — tokens, i18n in both locales, design-system reuse. "It compiles now" is
  not the goal, "it is correct and consistent" is.
- Playwright in `e2e/` is the only test runner in this repo; do not add Vitest or Jest to prove a fix.
</rules>

<stop_and_ask>
Fix touches auth, SSE/streaming, a GDPR surface or the Next.js/NestJS boundary → stop and flag it for
a human instead of implementing it.
Evidence cannot identify a cause → say "I need more info" and name exactly what to paste next. Never
guess, never claim an unverified fix.
</stop_and_ask>

<finish_with>
Root cause in one line. The command you ran to prove it is gone, with its raw output. What you could
not verify.
</finish_with>
```

## Prompt 3 — Finish and pre-check before opening the PR

Use for: everything you're about to push. This is the non-negotiable one.

```xml
<role>
Doing the pre-PR pass on a CardioGuard AI frontend change. Your job: make it mergeable, consistent
with the rest of the repo, and honest about its state.
</role>

<read_first>
AGENTS.md (root) — conventions and non-negotiables. `design-tokens/README.md` if I touched UI, and
`components/ui/README.md` if I touched a component.
</read_first>

<what_i_changed>
Summary: [one line]
Files: [list] · Branch: [name] · Figma frame / story: [node id / ticket]
</what_i_changed>

<step_1_convention_review>
Review the diff file by file (`git diff main...HEAD`). Report only real violations, each as
file:line + the concrete fix:
- hardcoded hex/rgb, px sizes, radii, gaps or shadows instead of tokens; a px font size; a font stack
- status colours used as chrome, or orange used for something that is not an action
- a hand-rolled component where `components/ui/` already has one
- a visible string not in `i18n/el.json` + `i18n/en.json` with the same key path in both, or a key
  present in one locale only
- `'use client'` on something that could be a Server Component
- `any`, a silencing cast, @ts-ignore, @ts-expect-error, or an eslint-disable
- an API route, server action or prisma/db import in this app — BFF violation, always blocking
- `Link`/`useRouter`/`usePathname` imported from `next/*` instead of `@/i18n/navigation`
- server state in Zustand that belongs in TanStack Query
- a control with no focus-ring token or no accessible name; an error with no `role="alert"` /
  `aria-live`
- dead or commented-out code, `console.log`, a TODO without a ticket, naming inconsistent with
  neighbouring files
</step_1_convention_review>

<step_2_fix>
Fix everything you flagged, in small focused edits. No unrelated refactors, no reformatting files I
did not touch, no hand-sorting imports (`npx eslint <file> --fix`).
</step_2_fix>

<step_3_checks_raw_output>
Run these and paste the RAW output. No summary, no "should pass":
    npm run lint
    npm run typecheck
    npm run format:check
    npm run build
    npx playwright test --config playwright.local.config.ts     # the specs for what I touched
If one fails, fix it and re-run. If it cannot be made green, say so and show the failing output.
There is no unit-test runner in this repo; do not add one.
</step_3_checks_raw_output>

<step_4_report>
- What you fixed, as file:line
- What you deliberately left alone, and why
- Raw check results, pass or fail
- Anything a human must decide before merge
- Anything you could not verify
</step_4_report>

<step_5_pr_description>
Draft it: what the change does, which Figma frame / story it implements, screenshots (or explicitly
"not included"), how it was tested, what is out of scope.
</step_5_pr_description>

<rules>
- Make the code look like the same person wrote it as the rest of the repo. Consistency beats your
  personal preference.
- Do not touch files outside my change.
- CI runs lint → typecheck → format:check → the BFF gate → build, and blocks the merge while red.
  Run them locally first, so a red build never reaches review.
- If something contradicts AGENTS.md and you are unsure, ask instead of deciding.
</rules>
```

## Prompt 4 — Bring existing code in line with the conventions

Use for: code that was already written freestyle, or an early prototype being pulled in.

```xml
<role>
Bringing existing CardioGuard AI frontend code in line with the repo conventions, WITHOUT changing
its behaviour. This is a consistency pass, not a rewrite — I will diff the rendered output.
</role>

<read_first>
AGENTS.md (root), `design-tokens/README.md`, `components/ui/README.md`, and the closest finished
screen of the same flow. Copy its shape rather than inventing a house style.
</read_first>

<target>
Code: [files / folder]
Reference for "how it should look": [a good file in the repo, e.g. the consent slice]
Behaviour that must not change: [what I will compare — output, screenshots, spec names]
</target>

<fix_in_this_order>
1. Tokens — hardcoded hex/rgb, px sizes, radii, gaps and shadows → `design-tokens/tokens.ts`.
   For off-scale values Figma really uses, cite the frame and explain the exception in the PR.
2. Components — one-off UI → the primitive that already covers it in `components/ui/`. If something
   is genuinely missing, STOP and ask; it gets ported from Figma once, properly.
3. i18n — visible strings → `i18n/el.json` + `i18n/en.json`, same key path in both, Greek written in
   the same pass.
4. Types — remove `any`, silencing casts and suppressions; give the data real types, from the backend
   OpenAPI types in `types/` when it is API data.
5. Structure — split anything over ~200 lines into `components/features/<feature>/`, `hooks/` and
   `lib/`, following the feature-first layout in AGENTS.md.
6. Naming and navigation — match neighbouring files; `Link`/`useRouter`/`usePathname` from
   `@/i18n/navigation`, never from `next/*`.
</fix_in_this_order>

<rules>
- No behaviour change, no new features, no new dependencies.
- Show diffs, not whole rewritten files.
- Leave the vendored `Design System/` export alone — it is stale. Figma and `components/ui/` win.
- Anything that would alter behaviour or needs an architecture decision goes under "needs a human"
  instead of being done by you.
</rules>

<verify>
Run `npm run lint`, `npm run typecheck`, `npm run format:check` and `npm run build`, paste the raw
output, then list what still differs from the conventions and why.
</verify>
```

## Prompt 5 — Review someone else's PR

AGENTS.md requires an AI review pass on every PR before a human looks at it. Run this on the diff.

```xml
<role>
Reviewing a CardioGuard AI frontend PR as a senior reviewer. Be specific and honest — a rubber stamp
helps nobody. AGENTS.md makes this pass mandatory before a human looks at the diff.
</role>

<read_first>
AGENTS.md (root) — review against our actual conventions, not generic taste. Read the changed files
in full, plus enough surrounding code to judge whether the change fits.
</read_first>

<get_the_diff>
`gh pr diff`, or `git diff main...HEAD` for a local branch. If the PR cites a Figma frame, read that
node too. Do not judge design fidelity from a prose
description.
</get_the_diff>

<review_in_this_order>
1. Correctness and edge cases — does it do what the ticket says? What breaks? Empty, loading, error,
   disabled, slow network, long Greek strings, keyboard-only, reduced motion.
2. Conventions — tokens vs hardcoded values; design-system reuse; i18n coverage in both locales with
   matching key paths; `'use client'` only where needed; the BFF boundary (no API routes, no server
   actions, no prisma/db imports); TanStack Query vs Zustand; no `any`, casts or suppressions;
   `@/i18n/navigation` instead of `next/*`.
3. Design fidelity — against the Figma node. Name concrete differences: spacing, weights, states,
   copy, and the colour contract (orange = action only, status colours = health signals only).
4. Risk — auth, SSE/streaming, GDPR surfaces, anything that could leak patient data, accessibility
   (focus ring, accessible names, `role="alert"`, contrast, keyboard).
5. Size and scope — one vertical slice, or a grab bag that should be split?
</review_in_this_order>

<output>
- Blockers: must fix before merge, each as file:line + the concrete change.
- Should-fix, non-blocking but worth doing.
- Nitpicks, clearly labelled optional.
- What is good — the parts the other students should copy.
- Verdict: merge / merge after blockers / needs rework. State what you could not verify.
</output>

<rules>
- Do not approve anything you could not check, and say what you did not read.
- Point at the problem; do not rewrite the PR for me.
- Flag, do not fix. This is a review, not a commit.
</rules>
```

---

## What this gets you, and what it doesn't

**Gets you:** identical rules loaded into every model, design fidelity that doesn't depend on who wrote the screen, no green "Save" buttons, no hardcoded hex creeping in, PRs that are already lint-clean before a human opens them, honest check output instead of "should pass".

**Doesn't get you:** style consistency in the *taste* sense — two people will still structure a component slightly differently. That's fine and it's what review is for. What you're killing is the *structural* drift: different colours, different component names, different state management, different i18n approach. That's the part that makes a codebase look like five codebases.

**One more thing worth doing:** for the first 2 screens, sit with one junior and do the whole loop together (Prompt 1 -> Prompt 3). After that they run it themselves. The prompts teach the process, but the first run needs a human showing what "good" looks like.
