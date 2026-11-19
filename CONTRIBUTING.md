# Your first CardioGuard commit

**Edit a component → stage it → commit.** Work on your own branch and open a pull request to `main` when your change is ready. After cloning, run `npm ci` once with Node 22 to install the project dependencies and set up Husky.

For example, if your ticket changes the shared Button:

```sh
git switch -c fix/button-contrast
# Edit components/ui/01-actions/Button.tsx, then review your change.
git diff
git add components/ui/01-actions/Button.tsx
git diff --staged
git commit -m "fix: improve button contrast"
```

When you commit, Git calls the hook installed by Husky. The hook runs `lint-staged` on the files you staged. For TypeScript, ESLint catches configured code issues and fixes the ones it can. Prettier then formats the code. If the hook stops the commit, read the error, fix the file, stage it again and retry.

## Why these files are here

| File or folder | What it does for you |
| --- | --- |
| [`.husky/`](.husky/) | Keeps the team's Git hooks in the repo so each clone uses the same pre-commit steps. |
| [`.husky/pre-commit`](.husky/pre-commit) | Runs `npx lint-staged` before Git creates your commit. It does not build the app or run Playwright. |
| `.husky/_/` | Holds the local helper scripts Husky generates during installation. You don't edit or commit them. |
| [`package.json`](package.json) | The `prepare` script sets up Husky. The `lint-staged` rules run ESLint and Prettier on staged `.ts` and `.tsx` files, and Prettier on staged JSON, Markdown and CSS unless ignored. |
| [`.prettierrc`](.prettierrc) | Sets the team's formatting rules, including double quotes, semicolons and two-space indentation. Your editor and the CLI can use the same settings. |
| [`.prettierignore`](.prettierignore) | Tells Prettier which files to skip, including build output, `design-tokens/`, `docs/`, Markdown and the lockfile. It does not tell Git to ignore them. |

`npm run format` **rewrites** eligible files across the repo, including unstaged files. Review `git diff` before staging the result. `npm run format:check` **only reports** formatting differences and exits with an error if it finds any. Use it when you want to check without changing anything.

## Getting your change into `main`

Push your feature branch, open a pull request and ask a teammate to review it. Wait for one human approval and a passing [`verify` CI job](.github/workflows/ci.yml) before merging. Run the [local pre-PR checks](README.md#run-it) too; Playwright is not part of `verify`.

Husky gives fast feedback on your laptop. On GitHub, branch protection requires a passing `verify` check and one approving review before merging to `main`. Push to your feature branch and open a pull request.
