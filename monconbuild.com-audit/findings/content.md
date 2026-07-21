# Content Quality & E-E-A-T — monconbuild.com
Audited: 2026-07-20 · Score: 87/100
(Corrected 2026-07-20: an earlier version of this file claimed the site had no on-page testimonials — wrong; see finding 3.)

## What works (this is a strong content site for its size)
- **E-E-A-T is genuinely good**: named owner (William Rogers) with bio and Person schema; CA license #801602 shown sitewide **and deep-linked to CSLB verification** (cslb.ca.gov/801602); DIY Network TV appearances; 25+ years; referral-based positioning. This is exactly what a contractor site should show.
- **City pages are NOT doorway pages.** Spot-checks (Davis, Sacramento) show genuinely local writing — conservation districts, UC Davis rental demand, Title 24 energy standards, clay soils, permit jurisdiction (city vs county). This is rare and valuable; keep this bar for any new city pages.
- **Service pages** each carry visible FAQ accordions with substantive, specific answers (price ranges, timelines, license verification steps) — highly citable by AI search engines.
- **No thin pages**: 445–1,332 words per page; no duplicate titles or descriptions anywhere (the Oct-2025 duplicate-meta issue is confirmed fixed).
- Contact page sets expectations well (process steps, 24h response, license block).

## Findings

### 1. No fresh-content surface (Medium)
The site has no blog/articles/project-story section. For topical authority and AI-citation coverage, contractors win with pieces like "What a kitchen remodel costs in Placer County (2026)", "ADU rules in Yolo County", "Title 24 for remodels". The FAQ answers already contain this material — expand each into a page. Even 1 post/month compounds; `lastmod` freshness on the homepage alone doesn't demonstrate ongoing activity.

### 2. Homepage is the thinnest main page (Low)
586 words. Fine structurally (it's a hub), but there's room for a short "recent projects" or testimonial strip with real names/towns to add first-party evidence where most visitors land.

### 3. Testimonials exist on-page; reviews are absent off-site (Low)
Correction: the homepage DOES render named testimonials in the SSG HTML (e.g., Neal Mitchell — Grass Valley, Richard Young — Sacramento, with project types) — good first-party evidence. The remaining gaps: no third-party reviews surface (GBP/Yelp/Houzz — see local-geo.md #3), and the testimonials aren't marked up as Review schema (optional; only with real attribution, which these have).

### 4. Portfolio captions are good; project stories are absent (Low)
The gallery alts/captions ("Custom Library & Built-Ins — Placer County, CA") are excellent. A few before/after project write-ups (scope, timeline, materials) would deepen both E-E-A-T and long-tail coverage.

### 5. Dead component: TrustBadges.jsx (Info)
`frontend/src/components/TrustBadges.jsx` is imported nowhere; it also contains the same broken ld+json pattern as FAQSection. Delete it or fix + mount it.
