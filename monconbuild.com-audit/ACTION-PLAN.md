# Action Plan — monconbuild.com
Ordered by priority. File paths refer to this repo.

> **Status 2026-07-20**: Phase 1 items 1–3 APPLIED in the working tree (not yet committed/deployed).
> Verified locally: FAQ schema valid on all 6 service pages, hero preload homepage-scoped then
> removed entirely in favor of `fetchpriority="high"` + srcset, responsive hero variants generated
> (640w=68KB / 1024w=150KB / 1440w=262KB / 1920w=489KB). Lighthouse mobile: 63 → 73,
> LCP 14.9s → 7.2s (lab), Speed Index 5.6s → 1.8s. Items 4–5 remain user tasks.

## Phase 1 — Critical fixes (Week 1, ~half a day of code)

1. **Fix FAQ schema serialization** — `frontend/src/components/FAQSection.jsx:32-36`
   ```jsx
   <script
     type="application/ld+json"
     dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
   />
   ```
   Verify after deploy: `curl -s https://www.monconbuild.com/services/finish-carpentry | grep -o 'FAQPage'` should match (not `&quot;FAQPage&quot;`), then run the page through Google's Rich Results Test.

2. **Stop preloading hero.webp sitewide** — remove `<link rel="preload" href="/hero.webp" ...>` from `frontend/index.html`; emit it from the Home route's `<Head>` instead. Also delete the two `customer-assets.emergentagent.com` resource hints.

3. **Responsive, compressed hero** — generate 640/1024/1440/1920w WebP (quality ~70; target ≤80 KB for 640w) via the existing `optimize-images-sharp.js` tooling; use `srcset`+`sizes` on the Home hero `<img>`; preload with `imagesrcset`. Re-run Lighthouse; expect LCP ≤3s mobile lab.

4. **Vercel dashboard**: Project → Settings → Domains → `monconbuild.com` → redirect to `www.monconbuild.com` with **308 Permanent**.

5. **Verify/claim Google Business Profile** (business owner task): service-area business, Colfax base, categories General Contractor + Carpenter + Remodeler; website = https://www.monconbuild.com; then add the GBP URL to schema `sameAs`.

## Phase 2 — High-impact improvements (Weeks 2–3)

6. **Footer "Service Areas" column** linking all 7 city pages sitewide (fixes internal-link starvation: Davis currently has 1 in-link).
7. **Breadcrumbs on the 4 service pages missing them** (general-construction, residential-projects, custom-woodwork, complete-remodeling) — mount the existing `Breadcrumb` component.
8. **Title upgrades**: homepage → include "Monument Construction"; service pages → add county/city terms (keep ≤60 chars). See findings/onpage.md #1–2 for suggested strings.
9. **Trim 6 city meta descriptions to ≤155 chars** so the phone number isn't truncated (Auburn 164 → S. Lake Tahoe 177 currently).
10. **Social cards**: add `twitter:card` = `summary_large_image` sitewide; create a branded 1200×630 default OG image (JPG/PNG); ideally per-service OG images from portfolio shots.
11. **Cloudflare**: turn off Scrape Shield → Email Address Obfuscation (removes the sitewide 404ing `/cdn-cgi/l/email-protection` link; email is already public in schema).
12. **sameAs expansion** in org schema: GBP, BuildZoom (buildzoom.com/contractor/monument-construction), CSLB page, LinkedIn (verify "jwmonument-construction" is yours first).

## Phase 3 — Content & authority (Month 2)

13. **Citations**: create/claim Yelp, Houzz (best fit for portfolio), Angi, BBB, Facebook, Nextdoor with identical NAP: Monument Construction · Colfax, CA 95713 · (916) 607-1972.
14. **Reviews** (correction: named testimonials already exist on the homepage — Neal Mitchell/Grass Valley, Richard Young/Sacramento): start asking for GBP reviews in project-completion emails; optionally add Review schema for the existing attributed testimonials.
15. **Content hub**: expand existing FAQ answers into standalone guides, e.g. "Kitchen remodel cost in Placer County (2026)", "ADU rules: Placer vs Yolo County", "Title 24 for remodels". One per month is enough; interlink with the matching service + city pages.
16. **llms.txt**: publish at `/llms.txt`, e.g.:
    ```
    # Monument Construction
    > Licensed general contractor & finish carpentry (CA #801602), Colfax CA,
    > serving Placer, Nevada, Sacramento, Yolo & El Dorado Counties. (916) 607-1972.
    ## Services
    - Finish carpentry: https://www.monconbuild.com/services/finish-carpentry
    - Home additions & ADUs: https://www.monconbuild.com/services/home-additions
    - Remodeling: https://www.monconbuild.com/services/complete-remodeling
    ## Areas
    - https://www.monconbuild.com/service-areas
    ## About
    - Owner William Rogers, DIY Network features: https://www.monconbuild.com/about
    ```
17. **Cleanup**: delete unused `frontend/src/components/TrustBadges.jsx` (contains the same broken schema pattern); commit or discard the local `sitemap.xml` diff; optionally drop the `<meta name="keywords">` tag.

## Phase 4 — Monitoring (Ongoing)
18. Set up Google Search Console (if not already) + submit sitemap; watch Page Experience and the service-page FAQ enhancements report after the schema fix.
19. Re-run Lighthouse after Phase 1 (expect perf 85–95 mobile); re-run this audit quarterly.
20. Track Map Pack rankings for "general contractor <city>" across the 7 city pages once GBP is live.
