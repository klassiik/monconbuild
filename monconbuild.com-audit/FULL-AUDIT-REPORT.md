# SEO Audit — monconbuild.com
**Date**: 2026-07-20 · **Pages crawled**: 19/19 (100% of sitemap) + variant checks
**Business type**: Local Service — service-area general contractor (Monument Construction, Colfax CA, serving Placer, Nevada, Sacramento, Yolo & El Dorado Counties)
**Method**: full crawl + source-code cross-reference (this repo), Lighthouse 12.6.1 lab run, live header/redirect testing, web citation check. PSI field data and Google API integrations unavailable this session; skill helper scripts not bundled, audit run inline.

## Executive Summary

# SEO Health Score: 78/100

A genuinely well-built site: fully prerendered SSG, unique metadata everywhere, exceptional security headers, strong E-E-A-T (named licensed owner, CSLB deep link, TV credits), and city pages with real local substance instead of doorway boilerplate. Lighthouse SEO: 100/100.

Two defects hold it back materially:
1. **Broken FAQ schema on all 6 service pages** — the JSON-LD ships HTML-entity-encoded (`&quot;` instead of `"`), so it's invalid JSON and ignored. One-line React fix.
2. **A 753 KB hero image that is the mobile LCP element (14.9s lab) and is preloaded on every page** of the site, including 18 pages that never display it.

Off-site is the growth frontier: no visible Google Business Profile link, citations limited to BuildZoom, no reviews surface.

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 88 |
| Content Quality | 23% | 87 |
| On-Page SEO | 20% | 80 |
| Schema / Structured Data | 10% | 62 |
| Performance (CWV) | 10% | 55 |
| AI Search Readiness | 10% | 70 |
| Images | 5% | 75 |
| **Weighted total** | | **78** |

### Top 5 issues
1. **FAQPage JSON-LD invalid on all 6 service pages** (High) — `FAQSection.jsx:32` renders schema as escaped text; needs `dangerouslySetInnerHTML`.
2. **Mobile LCP 14.9s** (High) — hero.webp 753 KB/1920px, no `srcset`, no responsive variants.
3. **hero.webp preloaded on all 19 pages** (High) — template-level `<link rel="preload">` wastes 753 KB on every non-home page.
4. **No Google Business Profile linkage detected** (High, verify) — the Map Pack is the highest-ROI local surface and nothing on-site points to a GBP.
5. **Apex→www redirect is 307 Temporary** (Medium) — Vercel dashboard overrides vercel.json's permanent redirect.

### Top 5 quick wins
1. `dangerouslySetInnerHTML` fix in FAQSection.jsx (5 min) — restores FAQ schema on 6 pages.
2. Remove hero preload from `index.html` + delete stale `customer-assets.emergentagent.com` preconnect (5 min).
3. Compress hero.webp + add `srcset` (an hour incl. testing) — should lift mobile Lighthouse from 63 to ~90.
4. Set apex redirect to 308 in Vercel dashboard (2 min).
5. Add a "Service Areas" footer column linking all 7 city pages (fixes 1–6 in-link starvation; Davis has a single internal link today).

## Category detail
Full evidence in `findings/`:
- [technical.md](findings/technical.md) — 88/100: excellent headers/robots/sitemap/canonicals; 307 redirect, Cloudflare email-obfuscation 404 link sitewide, stale preconnect.
- [content.md](findings/content.md) — 87/100: strong E-E-A-T, real local city content, named homepage testimonials; no blog/fresh content, dead TrustBadges component.
- [onpage.md](findings/onpage.md) — 80/100: unique titles/descs/H1s everywhere; homepage title lacks brand, service titles underuse geography, 6 descriptions >160ch, city pages under-linked, no twitter:card, single generic og:image.
- [schema.md](findings/schema.md) — 62/100: rich correct schema graph except the broken FAQPage ×6, breadcrumbs missing on 4 service pages, sameAs only Instagram.
- [performance.md](findings/performance.md) — 55/100: LH mobile 63 (LCP 14.9s, CLS 0, TTFB 50ms); the hero image is the entire problem.
- [local-geo.md](findings/local-geo.md) — Local/AI: on-site local signals excellent; GBP/citations/reviews thin; no llms.txt; AI crawlers fully allowed and content is highly citable.

## What's demonstrably healthy (verified, leave alone)
- All 19 URLs: HTTP 200, self-canonical, one H1, unique title + description, full alt-text coverage.
- Prior issues confirmed fixed: duplicate meta descriptions (Oct 2025), orphan pages, soft-404s.
- Security: CSP/HSTS-preload/XCTO/XFO/Permissions-Policy — top decile for SMB sites.
- IndexNow key live; sitemap referenced in robots.txt; 404s return 404; CLS = 0.
- No fabricated ratings in schema (keep it that way until real reviews are on-page).
