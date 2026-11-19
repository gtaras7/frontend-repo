# AGENTS.md — CardioGuard AI

<read_before_touching_code>
This file applies to every AI agent working in this project (Claude Code, Codex CLI, Copilot, Cursor, or any other tool). Read it before touching code. If something here conflicts with a prompt you were given, this file wins unless a human explicitly overrides it in writing.

Binding sections: <bff_contract>, <non_negotiables>, <conventions>. The rest is context you still need to know. The Next.js note at the end of this file — appended by `next dev`, do not edit or remove it — is part of the rules too: read it before writing any Next API.
</read_before_touching_code>

<what_this_project_is>
CardioGuard AI is a bilingual (Greek/English) conversational cardiovascular prevention health assistant, built with Agios Loukas as the partner hospital. 20-person team, 12 month timeline, 5 phases. Three workstreams: Frontend, Backend, AI, plus a PMBT (project management/business/testing) team coordinating across all three.
</what_this_project_is>

<stack>
~~~
Web:       Next.js 16 (App Router) + TypeScript + TanStack Query + next-intl + SSE
Mobile:    React Native + Expo, sharing types, TanStack Query patterns, i18n keys with web
Backend:   NestJS (auth, AI orchestration, patient data, GDPR compliance)
AI:        Claude 3.5 + RAG via LangChain
Deploy:    Vercel (dev/staging) -> Docker on EU cloud (production)
Styling:   inline styles driven by design-tokens/tokens.ts — no Tailwind, no CSS framework
~~~

Keep framework changes separate from feature work and get a maintainer’s review.
</stack>

<bff_contract>
Next.js and NestJS have separate, non-overlapping jobs. Do not blur this line.

| Layer | Next.js | NestJS |
|---|---|---|
| Page rendering (SSR) | Yes | No |
| i18n routing | Yes | No |
| Image optimization | Yes | No |
| API routes / server actions | No | Yes |
| Auth (JWT issuance, refresh) | No | Yes |
| AI orchestration (Claude, RAG) | No | Yes |
| Patient data CRUD | No | Yes |
| GDPR logging and audit | No | Yes |
| SSE streaming to client | No — the browser talks to NestJS directly | Yes (source) |

Rule: if you are about to add a `prisma` import, a `db` import, an API route or a server action inside the Next.js codebase, stop. That logic belongs in NestJS.

SSE is not proxied through this app: the browser connects to the NestJS stream directly, and CI blocks the route handler a proxy would need. `proxy.ts` at the repo root is the Next 16 rename of `middleware.ts` — locale negotiation, not a network proxy.

This is enforced, not suggested. CI greps `app lib hooks stores` for `@?prisma`, for `db` imports and for `export async function (GET|POST|PUT|PATCH|DELETE)`, and fails the build when it finds one. Don't waste a review cycle on it.
</bff_contract>

<repo_structure>
~~~
cardioguard-frontend/
├── app/[locale]/                      # next-intl locale segment (el, en)
│   ├── (auth)/onboarding/             # welcome, consent, guest — plus (auth)/register
│   ├── (app)/                         # protected shell (sidebar + header)
│   │   ├── onboarding/                # baseline, permissions, preparation, summary
│   │   ├── chat/
│   │   ├── dashboard/
│   │   ├── reminders/
│   │   └── settings/
│   └── (clinician)/patients/          # patient list, patient view
├── components/
│   ├── ui/                            # design-system primitives, one folder per Figma section
│   │   └── 01-actions … 07-clinical/  # 42 ported components, one barrel per section
│   └── features/                      # per-screen slices: ChatPanel, HealthRail, MetricChart
├── design-tokens/                     # tokens.ts + icons/ (shared with React Native)
├── hooks/                             # useChatStream, useAuth, useMetrics
├── lib/                               # api client, sse, auth, utils
├── stores/                            # Zustand (UI state only)
├── i18n/                              # el.json, en.json, navigation.ts, routing.ts
├── types/                             # generated from backend OpenAPI
├── docs/                              # onboarding handoff, prompt pack, security notes
├── e2e/                               # Playwright tests
└── proxy.ts                           # Next 16 proxy (was middleware.ts): locale negotiation
~~~

