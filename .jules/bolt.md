## 2025-02-28 - React.memo() interactions with Vite SSG
**Learning:** Found an opportunity to optimize a heavily interactive, image-rich grid on the Portfolio page.
**Action:** When wrapping components in React.memo() for use with vite-react-ssg, ensure the inner function is explicitly named (e.g. `React.memo(function CategoryTile(...)`) to prevent build-time/lint-time "Component definition is missing display name" errors.
