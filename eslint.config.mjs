import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

const IGNORES = [
  ".next/**",
  "node_modules/**",
  "public/**",
  "Design System/**",
  "design-tokens/**",
  "demo_screens/**",
  "docs/**",
];

export default tseslint.config(
  { ignores: IGNORES },

  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    extends: [...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    plugins: { "@next/next": nextPlugin, "simple-import-sort": simpleImportSort },
    rules: {
      ...nextPlugin.configs.recommended.rules,

      // AGENTS.md: no implicit any, and never silence the compiler.
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/ban-ts-comment": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // Smaller, reviewable diffs: one predictable import order everywhere.
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Non-negotiable 2, the BFF contract, enforced by the toolchain.
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@prisma/client",
              message: "BFF contract: database access belongs in NestJS, not here.",
            },
            {
              name: "prisma",
              message: "BFF contract: database access belongs in NestJS, not here.",
            },
          ],
          patterns: [
            {
              group: ["**/db", "**/db/*"],
              message: "BFF contract: database access belongs in NestJS, not here.",
            },
          ],
        },
      ],
    },
  },

  // Config files (.mjs) are not part of the TS program, so type-aware rules are off for them.
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [tseslint.configs.disableTypeChecked],
  },

  prettier,
);
