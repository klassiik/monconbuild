// Shared constants for Monument Construction
// This file centralizes all hardcoded values for better maintainability

// Contact Information - Use environment variables in production
export const CONTACT_INFO = {
  PHONE: import.meta.env.VITE_PHONE_NUMBER || '9166071972',
  EMAIL: import.meta.env.VITE_EMAIL_ADDRESS || 'monumentconstruction@comcast.net',
  FORMATTED_PHONE: `(${import.meta.env.VITE_PHONE_NUMBER || '916'}) ${import.meta.env.VITE_PHONE_NUMBER?.slice(3, 6) || '607'}-${import.meta.env.VITE_PHONE_NUMBER?.slice(6) || '1972'}`
};

// Company Information
export const COMPANY_INFO = {
  NAME: import.meta.env.VITE_COMPANY_NAME || 'Monument Construction',
  LICENSE: import.meta.env.VITE_COMPANY_LICENSE || '801602',
  FULL_LICENSE: `License #${import.meta.env.VITE_COMPANY_LICENSE || '801602'}`,
  DOMAIN: 'www.monconbuild.com',
  FULL_URL: 'https://www.monconbuild.com',
  CSLB_URL: `https://www.cslb.ca.gov/${import.meta.env.VITE_COMPANY_LICENSE || '801602'}`
};

// Service Areas
export const SERVICE_AREAS = {
  PRIMARY: ['Colfax', 'Auburn', 'Grass Valley', 'Nevada City', 'Truckee', 'Sacramento', 'Elk Grove', 'Folsom', 'Davis', 'El Dorado Hills', 'South Lake Tahoe', 'Placerville'],
  COUNTIES: ['Placer County', 'Nevada County', 'Sacramento County', 'Yolo County', 'El Dorado County'],
  PLACER_COUNTY: ['Colfax', 'Auburn', 'Roseville', 'Rocklin', 'Lincoln', 'Loomis', 'Granite Bay', 'Foresthill', 'Applegate', 'Weimar'],
  NEVADA_COUNTY: ['Grass Valley', 'Nevada City', 'Truckee', 'Penn Valley', 'Rough and Ready', 'Lake of the Pines', 'Lake Wildwood', 'Washington', 'Chicago Park', 'North San Juan'],
  SACRAMENTO_COUNTY: ['Sacramento', 'Elk Grove', 'Arden-Arcade', 'Folsom', 'Citrus Heights', 'Rancho Cordova', 'Carmichael', 'Florin', 'North Highlands', 'Antelope', 'Vineyard', 'Foothill Farms', 'Orangevale', 'Fair Oaks', 'Galt'],
  YOLO_COUNTY: ['Davis', 'Woodland', 'West Sacramento', 'Winters'],
  EL_DORADO_COUNTY: ['El Dorado Hills', 'South Lake Tahoe', 'Cameron Park', 'Diamond Springs', 'Placerville', 'Pollock Pines', 'Shingle Springs', 'Auburn Lake Trails', 'Georgetown', 'Camino', 'Cool', 'Tahoma', 'Cold Springs', 'Coloma', 'Shingle Springs Rancheria'],
  ALL: (import.meta.env.VITE_SERVICE_AREAS || 'Colfax,Auburn,Grass Valley,Nevada City,Truckee,Sacramento,Elk Grove,Folsom,Davis,Woodland,El Dorado Hills,South Lake Tahoe,Placerville').split(',').map(area => area.trim())
};

// Analytics Configuration
export const ANALYTICS = {
  GTM_ID: import.meta.env.VITE_GTM_ID || 'GTM-M8F6JTDV',
  GA_ID: import.meta.env.VITE_GA_ID || null,
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true' || true,
  ENABLE_PERFORMANCE_MONITORING: import.meta.env.VITE_ENABLE_PERFORMANCE_MONITORING === 'true' || true
};

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
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
    "description": "Professional finish carpentry and general construction services serving Placer, Nevada, Sacramento, and Yolo Counties in Northern California. Featured on DIY Network TV. Licensed contractor #801602.",
    "telephone": `(${CONTACT_INFO.PHONE.slice(0, 3)}) ${CONTACT_INFO.PHONE.slice(3, 6)}-${CONTACT_INFO.PHONE.slice(6)}`,
    "email": CONTACT_INFO.EMAIL,
    "priceRange": "$$",
    "areaServed": [
      // Placer County
      { "@type": "City", "name": "Colfax", "containedInPlace": { "@type": "AdministrativeArea", "name": "Placer County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Auburn", "containedInPlace": { "@type": "AdministrativeArea", "name": "Placer County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Roseville", "containedInPlace": { "@type": "AdministrativeArea", "name": "Placer County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Rocklin", "containedInPlace": { "@type": "AdministrativeArea", "name": "Placer County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Lincoln", "containedInPlace": { "@type": "AdministrativeArea", "name": "Placer County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Folsom", "containedInPlace": { "@type": "AdministrativeArea", "name": "Placer County", "containedInPlace": { "@type": "State", "name": "California" } } },
      // Nevada County
      { "@type": "City", "name": "Grass Valley", "containedInPlace": { "@type": "AdministrativeArea", "name": "Nevada County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Nevada City", "containedInPlace": { "@type": "AdministrativeArea", "name": "Nevada County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Truckee", "containedInPlace": { "@type": "AdministrativeArea", "name": "Nevada County", "containedInPlace": { "@type": "State", "name": "California" } } },
      // Sacramento County
      { "@type": "City", "name": "Sacramento", "containedInPlace": { "@type": "AdministrativeArea", "name": "Sacramento County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Elk Grove", "containedInPlace": { "@type": "AdministrativeArea", "name": "Sacramento County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Arden-Arcade", "containedInPlace": { "@type": "AdministrativeArea", "name": "Sacramento County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Folsom", "containedInPlace": { "@type": "AdministrativeArea", "name": "Sacramento County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Citrus Heights", "containedInPlace": { "@type": "AdministrativeArea", "name": "Sacramento County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Rancho Cordova", "containedInPlace": { "@type": "AdministrativeArea", "name": "Sacramento County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Carmichael", "containedInPlace": { "@type": "AdministrativeArea", "name": "Sacramento County", "containedInPlace": { "@type": "State", "name": "California" } } },
      // Yolo County
      { "@type": "City", "name": "Davis", "containedInPlace": { "@type": "AdministrativeArea", "name": "Yolo County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Woodland", "containedInPlace": { "@type": "AdministrativeArea", "name": "Yolo County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "West Sacramento", "containedInPlace": { "@type": "AdministrativeArea", "name": "Yolo County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Winters", "containedInPlace": { "@type": "AdministrativeArea", "name": "Yolo County", "containedInPlace": { "@type": "State", "name": "California" } } },
      // El Dorado County
      { "@type": "City", "name": "El Dorado Hills", "containedInPlace": { "@type": "AdministrativeArea", "name": "El Dorado County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "South Lake Tahoe", "containedInPlace": { "@type": "AdministrativeArea", "name": "El Dorado County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Placerville", "containedInPlace": { "@type": "AdministrativeArea", "name": "El Dorado County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Cameron Park", "containedInPlace": { "@type": "AdministrativeArea", "name": "El Dorado County", "containedInPlace": { "@type": "State", "name": "California" } } },
      { "@type": "City", "name": "Diamond Springs", "containedInPlace": { "@type": "AdministrativeArea", "name": "El Dorado County", "containedInPlace": { "@type": "State", "name": "California" } } }
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