import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Schema Component - Injects JSON-LD structured data into page head
 * @param {Object} schema - Schema.org JSON-LD object
 */
export const Schema = ({ schema }) => {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

/**
 * Breadcrumb Schema Component
 * @param {Array} items - Array of breadcrumb items with name and url
 */
export const BreadcrumbSchema = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <Schema schema={schema} />;
};

/**
 * Service Schema Component
 * @param {Object} service - Service details
 */
export const ServiceSchema = ({ service }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.name,
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
      }
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Colfax, CA"
      },
      {
        "@type": "City",
        "name": "Auburn, CA"
      },
      {
        "@type": "City",
        "name": "Grass Valley, CA"
      },
      {
        "@type": "City",
        "name": "Nevada City, CA"
      },
      {
        "@type": "City",
        "name": "Truckee, CA"
      }
    ],
    "description": service.description,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD",
        "price": "Request Quote"
      }
    }
  };

  return <Schema schema={schema} />;
};

/**
 * Article/Page Schema Component
 * @param {Object} page - Page details
 */
export const PageSchema = ({ page }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.description,
    "url": page.url,
    "mainEntity": {
      "@type": "GeneralContractor",
      "name": "Monument Construction"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Monument Construction",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.monconbuild.com/android-chrome-512x512.png"
      }
    },
    "datePublished": page.datePublished || "2024-01-01",
    "dateModified": page.dateModified || new Date().toISOString().split('T')[0]
  };

  return <Schema schema={schema} />;
};

/**
 * FAQ Schema Component
 * @param {Array} faqs - Array of FAQ objects with question and answer
 */
export const FAQSchema = ({ faqs }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <Schema schema={schema} />;
};

export default Schema;

