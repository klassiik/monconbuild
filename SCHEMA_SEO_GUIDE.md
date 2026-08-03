# Schema.org & Rich Site Links SEO Implementation Guide

## Overview
This document outlines the comprehensive Schema.org structured data implementation for Monument Construction's website to enable rich site links and enhanced search results in Google.

## ✅ Implementation Summary

### 1. **Organization Schema** (Global - index.html)
Located in `/frontend/public/index.html`

```json
{
  "@type": "GeneralContractor",
  "name": "Monument Construction",
  "url": "https://www.monconbuild.com",
  "logo": "https://www.monconbuild.com/android-chrome-512x512.png",
  "telephone": "(916) 607-1972",
  "address": {
    "addressLocality": "Colfax",
    "addressRegion": "CA",
    "postalCode": "95713"
  }
}
```

**Purpose**: Establishes business entity for Google Knowledge Graph

### 2. **WebSite Schema** (Global - index.html)
Enables Google Sitelinks Search Box

```json
{
  "@type": "WebSite",
  "name": "Monument Construction",
  "url": "https://www.monconbuild.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.monconbuild.com/search?q={search_term_string}"
  }
}
```

**Purpose**: Enables search box in Google search results (rich snippet)

### 3. **ItemList Schema** (Homepage - Home.jsx)
Lists all services for rich site links

```json
{
  "@type": "ItemList",
  "itemListElement": [
    {
      "position": 1,
      "url": "https://www.monconbuild.com/services/finish-carpentry",
      "name": "Finish Carpentry"
    },
    // ... 6 total services
  ]
}
```

**Purpose**: Tells Google which pages to show as site links under main result

### 4. **BreadcrumbList Schema** (All Pages - Breadcrumb.jsx)
Navigation hierarchy for each page

```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "position": 1, "name": "Home", "item": "https://www.monconbuild.com/" },
    { "position": 2, "name": "Services", "item": "https://www.monconbuild.com/services" },
    { "position": 3, "name": "Finish Carpentry", "item": "https://www.monconbuild.com/services/finish-carpentry" }
  ]
}
```

**Purpose**: Shows breadcrumb trail in search results, improves navigation UX

### 5. **Service Schema** (Service Pages)
Detailed service information with local SEO

```json
{
  "@type": "Service",
  "serviceType": "Finish Carpentry",
  "provider": {
    "@type": "GeneralContractor",
    "name": "Monument Construction"
  },
  "areaServed": [
    { "@type": "City", "name": "Colfax, CA" },
    { "@type": "City", "name": "Auburn, CA" }
  ]
}
```

**Purpose**: Rich snippets for service-specific searches

---

## 📁 File Structure

```
frontend/
├── public/
│   ├── index.html                   # Global Organization & WebSite schemas
│   ├── sitemap.xml                  # All 12 URLs with priorities
│   └── robots.txt                   # Crawl directives + sitemap reference
├── src/
│   ├── components/
│   │   ├── Breadcrumb.jsx          # Breadcrumb with schema injection
│   │   └── Schema.jsx              # Reusable schema components
│   ├── pages/
│   │   ├── Home.jsx                # Homepage with ItemList schema
│   │   ├── Services.jsx            # Services overview
│   │   ├── About.jsx               # About page
│   │   ├── Portfolio.jsx           # Portfolio page
│   │   ├── ServiceAreas.jsx        # Service areas page
│   │   ├── Contact.jsx             # Contact page
│   │   └── services/
│   │       ├── FinishCarpentry.jsx        # ✅ Schema + Breadcrumb
│   │       ├── GeneralConstruction.jsx    # ✅ Schema + Breadcrumb
│   │       ├── ResidentialProjects.jsx    # ✅ Schema + Breadcrumb
│   │       ├── HomeAdditions.jsx          # ✅ Schema + Breadcrumb
│   │       ├── CustomWoodwork.jsx         # ✅ Schema + Breadcrumb
│   │       └── CompleteRemodeling.jsx     # ✅ Schema + Breadcrumb
```

---

## 🎯 Expected Google Rich Results

### 1. **Site Links**
When users search "Monument Construction" or "Monument Construction Colfax", Google will display:

```
Monument Construction | Expert Finish Carpentry...
www.monconbuild.com
↳ Finish Carpentry    ↳ General Construction
↳ Home Additions      ↳ Custom Woodwork
↳ Complete Remodeling ↳ Residential Projects
```

### 2. **Breadcrumb Navigation**
On service pages:
```
Home > Services > Finish Carpentry
```

### 3. **Knowledge Panel** (Right side)
```
Monument Construction
GeneralContractor
★★★★★ Reviews
Colfax, CA
(916) 607-1972
License #801602
```

### 4. **Local Pack Results**
For searches like "finish carpentry Colfax CA":
- Map pin with business location
- Service details
- Reviews
- Call/Website buttons

---

## 🛠️ Implementation Components

### React-Helmet-Async Integration

**Installation**:
```bash
yarn add react-helmet-async
```

**Setup** (index.js):
```jsx
import { HelmetProvider } from 'react-helmet-async';

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
```

**Usage in Pages**:
```jsx
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>Page Title | Monument Construction</title>
  <meta name="description" content="..." />
  <link rel="canonical" href="https://www.monconbuild.com/page" />
  <script type="application/ld+json">
    {JSON.stringify(schema)}
  </script>
</Helmet>
```

---

## 📋 Semantic HTML Best Practices

