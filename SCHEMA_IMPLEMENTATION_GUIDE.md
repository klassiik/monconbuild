# Quick Implementation Guide: Adding Schema to Remaining Service Pages

## Overview
This guide shows how to add Schema.org structured data, breadcrumbs, and semantic SEO to the remaining 5 service pages that don't yet have it.

## Template Pattern

### Step 1: Import Required Dependencies

Add to top of each service page file:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import { Button } from '../../components/ui/button';
// ... other imports
```

### Step 2: Define Breadcrumb Items

Add after component declaration:

```jsx
const ServiceName = () => {
  // Breadcrumb data
  const breadcrumbItems = [
    { name: 'Services', url: 'https://www.monconbuild.com/services' },
    { name: 'Service Name Here', url: 'https://www.monconbuild.com/services/service-slug' }
  ];
```

### Step 3: Define Service Schema

```jsx
  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Service Name",
    "provider": {
      "@type": "GeneralContractor",
      "name": "Monument Construction",
      "telephone": "(916) 607-1972",
      "email": "monumentconstruction@comcast.net",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Colfax",
        "addressRegion": "CA",
        "postalCode": "95713",
        "addressCountry": "US"
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "license",
        "name": "California Contractor License #801602"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Colfax, CA" },
      { "@type": "City", "name": "Auburn, CA" },
      { "@type": "City", "name": "Grass Valley, CA" },
      { "@type": "City", "name": "Nevada City, CA" },
      { "@type": "City", "name": "Truckee, CA" }
    ],
    "description": "Service description here with local keywords",
    "url": "https://www.monconbuild.com/services/service-slug"
  };
```

### Step 4: Add Helmet and Breadcrumb to JSX Return

```jsx
  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags and Schema */}
      <Helmet>
        <title>Service Name in Colfax, CA | Monument Construction</title>
        <meta name="description" content="Service description with local SEO keywords in Colfax, Placer County & Nevada County. Licensed contractor #801602. Call (916) 607-1972." />
        <link rel="canonical" href="https://www.monconbuild.com/services/service-slug" />
        <meta property="og:title" content="Service Name in Colfax, CA | Monument Construction" />
        <meta property="og:description" content="Service description for social sharing" />
        <meta property="og:url" content="https://www.monconbuild.com/services/service-slug" />
        
        {/* Service Schema */}
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Rest of your component JSX... */}
```

---

## Service-Specific Implementations

### 1. GeneralConstruction.jsx

```jsx
const breadcrumbItems = [
  { name: 'Services', url: 'https://www.monconbuild.com/services' },
  { name: 'General Construction', url: 'https://www.monconbuild.com/services/general-construction' }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "General Construction",
  "description": "Complete general construction services from foundation to finish in Colfax and Placer County, CA.",
  "url": "https://www.monconbuild.com/services/general-construction",
  // ... rest of schema
};

// Helmet meta tags:
<title>General Construction Services in Colfax, California | Monument Construction</title>
<meta name="description" content="Licensed general contractor in Colfax, Placer County & Nevada County. Complete construction services from foundation to finish. License #801602. Call (916) 607-1972." />
<link rel="canonical" href="https://www.monconbuild.com/services/general-construction" />
```

### 2. ResidentialProjects.jsx

```jsx
const breadcrumbItems = [
  { name: 'Services', url: 'https://www.monconbuild.com/services' },
  { name: 'Residential Projects', url: 'https://www.monconbuild.com/services/residential-projects' }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Residential Construction",
  "description": "Professional residential construction and renovation projects in Colfax and Placer County.",
  "url": "https://www.monconbuild.com/services/residential-projects",
  // ... rest of schema
};

// Helmet meta tags:
<title>Residential Construction Projects in Colfax, CA | Monument Construction</title>
<meta name="description" content="Expert residential construction and renovation in Colfax, Placer County & Nevada County. New homes, remodels, additions. License #801602. Call (916) 607-1972." />
<link rel="canonical" href="https://www.monconbuild.com/services/residential-projects" />
```

### 3. HomeAdditions.jsx

```jsx
const breadcrumbItems = [
  { name: 'Services', url: 'https://www.monconbuild.com/services' },
  { name: 'Home Additions', url: 'https://www.monconbuild.com/services/home-additions' }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Home Additions",
  "description": "Professional home additions and room expansions in Colfax, Placer County, and Nevada County.",
  "url": "https://www.monconbuild.com/services/home-additions",
  // ... rest of schema
};

// Helmet meta tags:
<title>Home Additions & Extensions in Colfax, CA | Monument Construction</title>
<meta name="description" content="Expert home additions and room expansions in Colfax, Placer County & Nevada County. Second stories, ADUs, bump-outs. License #801602. Call (916) 607-1972." />
<link rel="canonical" href="https://www.monconbuild.com/services/home-additions" />
```

### 4. CustomWoodwork.jsx

```jsx
const breadcrumbItems = [
  { name: 'Services', url: 'https://www.monconbuild.com/services' },
  { name: 'Custom Woodwork', url: 'https://www.monconbuild.com/services/custom-woodwork' }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Custom Woodwork",
  "description": "Master craftsmanship in custom cabinetry and artisan woodwork for Colfax and Placer County homes.",
  "url": "https://www.monconbuild.com/services/custom-woodwork",
  // ... rest of schema
};