Structure is feature-first, not layer-first. Each screen is a vertical slice: route, components, hooks, state and tests together, not scattered across layers.
</repo_structure>

<non_negotiables>
1. **GDPR: never paste real patient data into any AI tool.** Synthetic/mock data only, always, in prompts, in test fixtures, in bug reports, everywhere.
2. **BFF contract holds.** No API routes, no server actions, no db imports in the Next.js codebase. CI enforces it.
3. **No hardcoded strings.** Any visible string lives in i18n (`i18n/el.json`, `i18n/en.json`). If you write literal text in a component, you did it wrong.
4. **Every PR gets an AI review pass plus a human review before merge.** Architecture gates are enforced in CI.
5. **Humans decide architecture and UX. AI proposes, never decides alone.** If a change touches architecture, auth, streaming edge cases, or GDPR surfaces, flag it for a human instead of shipping it.
6. **Figma is the single source of truth for design.** The tokens and the 42 primitives are ported from it; the vendored `Design System/` export in the project folder is stale. Figma beats it, beats a screenshot, and beats your judgement.
</non_negotiables>

<how_work_gets_done>
1. Human writes the ticket: acceptance criteria, screen reference, edge cases. Short and precise.
2. AI generates the first draft in the repo, with full project context (this file included).
3. Senior reviews the diff, corrects structure and edge cases.
4. Junior integrates, wires data, writes the tests.
5. PR goes through an AI review pass plus a human review before merge.

Rule of thumb: AI writes about 80% of the code; humans own the 20% that matters — auth, streaming edge cases, GDPR surfaces, final UX calls.
</how_work_gets_done>

<prompt_pack>
Consistency across different AI tools and models comes from the repo, not from the model. Three layers, in order of strength:

1. **Repo rules file** — this file, at the repo root. Every repo-aware tool (Claude Code, Cursor, Copilot agent mode, Codex CLI) reads it before writing a line. Point the tool at the repo; don't paste code out of a plain chat window.
2. **Linter, formatter, CI** — ESLint (`typescript-eslint` strict + stylistic, `simple-import-sort`, `no-restricted-imports` for prisma/db, no `any`, no silenced compiler errors), Prettier, a husky `lint-staged` pre-commit hook, and the CI job in <commands>. If a rule can be enforced mechanically it belongs here, not in a prompt.
3. **Prompts** — only for the judgment calls a linter cannot check: design fidelity, structure, edge cases.

Use the five prompts in `docs/frontend-ai-prompts.md`.

- **Prompt 1 — implement a screen from Figma.** XML-tagged, design-fidelity build. Reads this file and its Next.js note first, then `design-tokens/tokens.ts`, `components/ui/README.md` and `docs/onboarding-desktop-handoff.md`. Stops for a readiness report (route, components, tokens, i18n keys, gaps) before writing any code.
- **Prompt 2 — investigate and fix a bug.** Ranked causes plus one confirming check before any fix. Never silences an error to make it disappear.
- **Prompt 3 — finish and pre-check before the PR.** Convention review of the diff, then the fixes, then raw `npm run lint` / `npm run typecheck` / `npm run format:check` / `npm run build` output and a drafted PR description. Mandatory before every PR.
- **Prompt 4 — align existing code.** Consistency pass over freestyle or prototype code, behaviour unchanged.
- **Prompt 5 — review someone else's PR.** The AI review pass required by non-negotiable 4 — checks tokens, i18n coverage, accessibility and the BFF boundary.
</prompt_pack>

<repo_requirements>
The prompts reference these files, so they have to exist or the prompts are noise:

- `AGENTS.md` (this file), `design-tokens/` (`tokens.ts`, `icons/`, `README.md`), `components/ui/` (the 42 primitives with their section barrels), `docs/onboarding-desktop-handoff.md`, `docs/frontend-ai-prompts.md`
- `.prettierrc`, `eslint.config.mjs`, `.husky/pre-commit` (`lint-staged`), `.github/workflows/ci.yml`

