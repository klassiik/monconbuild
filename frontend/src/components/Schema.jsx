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
      { "@type": "City", "name": "Colfax, CA" },
      { "@type": "City", "name": "Auburn, CA" },
      { "@type": "City", "name": "Grass Valley, CA" },
      { "@type": "City", "name": "Nevada City, CA" },
      { "@type": "City", "name": "Truckee, CA" },
      { "@type": "City", "name": "Sacramento, CA" },
      { "@type": "City", "name": "Elk Grove, CA" },
      { "@type": "City", "name": "Folsom, CA" },
      { "@type": "City", "name": "Citrus Heights, CA" },
      { "@type": "City", "name": "Rancho Cordova, CA" },
      { "@type": "City", "name": "Davis, CA" },
      { "@type": "City", "name": "Woodland, CA" },
      { "@type": "City", "name": "West Sacramento, CA" },
      { "@type": "City", "name": "El Dorado Hills, CA" },
      { "@type": "City", "name": "South Lake Tahoe, CA" },
      { "@type": "City", "name": "Placerville, CA" }
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

/**
 * ImageGallery Schema Component for Portfolio Pages
 * @param {Object} gallery - Gallery details with title, description, and images
 */
export const ImageGallerySchema = ({ gallery }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": gallery.title,
    "description": gallery.description,
    "url": gallery.url || "https://www.monconbuild.com/portfolio",
    "image": gallery.images.map((img, index) => ({
      "@type": "ImageObject",
      "url": img.url.startsWith('http') ? img.url : `https://www.monconbuild.com${img.url}`,
      "name": img.name || `${gallery.title} - Image ${index + 1}`,
      "caption": img.caption || img.name,
      "contentLocation": img.location || "Northern California"
    })),
    "creator": {
      "@type": "GeneralContractor",
      "name": "Monument Construction",
      "@id": "https://www.monconbuild.com/#organization"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Monument Construction",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.monconbuild.com/android-chrome-512x512.png"
      }
    }
  };

  return <Schema schema={schema} />;
};

/**
 * CreativeWork Schema Component for Individual Portfolio Projects
 * @param {Object} project - Project details
 */
export const CreativeWorkSchema = ({ project }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://www.monconbuild.com/portfolio#${project.id}`,
    "name": project.title,
    "description": project.description,
    "url": `https://www.monconbuild.com/portfolio#${project.id}`,
    "image": project.images.map(img => 
      img.startsWith('http') ? img : `https://www.monconbuild.com${img}`
    ),
    "creator": {
      "@type": "GeneralContractor",
      "name": "Monument Construction",
      "@id": "https://www.monconbuild.com/#organization",
      "telephone": "(916) 607-1972"
    },
    "locationCreated": {
      "@type": "Place",
      "name": project.location,
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "CA",
        "addressCountry": "US"
      }
    },
    "genre": project.category,
    "keywords": `${project.category}, ${project.location}, construction, finish carpentry, Monument Construction`,
    "inLanguage": "en-US"
  };

  return <Schema schema={schema} />;
};

/**
 * PortfolioPage Schema - Combines ImageGallery with ItemList for SEO
 * @param {Array} projects - Array of portfolio projects
 */
export const PortfolioPageSchema = ({ projects }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Monument Construction Portfolio - Construction Projects in Northern California",
    "description": "View our portfolio of finish carpentry, home additions, kitchen remodels, and construction projects throughout Placer, Nevada, Sacramento & El Dorado Counties.",
    "url": "https://www.monconbuild.com/portfolio",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Construction Portfolio Projects",
      "description": "Featured construction and finish carpentry projects by Monument Construction",
      "numberOfItems": projects.length,
      "itemListElement": projects.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://www.monconbuild.com/portfolio#${project.id}`,
        "name": project.title,
        "description": project.description,
        "image": project.thumbnail.startsWith('http') ? project.thumbnail : `https://www.monconbuild.com${project.thumbnail}`
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.monconbuild.com/" },
        { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://www.monconbuild.com/portfolio" }
      ]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Monument Construction",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.monconbuild.com/android-chrome-512x512.png"
      }
    }
  };

  return <Schema schema={schema} />;
};

export default Schema;

