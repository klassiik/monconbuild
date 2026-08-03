## 2026-07-24 - [vite-react-ssg Temp Directory Management]
**Learning:** Running `pnpm run build` with `vite-react-ssg` creates a large temporary directory (`.vite-react-ssg-temp/`) that causes unusually large git diff warnings if left untracked. It must be ignored or removed before staging/committing.
**Action:** Add `.vite-react-ssg-temp/` to `.gitignore` or ensure it is cleaned up using `rm -rf frontend/.vite-react-ssg-temp/` before committing changes.

## 2026-07-27 - [Memoization on Prerendered Pages]
**Learning:** Memoization (like `useMemo` or `React.memo`) provides little to no value on a static prerendered marketing site (using `vite-react-ssg`) when it only prevents array rebuilds that cause zero DOM mutations across very few user interactions (e.g., opening a gallery). In such environments, the initial render and hydration are what matters, and memoization cannot optimize those.
**Action:** Avoid micro-optimizations like `useMemo` for static content mapping on prerendered pages unless there is a proven, significant bottleneck.
