## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.

## 2023-10-25 - [Accessibility] Radix UI Boilerplate Missing ARIA Attributes
**Learning:** Radix UI boilerplate components in this project (specifically those copied into `frontend/src/components/ui/`, like `select.jsx` and `accordion.jsx`) include decorative `lucide-react` icons that lack `aria-hidden="true"` attributes out of the box. This causes screen readers to announce purely visual indicators redundantly, which is noisy and confusing.
**Action:** Always manually add `aria-hidden="true"` to decorative icons (e.g., chevrons, checkmarks) when importing or utilizing raw Radix UI boilerplate components.
