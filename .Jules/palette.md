## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.
## 2025-01-20 - Skip-to-content styling specificity
**Learning:** When using Tailwind `sr-only` and `not-sr-only` utilities for skip links, unprefixed styles like `p-4`, `bg-white`, `z-[100]` can lose specificity to `focus:not-sr-only` (0,1,0 vs 0,2,0) or leak into the resting state.
**Action:** Always prefix interactive utility classes (like `focus:p-4`, `focus:bg-white`, `focus:z-[100]`) when designing elements that are only visible on focus, ensuring they don't leak into the resting state or get overridden by screen-reader-only utility classes.
