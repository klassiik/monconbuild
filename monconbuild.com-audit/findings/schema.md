# Schema / Structured Data — monconbuild.com
Audited: 2026-07-20 · Score: 62/100

## What works
- **GeneralContractor** org schema baked into raw HTML on every page: NAP, geo coordinates, `areaServed` (5 counties + 7 cities), openingHours, priceRange, email, logo. No fake `aggregateRating` (correct — never add one without real, on-page reviews).
- **WebSite** schema with publisher link to `#organization`.
- **Page-type schema everywhere**: WebPage/CollectionPage/AboutPage/ContactPage per page.
- **Person schema** for owner William Rogers on /about — strong E-E-A-T entity signal.
- **Service + WebPage + BreadcrumbList** on all 7 city pages — all valid JSON.
- **CreativeWork** items (10) on /portfolio.
- BreadcrumbList on main pages (/services, /about, /portfolio, /service-areas, /contact).

## Findings

### 1. FAQPage JSON-LD is invalid on ALL 6 service pages (High — top fix of this audit)
The FAQ schema ships HTML-entity-encoded: the script tag contains `{&quot;@context&quot;:&quot;https://schema.org&quot;,...}` instead of real quotes. Entities inside `<script>` are **not** decoded by HTML parsing, so Google receives invalid JSON and drops the entire FAQPage block on:
finish-carpentry, general-construction, residential-projects, home-additions, custom-woodwork, complete-remodeling.

**Root cause** — `frontend/src/components/FAQSection.jsx:32-36` renders the JSON as a JSX text child in the body:
```jsx
<script type="application/ld+json">
  {JSON.stringify(faqSchema)}
</script>
```
React SSG escapes text children of every element, including `<script>`. The Head-based schema (react-helmet) is serialized unescaped, which is why every other block on the site is fine.

**Fix**:
```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```
(The same anti-pattern exists in the unused `TrustBadges.jsx:53`; fix or delete — see content findings re: dead code.)

Note: Google now shows FAQ rich results only for authoritative gov/health sites, so don't expect SERP accordions — but valid FAQPage markup still feeds Google's understanding and AI search engines, and the Q&A content itself (visible accordion text) is excellent.

### 2. BreadcrumbList missing on 4 of 6 service pages (Medium)
Present on finish-carpentry and home-additions; **absent** on general-construction, residential-projects, custom-woodwork, complete-remodeling. Inconsistent implementation — add the `Breadcrumb` component (which emits valid schema) to the other four.

### 3. `sameAs` lists only Instagram (Medium)
The org schema's `sameAs` contains just `https://www.instagram.com/wrconstruct7/`. Add every authoritative profile to strengthen entity reconciliation:
- Google Business Profile URL (or Maps short link)
- BuildZoom profile (exists: buildzoom.com/contractor/monument-construction, score 94)
- CSLB license page (already linked in page body: cslb.ca.gov/801602)
- LinkedIn/Facebook/Yelp/Houzz once created (see local findings).

### 4. Enrichment opportunities (Low)
- Add `hasCredential` / license number to the org schema (`"identifier"` or a `GovernmentPermit`-style credential referencing CSLB #801602) — it's a differentiator already shown on-page.
- `address` has no `streetAddress`; BuildZoom publishes "22245 Placer Hills Rd, Colfax". If that address is correct **and** you're comfortable publishing it (many home-based contractors aren't), adding it strengthens NAP; otherwise leave as-is and keep GBP set to service-area mode.
- Consider `Review`/`aggregateRating` **only** when real testimonials with attribution are published on-page.
