## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.

## 2025-10-25 - [Missing aria-hidden in Radix UI Boilerplate]
**Learning:** Radix UI boilerplate components installed into the project (like `select.jsx` and `accordion.jsx`) often include decorative `lucide-react` icons that lack `aria-hidden="true"` attributes out of the box. This causes screen readers to redundantly announce decorative icons alongside the text content.
**Action:** Always verify newly added generic UI component files from libraries (like Radix UI / shadcn/ui) to ensure decorative icons are properly hidden from screen readers.

## 2023-10-27 - [Missing aria-hidden on Inline Lucide Icons]
**Learning:** While Radix UI boilerplate components are a known source of missing `aria-hidden` attributes, inline icons added manually directly into components (like `<MapPin>`, `<Phone>` from `lucide-react` used decoratively alongside text in the Footer) are also often missing `aria-hidden="true"`.
**Action:** When auditing for accessibility, check not just library components, but also custom components for decorative icons used alongside descriptive text, and ensure they have `aria-hidden="true"` applied.
