# Performance (Core Web Vitals) — monconbuild.com
Audited: 2026-07-20 · Score: 55/100

> **Update 2026-07-20 — fixes applied locally (findings 1, 2, 4):** responsive hero
> (srcset 640/1024/1440/1920w; 68–489KB vs 753KB), template preload removed (no
> preload at all — the early inline `<img fetchpriority="high">` is discovered by the
> preload scanner immediately; a preload link double-fetched when its imagesrcset was
> evaluated against a different viewport). Result: Lighthouse mobile 63 → 73, LCP
> 14.9s → 7.2s, Speed Index 5.6s → 1.8s, CLS still 0.
> Remaining lab-LCP gap is render delay ≈ TTI under 4× CPU throttle, driven by
> third-party JS (gtag.js 184KB + Clarity) — see follow-up below; real-browser hero
> paint measured at ~92ms with a single LCP entry.
> Follow-ups discovered: (a) consider delaying gtag/Clarity init until after load or
> first interaction; (b) `public/sw.js` precaches CRA-era paths (`/static/css/main.css`,
> `/static/js/main.js`) that don't exist in the Vite build — update or remove the
> service worker.
Method: Lighthouse 12.6.1 lab run (mobile emulation, slow-4G throttling) against the live site. PSI/CrUX field data unavailable this session (anonymous API quota exhausted; no Google API credentials configured).

## Lab results — homepage, mobile
| Metric | Value | Verdict |
|---|---|---|
| Performance score | **63** | Needs improvement |
| LCP | **14.9 s** | Fail (target ≤2.5s) |
| FCP | 2.5 s | Borderline |
| Speed Index | 5.6 s | Poor |
| TTI | 15.4 s | Poor |
| TBT | 220 ms | OK |
| CLS | **0** | Excellent |
| TTFB | 50 ms | Excellent |
| Accessibility | 96 | Good |
| Lighthouse SEO | 100 | Perfect |

Desktop and real-user numbers will be considerably better than slow-4G lab numbers, but the LCP diagnosis is structural, not throttling noise.

## Findings

### 1. LCP element is a 753 KB, 1920×1440 hero image (High)
`/hero.webp` is the LCP element on the homepage. It ships one fixed 1920px file to every device — a 375px phone downloads all 753 KB. There is **zero `srcset` usage** on the homepage.
**Fix** (biggest single win available):
1. Recompress hero.webp (quality ~70) and generate 640/1024/1440/1920 widths (+ AVIF variants if convenient). A 640w mobile hero should be ~40–80 KB.
2. Serve via `srcset`/`sizes` (or `<picture>`), keep `fetchpriority="high"`.
3. Update the preload to `imagesrcset`/`imagesizes` so the preloaded file matches the responsive pick.
Expected outcome: mobile LCP from ~15s (lab) to ~2–4s; Lighthouse perf into the 85–95 range.

### 2. hero.webp is preloaded on ALL 19 pages (High)
`<link rel="preload" href="/hero.webp" as="image" fetchpriority="high">` lives in the static `frontend/index.html` template, so **every** service and city page force-downloads 753 KB it never renders — competing with each page's real LCP resource.
**Fix**: remove the preload from the template and emit it only on the homepage (via the route's `<Head>`), or inline it conditionally.

### 3. Other oversized static images (Medium)
- `sierra.webp`: 4032×3024, 624 KB
- `3.webp`: 1920×3452, 578 KB
- `4.webp`: 1920×1681, 262 KB
Resize to their largest rendered size and recompress. (Portfolio galleries already use proper `/images/medium/` variants with lazy-loading — apply the same discipline to these stragglers.)

### 4. Stale preconnect (Low)
`customer-assets.emergentagent.com` preconnect + dns-prefetch in the template; no assets load from that host anymore. Remove.

### 5. Minor a11y flags from Lighthouse (Low)
- `target-size`: "Get Free Quote" nav CTA is 36 px tall (minimum comfortable tap target 44–48 px).
- `label-content-name-mismatch`: at least one control's accessible name doesn't contain its visible text (screen-reader/voice-control friction).

## What works
- TTFB 50 ms (Vercel edge + Cloudflare, cache HIT).
- CLS = 0 — layout is rock-solid (hero is absolutely positioned; logo has width/height).
- `/assets/*` immutable 1-year cache headers.
- Gallery images: WebP, medium-size variants, `loading="lazy"`, `loading="eager"` only on the first card.
- TBT 220 ms — JS main-thread cost is acceptable.
