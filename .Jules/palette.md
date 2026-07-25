## 2026-07-23 - Accessible Form Submission Feedback
**Learning:** Relying solely on text color changes for form success/error states is insufficient for both visual distinction and screen readers. Combining visual icons with `aria-live` regions ensures all users receive clear, immediate feedback.
**Action:** Whenever implementing async form states, always pair visual loading indicators (spinners) with disabled states, and use `role="status" aria-live="polite"` for success messages and `role="alert" aria-live="assertive"` for error messages.

## 2025-10-25 - Using `focus-visible` over `focus` for Carousel Interactions
**Learning:** Using `focus` for interactive elements like carousel arrows or dots can cause a distracting ring to appear when a user simply clicks them with a mouse, leading to a suboptimal visual experience.
**Action:** Always prefer `focus-visible` for keyboard accessibility, especially in visually rich components like carousels. Pair it with `focus-visible:ring-offset-2` and `focus-visible:ring-offset-black/50` to ensure the focus ring remains clear and distinct over dark overlays or images.
