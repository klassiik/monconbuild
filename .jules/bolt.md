## 2026-07-24 - [vite-react-ssg Temp Directory Management]
**Learning:** Running `pnpm run build` with `vite-react-ssg` creates a large temporary directory (`.vite-react-ssg-temp/`) that causes unusually large git diff warnings if left untracked. It must be ignored or removed before staging/committing.
**Action:** Add `.vite-react-ssg-temp/` to `.gitignore` or ensure it is cleaned up using `rm -rf frontend/.vite-react-ssg-temp/` before committing changes.

## 2024-08-02 - [Preloading sequential media]
**Learning:** Preloading next and previous images when a lightbox/gallery is open significantly reduces perceived load time for the user when they navigate sequentially. However, preloaded images must use `fetchPriority = 'low'` to avoid contending with the current visible image on constrained connections. Furthermore, if the `images` array is passed inline (creating a new reference each render), it must be omitted from the preload effect's dependency array (or memoized at the call site) to prevent the effect from firing continuously and negating the optimization.
**Action:** Always consider implementing logic to pre-fetch adjacent assets in carousels and lightboxes (e.g., using `new Image().src = ...`) so they are ready by the time the user navigates, but explicitly set `fetchPriority = 'low'` and carefully manage dependency references.

## 2024-08-02 - [Hoisting static React element arrays]
**Learning:** In React, elements are immutable plain objects. If a component renders a static array of elements (like an array of 5 identical Star icons for a rating) that does not depend on component props or state, recreating this array via `[...Array(5)].map()` inside the render function allocates new memory and triggers unnecessary garbage collection on every render.
**Action:** Always consider hoisting static arrays of JSX elements outside the component definition to maintain a stable reference and improve render performance, especially in frequently re-rendered components or components used multiple times in a list.
