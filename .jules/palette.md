## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.

## 2023-10-27 - Radix UI Decorative Icons Accessibility
**Learning:** Radix UI boilerplate components (like Select and Accordion) often contain decorative `lucide-react` icons (e.g., Check, ChevronDown) that lack `aria-hidden="true"` out of the box, leading to redundant or confusing screen reader announcements.
**Action:** Always check and explicitly add `aria-hidden="true"` to purely decorative icons within Radix UI or other component library templates to improve the screen reader experience.