// Helmet meta tags:
<title>Custom Woodwork & Cabinetry in Colfax, CA | Monument Construction</title>
<meta name="description" content="Artisan custom woodwork and cabinetry in Colfax, Placer County & Nevada County. Master craftsmanship, custom furniture. License #801602. Call (916) 607-1972." />
<link rel="canonical" href="https://www.monconbuild.com/services/custom-woodwork" />
```

### 5. CompleteRemodeling.jsx

```jsx
const breadcrumbItems = [
  { name: 'Services', url: 'https://www.monconbuild.com/services' },
  { name: 'Complete Remodeling', url: 'https://www.monconbuild.com/services/complete-remodeling' }
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Complete Remodeling",
  "description": "Full-service home remodeling and renovation in Colfax and Placer County, California.",
  "url": "https://www.monconbuild.com/services/complete-remodeling",
  // ... rest of schema
};

// Helmet meta tags:
<title>Complete Home Remodeling in Colfax, California | Monument Construction</title>
<meta name="description" content="Expert whole-house remodeling in Colfax, Placer County & Nevada County. Kitchen, bath, full renovations. License #801602. Call (916) 607-1972." />
<link rel="canonical" href="https://www.monconbuild.com/services/complete-remodeling" />
```

---

## Additional Pages to Enhance

### Services.jsx (Main Services Page)

Add to Services overview page:

```jsx
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';

const Services = () => {
  const breadcrumbItems = [
    { name: 'Services', url: 'https://www.monconbuild.com/services' }
  ];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Construction Services | Monument Construction Colfax CA</title>
        <meta name="description" content="Professional construction services in Colfax: finish carpentry, general construction, remodeling, home additions, custom woodwork. Licensed #801602." />
        <link rel="canonical" href="https://www.monconbuild.com/services" />
      </Helmet>
      
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Rest of component */}
    </div>
  );
};
```

### About.jsx

```jsx
const breadcrumbItems = [
  { name: 'About Us', url: 'https://www.monconbuild.com/about' }
];

<Helmet>
  <title>About Monument Construction | Licensed Contractor Colfax CA</title>
  <meta name="description" content="Learn about Monument Construction - featured on DIY Network TV. Licensed contractor #801602 serving Placer & Nevada Counties since 1999." />
  <link rel="canonical" href="https://www.monconbuild.com/about" />
</Helmet>

<Breadcrumb items={breadcrumbItems} />
```

### Portfolio.jsx

```jsx
const breadcrumbItems = [
  { name: 'Portfolio', url: 'https://www.monconbuild.com/portfolio' }
];

<Helmet>
  <title>Construction Portfolio | Monument Construction Projects Colfax CA</title>
  <meta name="description" content="View our portfolio of custom finish carpentry and construction projects in Colfax and Placer County. Licensed contractor #801602." />
  <link rel="canonical" href="https://www.monconbuild.com/portfolio" />
</Helmet>

<Breadcrumb items={breadcrumbItems} />
```

### Contact.jsx

```jsx
const breadcrumbItems = [
  { name: 'Contact Us', url: 'https://www.monconbuild.com/contact' }
];

<Helmet>
  <title>Contact Monument Construction | Colfax CA Contractor</title>
  <meta name="description" content="Contact Monument Construction in Colfax for a free quote. Licensed contractor #801602. Call (916) 607-1972 or email monumentconstruction@comcast.net." />
  <link rel="canonical" href="https://www.monconbuild.com/contact" />
</Helmet>

<Breadcrumb items={breadcrumbItems} />
```

### ServiceAreas.jsx

```jsx
const breadcrumbItems = [
  { name: 'Service Areas', url: 'https://www.monconbuild.com/service-areas' }
];

<Helmet>
  <title>Service Areas | Colfax, Auburn, Grass Valley, Nevada City CA</title>
  <meta name="description" content="Monument Construction serves Colfax, Auburn, Grass Valley, Nevada City, Truckee, Placer County & Nevada County. Licensed contractor #801602." />
  <link rel="canonical" href="https://www.monconbuild.com/service-areas" />
</Helmet>

<Breadcrumb items={breadcrumbItems} />
```

---

## Testing Checklist

After implementing schema on all pages:

### 1. **Rich Results Test**
Test each URL:
- https://search.google.com/test/rich-results
- Paste URL or HTML
- Verify no errors

### 2. **Schema Validator**
- https://validator.schema.org/
- Check warnings
- Verify all required fields present

### 3. **Local Testing**
```bash
# Start dev server
yarn start

# Check browser console for errors
# View page source - verify schema in <head>
```

### 4. **Build and Deploy**
```bash
cd frontend
yarn build
git add -A
git commit -m "Add comprehensive Schema.org structured data to all pages for rich site links"
git push
vercel --prod --yes
```

---

## Expected Results Timeline

1. **Week 1**: Google indexes new schemas
2. **Week 2-3**: Breadcrumbs appear in search results
3. **Week 4-6**: Site links begin appearing for brand searches
4. **Week 8+**: Rich snippets for service-specific searches

---

## Monitoring

### Google Search Console
1. Go to **Enhancements** > **Breadcrumbs**
2. Check for valid breadcrumb markup
3. Monitor **Coverage** for indexed pages

### Search Appearance
Search for:
- "Monument Construction"
- "Monument Construction Colfax"
- "finish carpentry Colfax CA"
- "general contractor Placer County"

Look for:
- Site links under main result
- Breadcrumb trails
- Enhanced snippets

---

**Pro Tip**: After deployment, request indexing in Google Search Console for faster processing:
1. Go to URL Inspection tool
2. Enter each page URL
3. Click "Request Indexing"

This accelerates the process from weeks to days!
