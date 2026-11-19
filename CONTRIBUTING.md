# Contributing to CardioGuard

## Students: open a pull request

1. Make your change on a branch and try it locally. If you don’t have write access, use a branch in your own fork.
2. Open a pull request to `gtaras7/frontend-repo:main`. Say what changed and how you tested it. Ask Giorgos (`@gtaras7`) for review.
3. Push any requested fixes to the same branch. Giorgos approves and merges; students do not merge PRs.

For a UI change, describe the screen and language you tried. Use synthetic data in screenshots. GitHub Desktop or the command line are both fine.

## Review and merge: Giorgos

Giorgos (`@gtaras7`) is the sole senior reviewer and merger. He reviews student PRs and merges them after `verify` passes. Resolve review conversations before merging. For UI changes, check the relevant screens in Greek and English and run the applicable Playwright tests; Playwright is separate from `verify`.

Husky, ESLint and Prettier run automatically on eligible staged files. Students do not need a separate formatting checklist. If a commit fails, fix the reported issue or ask the reviewer for help. See [what the tooling files do](https://github.com/gtaras7/frontend-repo/wiki/Tooling-files-explained) and [testing and troubleshooting](https://github.com/gtaras7/frontend-repo/wiki/Testing-and-troubleshooting) for the commands.
