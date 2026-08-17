## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.

## 2025-10-25 - [Add aria-hidden to decorative Radix UI icons]
**Learning:** Radix UI boilerplate components (like `select.jsx` or `accordion.jsx` installed via shadcn/ui) may include decorative `lucide-react` icons that lack `aria-hidden="true"` attributes out of the box, leading to screen readers announcing them redundantly.
**Action:** Always manually check and add `aria-hidden="true"` to decorative icons when adding new Radix UI / shadcn components.
