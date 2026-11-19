# CardioGuard frontend

CardioGuard is a Greek and English cardiovascular prevention education demo built with Next.js and TypeScript. This is the public repository for the student frontend team. You can run the onboarding flow without a backend account. Use synthetic data only, including in issues, screenshots and test fixtures.

**New contributor?** Start with the [team wiki](https://github.com/gtaras7/frontend-repo/wiki), read the [project rules](AGENTS.md), then follow the [first-commit guide](CONTRIBUTING.md).

## Run it

Use Node.js 22 and npm. On a fresh clone:

```sh
git clone https://github.com/gtaras7/frontend-repo.git
cd frontend-repo
npm ci
cp .env.example .env.local
npm run dev
```

Open [Greek onboarding](http://localhost:3000/el/onboarding) or [English onboarding](http://localhost:3000/en/onboarding). The [example environment](.env.example) enables local mocks. Keep `.env.local` out of Git and restart the dev server after changing it.

Before opening a PR, run:

```sh
npm run lint
npm run typecheck
npm run format:check
NEXT_PUBLIC_API_URL=https://api.example.invalid npm run build
npx playwright install chromium   # first run, or after a browser update
npm run e2e
```

The HTTPS address is a placeholder for a local production build, not a deployed API. Playwright checks desktop Chromium at 1440 × 900. For an existing dev server or a failed check, see [Testing and troubleshooting](https://github.com/gtaras7/frontend-repo/wiki/Testing-and-troubleshooting).

## What works today

| Surface | What to expect |
| --- | --- |
| Onboarding | Splash, welcome, consent, demo account setup, baseline questions, optional permissions, preparation, summary and the first-run dashboard. Skipping all baseline questions gives an empty profile. |
| Main app | Chat, Health, Reminders and Settings have a shared sidebar, headers and working navigation. Their page bodies are placeholders. `/en/onboarding/dashboard` is the implemented demo dashboard; `/en/dashboard` is the Health placeholder. Both exist in Greek under `/el`. |
| Accounts and data | Registration is simulated; the shell is not protected by a session. The consent flag is a temporary UI gate, not a consent record. Real accounts, clinician screens and clinical data are outside the demo. |

## Where to make a change

| For this task | Start here |
| --- | --- |
| Change an onboarding screen | [Route and screen handoff](docs/onboarding-desktop-handoff.md), then the matching panel in [`components/features/onboarding/`](components/features/onboarding/). |
| Reuse a control or style | [Inventory of 42 UI primitives](components/ui/README.md) and [shared design tokens](design-tokens/tokens.ts). Use token-driven inline styles, not Tailwind. |
| Change visible text or navigation | Update both [Greek](i18n/el.json) and [English](i18n/en.json). Use the [locale-aware navigation helpers](i18n/navigation.ts) so links keep the active language. |
| Work with data or mocks | [Mock account fixtures](lib/api/mock-account.ts), [API type policy](types/README.md) and [security boundaries](docs/security-hardening.md). NestJS owns authentication, patient data and AI; don't invent endpoints in Next.js. |
| Work with an AI coding assistant | Read [AGENTS.md](AGENTS.md) and the [frontend prompt pack](docs/frontend-ai-prompts.md). Never paste real patient data into a prompt. |

## From edit to merge

Edit on a feature branch, stage the files for your ticket, and commit. Husky runs `lint-staged` on matching **staged files**; it does not run the full lint, build or Playwright suite. `npm run format` rewrites eligible files across the repo. `npm run format:check` reports differences without changing files. The wiki explains [why the Husky and Prettier files are here](https://github.com/gtaras7/frontend-repo/wiki/Tooling-files-explained).

Open a PR against `main`. Branch protection requires one approving review and a passing `verify` check. See the [commit and PR walkthrough](https://github.com/gtaras7/frontend-repo/wiki/Commit-and-PR-workflow) for the student workflow and [PR #6](https://github.com/gtaras7/frontend-repo/pull/6) for the workflow that supplies `verify`. Playwright remains a local pre-PR check.