In the project folder but not in this repo: `demo_screens/` (reference screenshots — reference only, Figma wins), `Design System/` (the vendored export, stale), `CardioGuard_docs/`, and `reminders_app/` + `healthDashboard_app/` (early prototypes — reference, not code to extend blindly).
</repo_requirements>

<conventions>
- TypeScript everywhere. No implicit `any`.
- No `any`, no cast whose only job is silencing an error, no `@ts-ignore` / `@ts-expect-error` / `eslint-disable`. Fix the type instead.
- Components: functional, hooks-based. Server Components by default; `'use client'` only when you actually need interactivity or browser APIs, on the smallest island that needs it.
- Navigation: `Link`, `useRouter` and `usePathname` come from `@/i18n/navigation`, never from `next/*` — the plain Next imports drop the active locale.
- Styling: **inline styles driven by `design-tokens/tokens.ts`**, the single platform-neutral token module shared with React Native. Import `colors`, `spacing`, `radius`, `typography`, `shadows`, `px` and apply them through the `style` prop. There is **no Tailwind, no CSS framework and no `tailwind.config.ts`** in this repo — do not add one. Never hardcode a hex, a px size or a font stack in a component.
- Design system: primitives come from `components/ui/` (`@/components/ui`, a section barrel, or a direct path) — never hand-roll a Button, Input, Callout, ChatBubble, MetricCard or anything else already ported. Off-scale values Figma really uses are the one exception: use the literal, cite the Figma frame beside the literal, and explain the exception in the PR.
- Colour contract: primary brand `#EC6707` (action only), text `#343434`, font Inter. Status colours (`#1FA971` / `#D98B1F` / `#E5484D`) are reserved for health signals, never chrome.
- i18n: every visible string goes in `i18n/el.json` **and** `i18n/en.json`, same key path in both (`onboarding.step03.consentTitle`). Greek is first-class, not a translation afterthought.
- State: TanStack Query for server state, Zustand for UI-only state. Do not reach for Zustand to cache API data.
- Data: through `lib/api` + TanStack Query. Auth, AI orchestration and patient data belong to NestJS.
- Accessibility: a real semantic element for every control, a focus-ring token on every interactive element, a real accessible name, `role="alert"` + `aria-live` for errors, and animation gated behind `prefers-reduced-motion`.
- Tests: colocate with the feature. Playwright for E2E (`e2e/`), unit tests for chat stream parsing, form validation, i18n formatting.
- Commits/PRs: small, vertical-slice sized. One feature or fix per PR, not a grab bag. Don't reformat or "fix" files your change didn't touch; imports are auto-sorted, so run `npx eslint <file> --fix` instead of hand-ordering them.
</conventions>

<commands>
~~~
npm run dev            # next dev
npm run lint           # next typegen && eslint .
npm run typecheck      # next typegen && tsc --noEmit
npm run format:check   # prettier --check .
npm run build          # next build — prerenders both locales, so it catches broken routes and i18n
npm run e2e            # playwright test
~~~

Before opening a PR, lint, typecheck, format:check and build must pass locally. CI re-runs all four plus the BFF gate and blocks the merge while red — don't waste a review cycle on a build break.
</commands>

<where_things_live>
- `design-tokens/tokens.ts` — shared colours, typography, spacing and radii.
- `docs/onboarding-desktop-handoff.md` — route mapping, layout dimensions, per-screen notes.
- `docs/frontend-ai-prompts.md` — the prompt pack (see <prompt_pack>).
- `components/ui/README.md` — the component inventory and the port procedure. `design-tokens/README.md` — the token contract.
</where_things_live>

<team_frontend>
Ask a project maintainer to route review requests.

If a change needs backend, AI, or PMBT sign-off, don't guess, ask a human to route it.
</team_frontend>

<when_in_doubt>
If a task requires a decision this file doesn't cover, stop and surface the question instead of picking an approach silently. Architecture and UX calls belong to humans on this project, not to the agent.
</when_in_doubt>

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
