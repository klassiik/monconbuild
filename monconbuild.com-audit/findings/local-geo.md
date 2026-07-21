# Local SEO & AI Search Readiness (GEO) — monconbuild.com
Audited: 2026-07-20 · Local signals strong on-site; off-site thin. AI readiness: 70/100

## Business profile
Service-area business (SAB): Monument Construction, Colfax CA 95713, (916) 607-1972, CA license #801602. Serves Placer, Nevada, Sacramento, Yolo & El Dorado Counties. Owner: William Rogers (Instagram: @wrconstruct7).

## What works
- **On-site local SEO is excellent**: LocalBusiness(GeneralContractor) schema with NAP + geo + areaServed on every page; 7 high-quality, genuinely differentiated city pages; county phrasing consistent sitewide; click-to-call links (4 per page); CSLB license deep link.
- **NAP consistency**: phone/city/zip consistent across pages and schema. BuildZoom citation exists (score 94, top 24% of CA contractors) and matches the license.
- **AI crawler access**: robots.txt allows all user agents — GPTBot, ClaudeBot, PerplexityBot, Google-Extended can all read the site. SSG means full content without JS execution — ideal for AI crawlers.
- **Citable content**: service-page FAQs with concrete prices/timelines are exactly what AI answers quote.

## Findings

### 1. Google Business Profile not linked anywhere (High — verify)
No GBP/Maps link appears on the site or in `sameAs`. For a local contractor, the Map Pack is usually the highest-ROI surface.
**Action**: confirm a GBP exists for "Monument Construction" (Colfax, service-area mode, categories: General Contractor / Carpenter / Remodeler); link the website ↔ GBP both ways; add its URL to schema `sameAs`. If no GBP exists, creating one is the single most valuable local action available. (Couldn't verify externally this session — no Maps API access.)

### 2. Citation footprint is thin (Medium)
Search surfaced only BuildZoom (+ an unverified LinkedIn company page "jwmonument-construction" — confirm whether that's yours). Missing from top results: Yelp, Houzz, Angi, HomeAdvisor, Thumbtack, BBB, Nextdoor, Facebook. Build 5–10 core citations with **exactly** the same NAP; Houzz especially fits a portfolio-driven finish carpenter.

### 3. No reviews strategy visible (Medium)
Referral-based businesses usually have delighted clients and zero online reviews. A simple "review us" link (GBP review URL) in post-project follow-up emails would compound. On-site testimonials: see content findings.

### 4. No llms.txt (Low)
`/llms.txt` returns 404. Publish one summarizing the business, services, service area, license, and key URLs — cheap insurance for AI-agent discovery. Example lives in this audit's ACTION-PLAN.md.

### 5. Email invisible to non-JS crawlers (Low)
Cloudflare email obfuscation replaces the address with `[email protected]` in raw HTML and adds a 404ing `/cdn-cgi/` link on all 19 pages (see technical.md #2). The address survives in JSON-LD, so entity data is intact — but turning obfuscation off is cleaner.

### 6. Sponsor/nofollow hygiene (Info)
Only two external links exist (CSLB, Instagram) — both legitimate, no issues.
