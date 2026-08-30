## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.

## 2025-10-25 - [Missing aria-hidden in Radix UI Boilerplate]
**Learning:** Radix UI boilerplate components installed into the project (like `select.jsx` and `accordion.jsx`) often include decorative `lucide-react` icons that lack `aria-hidden="true"` attributes out of the box. This causes screen readers to redundantly announce decorative icons alongside the text content.
**Action:** Always verify newly added generic UI component files from libraries (like Radix UI / shadcn/ui) to ensure decorative icons are properly hidden from screen readers.
## 2024-10-27 - Add aria-hidden to decorative SVG icons
**Learning:** While some generic Radix UI components (like Select) include `aria-hidden="true"` on their embedded `lucide-react` decorative icons, custom-built UI patterns across the codebase (such as the Header buttons and navigation links) often lack them. Screen readers may attempt to read out the icon nodes needlessly if not hidden, creating a confusing experience when an explicit `aria-label` already exists on the parent element.
**Action:** When working on generic React component code, explicitly add `aria-hidden="true"` to raw SVG icons (e.g. from `lucide-react`) used for visual polish within interactive elements (buttons, links) that already have semantic labels.
