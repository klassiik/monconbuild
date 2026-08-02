## 2026-07-24 - [vite-react-ssg Temp Directory Management]
**Learning:** Running `pnpm run build` with `vite-react-ssg` creates a large temporary directory (`.vite-react-ssg-temp/`) that causes unusually large git diff warnings if left untracked. It must be ignored or removed before staging/committing.
**Action:** Add `.vite-react-ssg-temp/` to `.gitignore` or ensure it is cleaned up using `rm -rf frontend/.vite-react-ssg-temp/` before committing changes.

## 2026-08-02 - [Preloading sequential media]
**Learning:** Preloading next and previous images when a lightbox/gallery is open significantly reduces perceived load time for the user when they navigate sequentially. It avoids network delays when the user actually navigates to the next item.
**Action:** Always consider implementing logic to pre-fetch adjacent assets in carousels and lightboxes (e.g., using `new Image().src = ...`) so they are ready by the time the user navigates.
