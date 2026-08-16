## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.

## 2026-08-16 - Radix UI Boilerplate Decorative Icons
**Learning:** Radix UI boilerplate components in this project (e.g., `frontend/src/components/ui/select.jsx` and `frontend/src/components/ui/accordion.jsx`) may contain decorative `lucide-react` icons that lack `aria-hidden="true"` attributes out of the box. Without this, screen readers may announce them redundantly.
**Action:** When adding or auditing Radix UI components, explicitly check for and add `aria-hidden="true"` to any purely decorative icons used for visual styling (like Chevron down/up or Check marks).
