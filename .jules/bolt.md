## 2026-07-24 - [vite-react-ssg Temp Directory Management]
**Learning:** Running `pnpm run build` with `vite-react-ssg` creates a large temporary directory (`.vite-react-ssg-temp/`) that causes unusually large git diff warnings if left untracked. It must be ignored or removed before staging/committing.
**Action:** Add `.vite-react-ssg-temp/` to `.gitignore` or ensure it is cleaned up using `rm -rf frontend/.vite-react-ssg-temp/` before committing changes.
## 2024-11-20 - [ImageGallery Thumbnail Optimization]
**Learning:** Found a component (`ImageGallery`) that renders a thumbnail strip by iterating over an array of full-resolution image URLs. Loading 10-20 full-size 2MB images just to render them at 64x64px is a massive bandwidth waste and can block the main thread.
**Action:** When working with image galleries or thumbnail strips, always check if there is a pre-generated thumbnail variant (`/images/thumbnails/`) available. Ensure that thumbnail `<img>` tags use `loading="lazy"` so they don't block initial page load or load off-screen thumbnails unnecessarily.
