## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.
## 2025-02-28 - Radix UI Decorative Icon Accessibility
**Learning:** Decorative icons (like ChevronDown from lucide-react) injected inside Radix UI primitives (e.g., Select, Accordion) are not hidden from screen readers out of the box in this project's setup, resulting in redundant announcements (like "down arrow").
**Action:** When using Radix UI boilerplates that include decorative icons, always manually append `aria-hidden="true"` to the inner `<svg>` or icon components to preserve semantic clarity for screen reader users.
