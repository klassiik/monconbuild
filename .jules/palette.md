## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.
## 2026-08-11 - ARIA hidden attributes on Radix UI Lucide icons
**Learning:** Radix UI boilerplate components (like `select.jsx` and `accordion.jsx`) often include decorative `lucide-react` icons (such as `ChevronDown`, `ChevronUp`, `Check`) that do not have `aria-hidden="true"` applied out of the box. This causes screen readers to redundantly announce decorative visual elements.
**Action:** When adding or auditing Radix UI components that contain decorative icons, always ensure `aria-hidden="true"` is manually added to the icon elements to prevent screen reader noise.
