## 2026-07-24 - [vite-react-ssg Temp Directory Management]
**Learning:** Running `pnpm run build` with `vite-react-ssg` creates a large temporary directory (`.vite-react-ssg-temp/`) that causes unusually large git diff warnings if left untracked. It must be ignored or removed before staging/committing.
**Action:** Add `.vite-react-ssg-temp/` to `.gitignore` or ensure it is cleaned up using `rm -rf frontend/.vite-react-ssg-temp/` before committing changes.
## 2025-10-25 - [React.memo in SSG Marketing Sites]
**Learning:** For mostly-static pages built with SSG (like vite-react-ssg), wrapping components in `React.memo` and callbacks in `useCallback` provides no meaningful performance benefit if the state updates are extremely rare (e.g., clicking a gallery). Memoization shines when frequent state updates (like typing or rapid data fetching) cause repeated renders. On prerendered sites, the initial render and hydration are what matters, and `React.memo` doesn't speed those up.
**Action:** Avoid using `React.memo` or `useCallback` for static UI components on SSG pages unless there's a proven bottleneck with frequent state changes.
