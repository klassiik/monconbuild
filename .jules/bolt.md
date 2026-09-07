## 2026-07-24 - [vite-react-ssg Temp Directory Management]
**Learning:** Running `pnpm run build` with `vite-react-ssg` creates a large temporary directory (`.vite-react-ssg-temp/`) that causes unusually large git diff warnings if left untracked. It must be ignored or removed before staging/committing.
**Action:** Add `.vite-react-ssg-temp/` to `.gitignore` or ensure it is cleaned up using `rm -rf frontend/.vite-react-ssg-temp/` before committing changes.

## 2024-08-02 - [Preloading sequential media]
**Learning:** Preloading next and previous images when a lightbox/gallery is open significantly reduces perceived load time for the user when they navigate sequentially. However, preloaded images must use `fetchPriority = 'low'` to avoid contending with the current visible image on constrained connections. Furthermore, if the `images` array is passed inline (creating a new reference each render), it must be omitted from the preload effect's dependency array (or memoized at the call site) to prevent the effect from firing continuously and negating the optimization.
**Action:** Always consider implementing logic to pre-fetch adjacent assets in carousels and lightboxes (e.g., using `new Image().src = ...`) so they are ready by the time the user navigates, but explicitly set `fetchPriority = 'low'` and carefully manage dependency references.

## 2024-10-25 - [Preloading sequential media in cross-fade carousels]
**Learning:** When optimizing cross-fade React image carousels with overlapping, absolutely positioned slides, relying purely on native `loading='lazy'` fails to save bandwidth because all overlapping images technically intersect the viewport simultaneously.
**Action:** Instead, maintain explicit state (e.g., a `Set` of loaded indices) to conditionally render only the active and upcoming `<img>` elements, and use a `useEffect` hook to programmatically preload the next image (`new Image().src = ...`) with `fetchPriority = 'low'` one tick in advance.
