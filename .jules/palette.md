## 2023-10-24 - Focus states missing on gallery UI
**Learning:** Interactive controls in custom modals/lightboxes (like the `ImageGallery` component) often omit focus rings to look clean, breaking keyboard navigation.
**Action:** Always add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white` (or similar theme-appropriate rings) to interactive gallery controls and thumbnails to ensure keyboard accessibility.
