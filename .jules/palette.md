## 2023-10-24 - Focus states missing on gallery UI
**Learning:** Interactive controls in custom modals/lightboxes (like the `ImageGallery` component) often omit focus rings to look clean, breaking keyboard navigation.
**Action:** Always add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white` (or similar theme-appropriate rings) to interactive gallery controls and thumbnails to ensure keyboard accessibility.

## 2025-01-22 - Balacing Mouse and Keyboard Focus in Carousels
**Learning:** Carousels and slideshows often have buttons clicked repeatedly by mouse users. Using `focus:ring` causes the focus ring to stick after a mouse click, which users perceive as a bug or poor UX.
**Action:** Use `focus-visible:` pseudo-classes instead of `focus:` for interactive elements like carousel controls. This ensures the focus ring is only shown for keyboard users, providing an optimal experience for both input methods.
