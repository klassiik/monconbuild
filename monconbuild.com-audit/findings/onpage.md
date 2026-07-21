# On-Page SEO — monconbuild.com
Audited: 2026-07-20 · Score: 80/100

## What works
- **Unique titles and meta descriptions on all 19 pages** — zero duplicates.
- **Exactly one H1 per page**, logical H2/H3 hierarchy (4–9 H2s per page).
- **Every image has alt text**, and gallery alts are descriptive with locations.
- Clean, keyword-sensible URLs (`/services/finish-carpentry`, `/service-areas/auburn`).
- City-page titles are well-formed local patterns: "Auburn General Contractor & Remodeling | Monument Construction".
- Phone number in descriptions of city pages (drives calls from SERPs).

## Findings

### 1. Homepage title omits the brand (Medium)
Current: `Expert Carpentry & Construction | Colfax CA` (43 ch). "Monument Construction" appears nowhere in the homepage title — weak for brand queries and brand SERP appearance (og:title does include it).
Suggested: `Monument Construction | Finish Carpentry & Contractor, Colfax CA` (~63 ch) or `Monument Construction — Carpentry & Construction | Colfax CA`.

### 2. Service-page titles underuse geography and brand (Medium)
All six are short (26–33 ch), e.g. `Home Additions | Colfax CA`. There's headroom for county-level terms users actually search:
- `Home Additions & ADUs | Placer County & Colfax CA | Monument Construction`
- `Finish Carpentry | Colfax, Auburn & Placer County CA`
Keep under ~60 visible chars; lead with the service keyword.

### 3. Six city-page meta descriptions exceed 160 chars (Low)
Auburn 164, Grass Valley 170, El Dorado Hills 176, Placerville 172, South Lake Tahoe 177, Sacramento 173 — all will truncate mid-sentence in SERPs (the phone number is what gets cut). Trim to ≤155 so `Call (916) 607-1972` survives.

### 4. City pages are internally under-linked (Medium)
In-link counts: nav pages get 19; city pages get **1–6** (Davis: 1, Grass Valley/S. Lake Tahoe: 2). They're reachable only via the /service-areas hub and neighbor cross-links.
**Fix**: add a "Service Areas" footer column listing all 7 cities sitewide (7 links × 19 pages), and/or link relevant cities from each service page ("Home additions in Auburn, Grass Valley…").

### 5. Social preview tags incomplete (Medium)
- `twitter:card` missing on all pages (add `summary_large_image` + `twitter:title/description/image`).
- **og:image is the same hero.webp on all 19 pages** — every share looks identical, and 1920×1440 WebP is not ideal (recommended: 1200×630; JPG/PNG for maximum scraper compatibility). At minimum create one branded 1200×630 default; ideally per-service images from the portfolio.

### 6. Google title rewrites observed (Info)
In search results, `/services/residential-projects` appeared as "Monconbuild - Professional Construction Services" — Google is rewriting weak titles. Strengthening titles per finding #2 reduces rewriting.
