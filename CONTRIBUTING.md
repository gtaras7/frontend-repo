# Contributing to CardioGuard

## Students: open a pull request

1. Work on your own branch and try the change locally.
2. Push the branch and open a pull request to `main`. Say what changed and how you tested it. Request a senior review.
3. If the senior asks for changes, push your fixes to the same branch. Leave the merge to the senior.

For a UI change, describe the screen and language you tried. Use synthetic data in screenshots. GitHub Desktop or the command line are both fine.

## Seniors: review and merge

A senior reviews the diff, requests fixes if needed, and merges into `main` after approval and a passing `verify` check. The author cannot approve their own PR. Resolve review conversations before merging. For UI changes, check the relevant screens in Greek and English and run the applicable Playwright tests; Playwright is separate from `verify`.

Husky, ESLint and Prettier run automatically on eligible staged files. Students do not need a separate formatting checklist. If a commit fails, fix the reported issue or ask the reviewer for help. See [what the tooling files do](https://github.com/gtaras7/frontend-repo/wiki/Tooling-files-explained) and [testing and troubleshooting](https://github.com/gtaras7/frontend-repo/wiki/Testing-and-troubleshooting) for the commands.
