## 2024-08-22 - [Palette Initialization]\n**Learning:** Started tracking UX improvements.\n**Action:** Create journal.
## 2024-08-22 - [Radix UI Icons Accessibility]
**Learning:** Decorative icons (e.g., `lucide-react`) within Radix UI boilerplate components (such as `select.jsx`, `accordion.jsx`) often lack `aria-hidden="true"` by default. This causes screen readers to announce them redundantly.
**Action:** Always verify and manually add `aria-hidden="true"` to structural/decorative icons when importing or updating new Radix UI boilerplate components to ensure correct screen reader behavior.
