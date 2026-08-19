## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.
## 2026-07-23 - Decorative Icons in Boilerplate Components
**Learning:** Radix UI boilerplate components (like Select and Accordion) often contain decorative `lucide-react` icons out of the box that lack `aria-hidden="true"` attributes. This causes screen readers to redundantly announce these purely visual indicators.
**Action:** When adding or auditing new boilerplate UI components that contain non-interactive visual decorators (like chevrons or checkmarks), explicitly add `aria-hidden="true"` to prevent screen reader noise.
