## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.

## 2025-10-25 - [Missing aria-hidden in Radix UI Boilerplate]
**Learning:** Radix UI boilerplate components installed into the project (like `select.jsx` and `accordion.jsx`) often include decorative `lucide-react` icons that lack `aria-hidden="true"` attributes out of the box. This causes screen readers to redundantly announce decorative icons alongside the text content.
**Action:** Always verify newly added generic UI component files from libraries (like Radix UI / shadcn/ui) to ensure decorative icons are properly hidden from screen readers.
## 2025-02-28 - Add aria-hidden to decorative icons
**Learning:** Found a recurring accessibility pattern across custom components in the app where decorative `lucide-react` icons (like `Phone`, `MapPin`, `Mail`, `Instagram`, `ChevronLeft`, etc.) are missing `aria-hidden="true"`. While Radix UI boilerplate components include them, custom implementations often forget, causing screen readers to redundantly announce them.
**Action:** Always verify that custom components incorporating decorative icons have `aria-hidden="true"` applied to prevent them from being announced by screen readers, improving the overall accessibility of the application.
