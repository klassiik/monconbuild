## 2025-02-28 - React.memo() interactions with Vite SSG
**Learning:** Found an opportunity to optimize a heavily interactive, image-rich grid on the Portfolio page.
**Action:** When wrapping components in React.memo() for use with vite-react-ssg, ensure the inner function is explicitly named (e.g. `React.memo(function CategoryTile(...)`) to prevent build-time/lint-time "Component definition is missing display name" errors.
## 2025-02-28 - Premature Optimization on Static/Low-Interactivity Pages
**Learning:** Found that memoizing UI components (like Category Tiles) and stable props on a static-heavy Marketing page (Portfolio) does not yield tangible performance gains. The reviewer pointed out that the gallery state changes at most twice per user interaction and the grid has only 10 tiles. `React.memo` and `useCallback` do not help with the first render or hydration, which are the primary performance metrics for pre-rendered pages.
**Action:** Before optimizing re-renders, evaluate the actual frequency and depth of state updates. If a component is mostly static and rarely re-renders, adding memoization wrappers introduces complexity with no real-world performance benefit.
