// ESLint flat config for CRA + React 19 + JSX (JavaScript only)
// Keeps rules pragmatic to avoid noisy false-positives in UI libraries

import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
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