### 1. **Landmark Roles**
```jsx
<header>           // Site header with navigation
<main>             // Main content area
<nav>              // Navigation menus
<section>          // Content sections
<article>          // Self-contained content
<aside>            // Sidebar content
<footer>           // Site footer
```

### 2. **ARIA Labels**
```jsx
<section aria-label="Hero section">
<nav aria-label="Breadcrumb">
<button aria-label="Call Monument Construction">
```

### 3. **Heading Hierarchy**
```jsx
<h1> - One per page (main heading)
<h2> - Section headings
<h3> - Subsection headings
```

---

## 🗺️ Sitemap.xml Structure

Located at `/frontend/public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage - Highest Priority -->
  <url>
    <loc>https://www.monconbuild.com/</loc>
    <lastmod>2025-10-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Main Pages - High Priority -->
  <url>
    <loc>https://www.monconbuild.com/services</loc>
    <priority>0.9</priority>
  </url>
  
  <!-- Service Detail Pages - Medium-High Priority -->
  <url>
    <loc>https://www.monconbuild.com/services/finish-carpentry</loc>
    <priority>0.8</priority>
  </url>
  
  <!-- Total: 12 URLs -->
</urlset>
```

**Priority Guidelines**:
- `1.0` - Homepage only
- `0.9` - Main category pages (Services, Contact)
- `0.8` - Important content (Service details, About, Portfolio)
- `0.7` - Supporting pages (Service Areas)

---

## 🤖 Robots.txt Configuration

Located at `/frontend/public/robots.txt`

```plaintext
User-agent: *
Allow: /

Sitemap: https://www.monconbuild.com/sitemap.xml

Crawl-delay: 1

# Disallow admin pages
Disallow: /admin/
Disallow: /_next/
Disallow: /api/

# Allow important resources
Allow: /images/
Allow: /css/
Allow: /js/
```

**Key Points**:
- Allows all search engines (`User-agent: *`)
- Points to sitemap for crawl discovery
- Blocks admin/API routes
- Explicitly allows static resources

---

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Verify all 12 URLs in sitemap.xml
- [ ] Test schema with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate sitemap at [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [ ] Check robots.txt at `/robots.txt`
- [ ] Build production bundle: `yarn build`

### Post-Deployment
- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Submit sitemap to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Request indexing for homepage
- [ ] Monitor coverage reports weekly

### Ongoing Monitoring
- [ ] Check "Enhancements" in Google Search Console for schema errors
- [ ] Monitor "Sitelinks" appearance (2-4 weeks after deployment)
- [ ] Track impressions/clicks for rich results
- [ ] Update lastmod dates monthly in sitemap

---

## 🔍 Testing Tools

1. **Google Rich Results Test**
   - URL: https://search.google.com/test/rich-results
   - Test each page individually
   - Verify Organization, Service, Breadcrumb schemas

2. **Schema Markup Validator**
   - URL: https://validator.schema.org/
   - Paste page HTML or enter URL
   - Check for warnings/errors

3. **Google Search Console**
   - URL: https://search.google.com/search-console
   - Monitor "Enhancements" > "Breadcrumbs"
   - Check "Coverage" for indexed pages

4. **Lighthouse SEO Audit**
   - Run `lighthouse https://www.monconbuild.com --view`
   - Check "Structured data is valid"
   - Target 100/100 SEO score

---

## 📊 Expected Timeline for Rich Results

| Feature | Timeline | Notes |
|---------|----------|-------|
| Indexing | 1-3 days | After sitemap submission |
| Breadcrumbs in SERPs | 1-2 weeks | Usually appears first |
| Site Links | 2-6 weeks | Requires authority/traffic |
| Knowledge Panel | 4-8 weeks | Depends on entity recognition |
| Local Pack | Immediate | If Google My Business verified |

---

## 🎓 Next Steps to Improve Rich Site Links

### 1. **Add Review Schema**
```json
{
  "@type": "Review",
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": "5"
  },
  "author": {
    "@type": "Person",
    "name": "John Doe"
  }
}
```

### 2. **Add FAQ Schema** (Services pages)
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does finish carpentry cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Costs vary based on project scope..."
      }
    }
  ]
}
```

### 3. ~~Add HowTo Schema~~ (DO NOT IMPLEMENT)
> **Deprecated:** Google removed HowTo rich results from search (desktop and
> mobile) in 2023. HowTo markup no longer produces any rich result — do not add
> it.

### 4. **Add Video Schema** (Future)
If adding project videos to portfolio

---

## 📞 Support Resources

- **Schema.org Documentation**: https://schema.org/
- **Google Search Central**: https://developers.google.com/search
- **Structured Data Guidelines**: https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data
- **Local Business Markup**: https://developers.google.com/search/docs/data-types/local-business

---

## 🔧 Troubleshooting

### Schema Not Showing in Rich Results Test
- Verify JSON-LD syntax (use JSON validator)
- Check if schema is inside `<Helmet>` component
- Ensure HelmetProvider wraps entire app

### Site Links Not Appearing
- Wait 2-6 weeks after deployment
- Increase internal linking to important pages
- Improve site authority (backlinks, traffic)
- Ensure pages have unique, descriptive titles

### Breadcrumbs Not Showing
- Verify URL structure matches schema
- Use absolute URLs in schema
- Check position values are sequential (1, 2, 3...)

---

**Last Updated**: October 22, 2025  
**Version**: 1.0  
**Maintained By**: Monument Construction Development Team
