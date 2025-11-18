// TypeScript type definitions for Monument Construction website
import React from 'react';

export interface ContactInfo {
  PHONE: string;
  EMAIL: string;
  FORMATTED_PHONE: string;
}

export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface Project {
  image: string;
  title: string;
  description: string;
  alt: string;
}

export interface Testimonial {
  text: string;
  name: string;
  location: string;
  service?: string;
  image?: string;
}

export interface Feature {
  text: string;
  link?: string;
}

export interface PortfolioItem {
  name: string;
  currentSize: string;
  optimizedSize: string;
  savings: string;
  format: string;
  url: string;
}

export interface OptimizationResults {
  totalImages: number;
  totalSavings: string;
  sizeBefore: string;
  sizeAfter: string;
  lcpImprovement: string;
  performanceGain: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Error handling types
export type ErrorSeverity = 'LOW' | 'MEDIUM' | 'HIGH';
export type ErrorType = 
  | 'UNKNOWN'
  | 'IMAGE_LOAD_ERROR'
  | 'NETWORK_ERROR'
  | 'COMPONENT_RENDER_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'VALIDATION_ERROR'
  | 'API_ERROR'
  | 'ANALYTICS_SEND_ERROR'
  | 'WEB_VITALS_ANALYTICS_ERROR'
  | 'PERFORMANCE_INSIGHTS_ERROR'
  | 'WEB_VITALS_INIT_ERROR'
  | 'PERFORMANCE_OBSERVER_INIT_ERROR'
  | 'PERFORMANCE_DATA_EXPORT_ERROR'
  | 'GTM_TRACKING_ERROR'
  | 'FEATURE_NOT_SUPPORTED';

export interface ErrorDetails {
  [key: string]: any;
}

export interface AppError extends Error {
  type: ErrorType;
  severity: ErrorSeverity;
  details: ErrorDetails;
  timestamp: string;
}

export interface WebVitalMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  insights?: PerformanceInsights;
  metrics?: NavigationMetrics;
}

export interface PerformanceInsights {
  status: 'good' | 'needs improvement' | 'poor' | 'unknown';
  recommendation: string;
  priority: 'low' | 'medium' | 'high';
}

export interface NavigationMetrics {
  dns: number;
  tcp: number;
  request: number;
  response: number;
  dom: number;
  load: number;
}

export interface PerformanceData {
  timestamp: number;
  url: string;
  userAgent: string;
  connection?: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  };
  memory?: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
  timing?: {
    domContentLoaded: number;
    loadComplete: number;
    domInteractive: number;
  };
  error?: string;
}

// Image optimization types
export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  srcSet?: string;
  customSrcSet?: string;
  fallbackSrc?: string;
}

export interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  [key: string]: any;
}

export interface BackgroundImageProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

// Component props types
export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

// Navigation types
export interface NavItem {
  name: string;
  path: string;
}

// Schema.org types
export interface SchemaData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export interface WebPageSchema extends SchemaData {
  '@type': 'WebPage';
  '@id': string;
  url: string;
  name: string;
  description: string;
  isPartOf: {
    '@type': 'WebSite';
    '@id': string;
  };
  about: {
    '@type': 'GeneralContractor';
    name: string;
  };
  primaryImageOfPage: {
    '@type': 'ImageObject';
    url: string;
    description: string;
  };
}

export interface ItemListSchema extends SchemaData {
  '@type': 'ItemList';
  name: string;
  description: string;
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    url: string;
    name: string;
    description: string;
  }>;
}

export interface FAQPageSchema extends SchemaData {
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

// API types for backend communication
export interface StatusCheck {
  id: string;
  client_name: string;
  timestamp: string;
  authenticated_user?: string;
}

export interface StatusCheckCreate {
  client_name: string;
}

export interface ErrorResponse {
  error: string;
  detail: string;
  timestamp: string;
}

// Environment types
export interface EnvironmentVariables {
  REACT_APP_PHONE_NUMBER?: string;
  REACT_APP_EMAIL_ADDRESS?: string;
  MONGO_URL?: string;
  DB_NAME?: string;
  CORS_ORIGINS?: string;
  API_SECRET_KEY?: string;
  ALLOWED_HOSTS?: string;
  MONGO_TLS?: string;
  MONGO_TLS_INSECURE?: string;
  MONGO_CA_FILE?: string;
  MONGO_CERT_FILE?: string;
  MONGO_KEY_FILE?: string;
  RATE_LIMIT_REQUESTS?: string;
  RATE_LIMIT_WINDOW?: string;
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T> = T & {};
export type Nullable<T> = T | null;
export type AsyncFunction<T = void> = (...args: any[]) => Promise<T>;

// Hook return types
export interface UseStateReturn<T> {
  state: T;
  setState: React.Dispatch<React.SetStateAction<T>>;
}

export interface UseAsyncReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: AsyncFunction<T>;
}

// Event types
export interface CustomEvent {
  event: string;
  eventCategory: string;
  eventLabel?: string;
  [key: string]: any;
}

// Navigation timing types
export interface PerformanceEntry {
  entryType: string;
  startTime: number;
  duration?: number;
  [key: string]: any;
}

// Style types
export interface CSSProperties {
  [key: string]: string | number;
}

export interface TailwindClasses {
  [key: string]: boolean | string | undefined;
}