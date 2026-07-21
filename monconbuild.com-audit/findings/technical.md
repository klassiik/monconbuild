# Technical SEO — monconbuild.com
Audited: 2026-07-20 (live site) · Score: 88/100

## What works
- **HTTPS + HSTS preload** (`max-age=63072000; includeSubDomains; preload`), full security header set: CSP, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy. Best-in-class for a small business site.
- **robots.txt** clean: `User-agent: * / Allow: /` + sitemap reference. No accidental blocking.
- **Sitemap.xml** valid, 19 URLs, all return 200, all match canonical host (www, no trailing slash), uses `lastmod`.
- **404 handling** returns real HTTP 404 (SPA soft-404 problem avoided).
- **Canonicals**: self-referencing on all 19 pages, exactly one per page.
- **URL hygiene**: `cleanUrls`, no trailing slashes; `/services/`, `/index.html`, `/home`, and apex all resolve to the canonical URL. Case variants 404 (acceptable).
- **SSG prerendering**: full HTML (title, meta, content, schema) ships without JS — vite-react-ssg is doing its job. `<html lang="en">` present.
- **IndexNow key** deployed and live (`/k83s5m7kdq214g8v7y5x2ue18nn79ycx.txt` → 200).
- **TTFB ~50ms** via Cloudflare + Vercel edge cache.

## Findings

### 1. Apex→www redirect is 307 Temporary (Medium)
`https://monconbuild.com/*` → `https://www.monconbuild.com/*` returns **307**, not a permanent redirect — despite `frontend/vercel.json` declaring `"permanent": true` (which yields 308). The Vercel **dashboard domain-level redirect** (Project → Settings → Domains) is overriding vercel.json and is set to temporary.
**Fix**: In Vercel dashboard, set the apex `monconbuild.com` redirect to www as **308 Permanent** (or remove the dashboard redirect so vercel.json's rule applies). Temporary redirects can dilute consolidation signals to the www host.

### 2. Dead link `/cdn-cgi/l/email-protection` on all 19 pages (Medium)
Cloudflare's Email Address Obfuscation rewrites the `mailto:` footer/contact links. Crawlers that don't run JS see a link to `/cdn-cgi/l/email-protection` (HTTP 404) on every page, and the visible email renders as `[email protected]` in raw HTML. The real email survives only inside the JSON-LD (scripts aren't rewritten).
**Fix**: Cloudflare dashboard → Scrape Shield → turn **off** Email Address Obfuscation. The address is already public in schema on every page, so obfuscation adds a sitewide crawl error for no privacy gain.

### 3. Stale preconnect to customer-assets.emergentagent.com (Low)
`frontend/index.html` still preconnects + dns-prefetches `customer-assets.emergentagent.com`, but every image on the live site is now served locally. Wasted connection setup on every page load.
**Fix**: delete both hints from `frontend/index.html`.

### 4. Redirect chain from insecure apex (Low)
`http://monconbuild.com` → `https://monconbuild.com` (301) → `https://www.monconbuild.com` (307) = 2 hops. Fixing finding #1 doesn't remove the hop but makes it permanent. Optionally add a Cloudflare redirect rule sending `http://monconbuild.com` straight to `https://www.monconbuild.com` in one hop.

### 5. Local sitemap.xml out of sync with deployed (Info)
Working copy `frontend/public/sitemap.xml` (uncommitted change) shows older lastmod dates than the deployed sitemap (deployed homepage: 2026-07-20). The build pipeline (`frontend/scripts/generate-sitemap.mjs`) appears to regenerate it; the uncommitted local edit is probably noise. Consider committing or discarding it.

### 6. Obsolete meta keywords tag (Info)
`frontend/index.html` ships `<meta name="keywords">` sitewide. Ignored by Google since 2009; harmless, but it leaks a keyword list to competitors. Optional removal.
