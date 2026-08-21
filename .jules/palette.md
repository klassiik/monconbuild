## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.

## 2024-08-21 - [A11y] Decorative Icons in Radix UI Components
**Learning:** Radix UI boilerplate components in this project (e.g., `frontend/src/components/ui/select.jsx`, `frontend/src/components/ui/accordion.jsx`) may contain decorative `lucide-react` icons that lack `aria-hidden="true"` attributes out of the box, causing screen readers to announce them redundantly.
**Action:** When adding or updating Radix UI components that include purely decorative icons (like carets or checkmarks), manually verify and add `aria-hidden="true"` to ensure a clean accessibility tree.
