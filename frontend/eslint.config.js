// ESLint flat config for CRA + React 19 + JSX (JavaScript only)
// Keeps rules pragmatic to avoid noisy false-positives in UI libraries

import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import globals from "globals";

export default [
  // Ignore generated and external folders
  {
    ignores: [
      "node_modules/**",
      "build/**",
      "dist/**",
      "coverage/**",
      "public/**",
    ],
  },

  // Base JS + React + a11y
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        // CRA testing globals
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      react: reactPlugin,
      "jsx-a11y": jsxA11y,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // Base
      ...js.configs.recommended.rules,

      // React sensible defaults
      ...reactPlugin.configs.recommended.rules,
      // React 17+ does not require React in scope
      "react/react-in-jsx-scope": "off",
      // Many UI components don't use prop-types in JS projects
      "react/prop-types": "off",
      // Content-heavy pages often include quotes/apostrophes in text
      "react/no-unescaped-entities": "warn",

      // Accessibility: keep as warnings to guide fixes without blocking
      ...jsxA11y.configs.recommended.rules,
      "jsx-a11y/anchor-is-valid": "warn",
  "jsx-a11y/anchor-has-content": "warn",
  "jsx-a11y/heading-has-content": "warn",
      "jsx-a11y/no-noninteractive-tabindex": "warn",

      // Pragmatic JS rules
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",

      // Import resolver noise (CRA aliases can confuse rule)
      // If you want stricter import checks, add an alias resolver later
      // and turn these on.
      // "import/no-unresolved": "off",
      // "import/named": "off",
      // Custom data attributes and library props sometimes look unknown
      "react/no-unknown-property": "warn",
    },
  },
  // TypeScript sources. The base block above lists ts/tsx in `files` but leaves
  // the default parser in place, and espree throws on type syntax ("The keyword
  // 'interface' is reserved"). Point those extensions at the TS parser.
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Base no-unused-vars cannot read type annotations, so it reports the
      // parameter names inside type signatures -- e.g. `args` in
      // `type AsyncFunction<T> = (...args: any[]) => Promise<T>` at
      // src/types/index.ts. Hand these files to the TS-aware rule instead.
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
    },
  },

  // Relax some UI-library specific files further if needed
  {
    files: ["src/components/ui/**/*.jsx"],
    rules: {
      "jsx-a11y/anchor-has-content": "warn",
      "jsx-a11y/heading-has-content": "warn",
      "react/no-unknown-property": "warn",
    },
  },
];
