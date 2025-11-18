// Shared constants for Monument Construction
// This file centralizes all hardcoded values for better maintainability

// Contact Information - Use environment variables in production
export const CONTACT_INFO = {
  PHONE: process.env.REACT_APP_PHONE_NUMBER || '9166071972',
  EMAIL: process.env.REACT_APP_EMAIL_ADDRESS || 'monumentconstruction@comcast.net',
  FORMATTED_PHONE: `(${process.env.REACT_APP_PHONE_NUMBER || '916'}) ${process.env.REACT_APP_PHONE_NUMBER?.slice(3, 6) || '607'}-${process.env.REACT_APP_PHONE_NUMBER?.slice(6) || '1972'}`
};

// Company Information
export const COMPANY_INFO = {
  NAME: process.env.REACT_APP_COMPANY_NAME || 'Monument Construction',
  LICENSE: process.env.REACT_APP_COMPANY_LICENSE || '801602',
  FULL_LICENSE: `License #${process.env.REACT_APP_COMPANY_LICENSE || '801602'}`,
  DOMAIN: 'www.monconbuild.com',
  FULL_URL: 'https://www.monconbuild.com',
  CSLB_URL: `https://www.cslb.ca.gov/${process.env.REACT_APP_COMPANY_LICENSE || '801602'}`
};

// Service Areas
export const SERVICE_AREAS = {
  PRIMARY: ['Colfax', 'Auburn', 'Grass Valley', 'Nevada City', 'Truckee'],
  COUNTIES: ['Placer County', 'Nevada County'],
  ALL: (process.env.REACT_APP_SERVICE_AREAS || 'Colfax,Auburn,Grass Valley,Nevada City,Truckee').split(',').map(area => area.trim())
};

// Analytics Configuration
export const ANALYTICS = {
  GTM_ID: process.env.REACT_APP_GTM_ID || 'GTM-M8F6JTDV',
  GA_ID: process.env.REACT_APP_GA_ID || null,
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true' || true,
  ENABLE_PERFORMANCE_MONITORING: process.env.REACT_APP_ENABLE_PERFORMANCE_MONITORING === 'true' || true
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api',
  ENDPOINTS: {
    WEB_VITALS: '/analytics/web-vitals',
    STATUS: '/status'
  }
};

// SEO Configuration
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Monument Construction | Expert Finish Carpentry & General Contractor Colfax CA',
  DEFAULT_DESCRIPTION: 'Professional finish carpentry and construction services in Colfax, CA. Licensed contractor #801602. Featured on DIY Network. (916) 607-1972.',
  DEFAULT_KEYWORDS: 'general contractor Colfax CA, finish carpenter Placer County, construction company Nevada County CA, home remodeling Colfax California, Monument Construction, licensed contractor 801602',
  CANONICAL_URL: 'https://www.monconbuild.com'
};

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  STICKY_CTA_TRIGGER_SCROLL: 600, // Pixels to scroll before showing sticky CTA
  IMAGE_LOADING_TIMEOUT: 5000, // Timeout for image loading
  API_REQUEST_TIMEOUT: 10000, // Timeout for API requests
  RETRY_ATTEMPTS: 3, // Number of retry attempts for failed requests
  BATCH_SIZE: 10 // Number of items to batch for analytics
};

// Accessibility Configuration
export const ACCESSIBILITY_CONFIG = {
  FOCUS_VISIBLE_OUTLINE: '2px solid #2563eb',
  SKIP_LINK_ENABLED: true,
  REDUCED_MOTION: '(prefers-reduced-motion: reduce)',
  HIGH_CONTRAST: '(prefers-contrast: high)'
};

// Schema Markup Configuration
export const SCHEMA_CONFIG = {
  ORGANIZATION: {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "name": COMPANY_INFO.NAME,
    "alternateName": `${COMPANY_INFO.NAME} Colfax`,
    "url": COMPANY_INFO.FULL_URL,
    "logo": `${COMPANY_INFO.FULL_URL}/android-chrome-512x512.png`,
    "image": "https://customer-assets.emergentagent.com/job_finish-woodwork/artifacts/rdyxjzid_Untitled%283%29.png",
    "description": "Professional finish carpentry and general construction services in Colfax, CA serving Placer and Nevada Counties. Featured on DIY Network TV. Licensed contractor #801602.",
    "telephone": `(${CONTACT_INFO.PHONE.slice(0, 3)}) ${CONTACT_INFO.PHONE.slice(3, 6)}-${CONTACT_INFO.PHONE.slice(6)}`,
    "email": CONTACT_INFO.EMAIL,
    "priceRange": "$$",
    "areaServed": [
      { "@type": "City", "name": "Colfax", "containedInPlace": { "@type": "AdministrativeArea", "name": "Placer County" } },
      { "@type": "City", "name": "Auburn" },
      { "@type": "City", "name": "Grass Valley" },
      { "@type": "City", "name": "Nevada City" },
      { "@type": "City", "name": "Truckee" }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    }
  }
};

// Export commonly used combinations
export const BUSINESS_INFO = {
  ...COMPANY_INFO,
  ...CONTACT_INFO,
  SERVICE_AREAS: SERVICE_AREAS.ALL
};