## 2025-02-28 - Radix UI Decorative Icons Missing ARIA Hidden
**Learning:** Radix UI boilerplate components in this project (e.g., `Select`, `Accordion`) contain purely decorative `lucide-react` icons (like `ChevronDown`, `Check`) that lack `aria-hidden="true"` attributes out of the box. This causes screen readers to redundantly announce these visual-only indicators.
**Action:** When working with Radix UI components, always verify that embedded decorative icons explicitly include `aria-hidden="true"`.
