## 2026-07-24 - [vite-react-ssg Temp Directory Management]
**Learning:** Running `pnpm run build` with `vite-react-ssg` creates a large temporary directory (`.vite-react-ssg-temp/`) that causes unusually large git diff warnings if left untracked. It must be ignored or removed before staging/committing.
**Action:** Add `.vite-react-ssg-temp/` to `.gitignore` or ensure it is cleaned up using `rm -rf frontend/.vite-react-ssg-temp/` before committing changes.

## 2024-08-02 - [Preloading sequential media]
**Learning:** Preloading next and previous images when a lightbox/gallery is open significantly reduces perceived load time for the user when they navigate sequentially. However, preloaded images must use `fetchPriority = 'low'` to avoid contending with the current visible image on constrained connections. Furthermore, if the `images` array is passed inline (creating a new reference each render), it must be omitted from the preload effect's dependency array (or memoized at the call site) to prevent the effect from firing continuously and negating the optimization.
**Action:** Always consider implementing logic to pre-fetch adjacent assets in carousels and lightboxes (e.g., using `new Image().src = ...`) so they are ready by the time the user navigates, but explicitly set `fetchPriority = 'low'` and carefully manage dependency references.

## 2024-08-16 - [Preloading Carousel Media]
**Learning:** When optimizing React image carousels with absolutely positioned, overlapping slides, avoid relying purely on `loading='lazy'` as it causes all images intersecting the viewport to fetch immediately. Instead, use explicit programmatic preloading (e.g., `new Image().src = ...`) inside a `useEffect` hook to selectively load subsequent images.
**Action:** Use `fetchPriority = 'low'` on the preloaded image to prevent blocking critical main-thread requests. Wrap this logic within a `useEffect` to safely execute on the client-side and avoid SSR complications.
