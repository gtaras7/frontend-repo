# cardioguard-frontend

### figma design: https://www.figma.com/design/ePzgsx1PgxR43iD3dxqLdI/CardioGuard-AI-%E2%80%94-Design-System?node-id=139-2&t=h4KdzfzefH2wpGzQ-1

Next.js 16 (App Router) · TypeScript · next-intl (el/en) · TanStack Query · Zustand · token-driven styling

**Read `AGENTS.md` in this folder before you touch code.** It is the rules file: non-negotiables,
the BFF contract, the conventions, and how work flows. It wins over any other instruction.
Then read `docs/frontend-ai-prompts.md` — use those prompts instead of freestyle chatting with an AI.

For your first commit, follow the [student workflow and guide to Husky and Prettier](CONTRIBUTING.md).

## Run it

```bash
npm ci                         # use Node.js 22
cp .env.example .env.local     # enables local onboarding mocks; configure NestJS URL as needed
npm run dev                    # http://localhost:3000 -> locale-prefixed onboarding
```

## How to contribute

1. Make your change on a branch and try it locally. If you don’t have write access, use a branch in your own fork.
2. Open a pull request to `gtaras7/frontend-repo:main`. Say what changed and how you tested it. Ask Giorgos (`@gtaras7`) for review.
3. Push any requested fixes to the same branch. Giorgos approves and merges; students do not merge PRs.

Giorgos (`@gtaras7`) is the sole senior reviewer and merger. He reviews student PRs and merges them after `verify` passes. For help, see the [student workflow](https://github.com/gtaras7/frontend-repo/wiki/Commit-and-PR-workflow) or [testing and troubleshooting](https://github.com/gtaras7/frontend-repo/wiki/Testing-and-troubleshooting).

Production builds require an `https://` `NEXT_PUBLIC_API_URL` and always use NestJS rather
than onboarding mocks. See `.env.example` and `docs/security-hardening.md`.

## Where does my code go?

```
app/[locale]/
├── layout.tsx              root layout: fonts, <html lang>, i18n provider
├── page.tsx                redirects the locale root to /onboarding
│
├── (auth)/                 shared onboarding Query provider
│   ├── (split)/            brand column + content panel
│   │   ├── onboarding/    01 Splash, 02 Welcome, 03 Consent, 05 Baseline
│   │   └── register/      04 Account Setup
│   └── onboarding/(setup)/
│       ├── permissions/  06 Optional permissions
│       ├── preparation/  07 Preparation and error
│       ├── summary/      08 Starting Summary
│       └── dashboard/    09 First-run Dashboard and its variants
│
└── (app)/                  app chrome; session protection is not implemented
    ├── layout.tsx          persistent charcoal sidebar
    ├── chat/               header + placeholder body
    ├── dashboard/          Health header + placeholder body
    ├── reminders/          header + placeholder body
    └── settings/           header + placeholder body

components/
├── ui/                     design-system primitives, one folder per Figma section
│   │                          (01-actions … 07-clinical — see its README)
└── features/               onboarding/ and shell/ implementations

lib/                        API client, onboarding endpoints and answer types, interim consent gate
i18n/                       routing, navigation, request + el.json / en.json
design-tokens/              shared tokens and exported Figma artwork
e2e/                        bilingual onboarding and app-shell Playwright specs
```

**Feature-first, not layer-first.** A screen is a vertical slice: its route, its components, its
hooks, its keys, its tests together. Don't scatter one feature across five folders.

## Non-obvious things that will bite you

- **`Link` and `useRouter`** come from `@/i18n/navigation`, never from `next/link` or
  `next/navigation`. The Next ones are not locale-aware and will drop you to the wrong language.
- **No hardcoded hex, px or font values.** Import from `@/design-tokens/tokens` and apply through
  the `style` prop: `colors`, `spacing`, `radius`, `typography`. Type styles are spread, e.g.
  `...typography.textMd`.
- **No literal strings in components.** Every visible string, including `alt` text, is an i18n
  key in `i18n/el.json` **and** `i18n/en.json`. Greek and English are equal, never a fallback.
- **Status colours are health signals only.** success/warning/danger never appear as decoration.
  Orange is action only — never a large fill.
- **Server Components by default.** `"use client"` only where there is real interactivity.
- **There is no Tailwind and no CSS framework.** Styling is inline, driven by
  `design-tokens/tokens.ts`. The document reset and focus ring are inlined once in
  `app/[locale]/layout.tsx` from token values — never add a second global CSS file with
  hardcoded hex or px. The empty PostCSS configuration explicitly disables the default plugins.

## Current boundaries and remaining screens

All seven sections of the Figma component library are ported (42 primitives). See the inventory
in `components/ui/README.md`. The demo runs from Splash through Consent, Account Setup, Baseline,
Permissions, Preparation, Starting Summary and the first-run Dashboard. Baseline answers stay in
memory. Skip records an explicit missing answer, and skipping every baseline question leads to
the first-run Dashboard's empty profile state. Real registration, guest continuation and
clinician screens are pending. The four app pages have placeholder bodies.

The `(app)` group currently provides chrome only: users can deep-link to it, and its sidebar
identity is synthetic. Authentication, session protection, onboarding progress and clinical
data remain NestJS integration work. The registration cookie is a temporary non-PHI UI gate,
not a consent record; replace it with the human-reviewed NestJS progress/auth contract before
real-user staging. See `docs/security-hardening.md` for these boundaries.

Demo Query hooks live in `components/features/onboarding/`. TanStack Query owns server state.
The `hooks/` and `stores/` directories reserve space for future shared hooks and UI state.
Backend API types will be generated from OpenAPI as described in `types/README.md`.

See [the onboarding handoff](docs/onboarding-desktop-handoff.md) for the routes and [the mock account implementation](lib/api/mock-account.ts) for fixtures, failure switches and reset behaviour.
