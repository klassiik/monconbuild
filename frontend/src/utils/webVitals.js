import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { handleError } from './errorHandler';

// Web Vitals reporting function with enhanced error handling
function sendToAnalytics(metric) {
  try {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vital:', metric);
    }

    // Send to your analytics service in production
    if (process.env.NODE_ENV === 'production') {
      // Send to Google Analytics 4 if available
      if (window.gtag) {
        window.gtag('event', metric.name, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_id: metric.id,
          metric_value: metric.value,
          metric_delta: metric.delta,
          custom_parameter_1: 'lighthouse_mcp'
        });
      }

      // Log performance data for monitoring (no backend API needed for static sites)
      // Web vitals are automatically collected by Vercel Analytics if enabled
      if (process.env.NODE_ENV === 'development') {
        console.log('Production Web Vital:', {
          name: metric.name,
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          timestamp: Date.now(),
          url: window.location.href
        });
      }
    }
  } catch (error) {
    handleError(error, 'WEB_VITALS_ANALYTICS_ERROR', 'MEDIUM', {
      metric: metric?.name || 'unknown',
      environment: process.env.NODE_ENV
    });
  }
}

// Enhanced reporting with performance insights
function sendToAnalyticsWithInsights(metric) {
  try {
    const insights = generatePerformanceInsights(metric);
    
    sendToAnalytics({
      ...metric,
      insights
    });
  } catch (error) {
    handleError(error, 'WEB_VITALS_INSIGHTS_ERROR', 'MEDIUM', {
      metric: metric?.name || 'unknown'
    });
    // Fallback to basic reporting
    sendToAnalytics(metric);
  }
}

// Generate AI-friendly performance insights with error handling
function generatePerformanceInsights(metric) {
  try {
    const insights = {
      status: 'good',
      recommendation: '',
      priority: 'low'
    };

    switch (metric.name) {
      case 'CLS':
        if (metric.value > 0.25) {
          insights.status = 'poor';
          insights.recommendation = 'Optimize layout stability - consider image dimensions, font loading';
          insights.priority = 'high';
        } else if (metric.value > 0.1) {
          insights.status = 'needs improvement';
          insights.recommendation = 'Minor layout shifts detected - review dynamic content loading';
          insights.priority = 'medium';
        }
        break;

      case 'LCP':
        if (metric.value > 4000) {
          insights.status = 'poor';
          insights.recommendation = 'Optimize largest contentful paint - check image optimization, server response times';
          insights.priority = 'high';
        } else if (metric.value > 2500) {
          insights.status = 'needs improvement';
          insights.recommendation = 'Consider lazy loading, image optimization, or CDN implementation';
          insights.priority = 'medium';
        }
        break;

      case 'FID':
        if (metric.value > 300) {
          insights.status = 'poor';
          insights.recommendation = 'Reduce JavaScript execution time and main thread blocking';
          insights.priority = 'high';
        } else if (metric.value > 100) {
          insights.status = 'needs improvement';
          insights.recommendation = 'Consider code splitting and reducing JavaScript bundle size';
          insights.priority = 'medium';
        }
        break;

      case 'FCP':
        if (metric.value > 3000) {
          insights.status = 'poor';
          insights.recommendation = 'Optimize first contentful paint - check font loading and critical CSS';
          insights.priority = 'high';
        } else if (metric.value > 1800) {
          insights.status = 'needs improvement';
          insights.recommendation = 'Consider inlining critical CSS and optimizing font display';
          insights.priority = 'medium';
        }
        break;

      case 'TTFB':
        if (metric.value > 800) {
          insights.status = 'poor';
          insights.recommendation = 'Optimize server response time - check hosting, database queries, caching';
          insights.priority = 'high';
        } else if (metric.value > 600) {
          insights.status = 'needs improvement';
          insights.recommendation = 'Consider CDN implementation or server optimization';
          insights.priority = 'medium';
        }
        break;

      default:
        insights.recommendation = 'Monitor for performance optimization opportunities';
    }

    return insights;
  } catch (error) {
    handleError(error, 'PERFORMANCE_INSIGHTS_ERROR', 'LOW', {
      metric: metric?.name || 'unknown'
    });
    return {
      status: 'unknown',
      recommendation: 'Unable to generate insights due to error',
      priority: 'low'
    };
  }
}

// Initialize Web Vitals tracking with error boundaries
export function initializeWebVitals() {
  try {
    onCLS(sendToAnalyticsWithInsights);
    onINP(sendToAnalyticsWithInsights);
    onFCP(sendToAnalyticsWithInsights);
    onLCP(sendToAnalyticsWithInsights);
    onTTFB(sendToAnalyticsWithInsights);
    
    console.log('Web Vitals tracking initialized');
  } catch (error) {
    handleError(error, 'WEB_VITALS_INIT_ERROR', 'HIGH', {
      browserSupport: {
        webVitals: typeof onCLS === 'function',
        intersectionObserver: 'IntersectionObserver' in window,
        performanceObserver: 'PerformanceObserver' in window
      }
    });
  }
}

// Performance observer for additional metrics with error handling
export function initializePerformanceObserver() {
  try {
    if (!('PerformanceObserver' in window)) {
      handleError(new Error('PerformanceObserver not supported'), 'FEATURE_NOT_SUPPORTED', 'LOW', {
        feature: 'PerformanceObserver',
        userAgent: navigator.userAgent
      });
      return;
    }

    // Observe navigation timing
    const navigationObserver = new PerformanceObserver((list) => {
      try {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const metrics = {
              dns: entry.domainLookupEnd - entry.domainLookupStart,
              tcp: entry.connectEnd - entry.connectStart,
              request: entry.responseStart - entry.requestStart,
              response: entry.responseEnd - entry.responseStart,
              dom: entry.domContentLoadedEventEnd - entry.responseEnd,
              load: entry.loadEventEnd - entry.loadEventStart
            };

            sendToAnalytics({
              name: 'Navigation Timing',
              value: entry.loadEventEnd - entry.fetchStart,
              id: 'navigation-timing',
              delta: 0,
              metrics
            });
          }
        }
      } catch (error) {
        handleError(error, 'NAVIGATION_OBSERVER_ERROR', 'MEDIUM', {
          entryCount: list.getEntries().length
        });
      }
    });

    try {
      navigationObserver.observe({ entryTypes: ['navigation'] });
    } catch (error) {
      handleError(error, 'NAVIGATION_OBSERVER_START_ERROR', 'MEDIUM');
    }

    // Observe long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      try {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            sendToAnalytics({
              name: 'Long Task',
              value: entry.duration,
              id: `long-task-${entry.startTime}`,
              delta: 0,
              startTime: entry.startTime,
              attribution: entry.attribution
            });
          }
        }
      } catch (error) {
        handleError(error, 'LONG_TASK_OBSERVER_ERROR', 'LOW', {
          entryCount: list.getEntries().length
        });
      }
    });

    if (PerformanceObserver.supportedEntryTypes.includes('longtask')) {
      try {
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (error) {
        handleError(error, 'LONG_TASK_OBSERVER_START_ERROR', 'LOW');
      }
    }

    console.log('Performance observer initialized');
  } catch (error) {
    handleError(error, 'PERFORMANCE_OBSERVER_INIT_ERROR', 'MEDIUM', {
      browserSupport: {
        performanceObserver: 'PerformanceObserver' in window,
        supportedTypes: PerformanceObserver.supportedEntryTypes || []
      }
    });
  }
}

// Export performance data for Lighthouse MCP analysis with error handling
export function exportPerformanceData() {
  try {
    const performanceData = {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null,
      memory: performance.memory ? {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      } : null,
      timing: performance.timing ? {
        domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
        loadComplete: performance.timing.loadEventEnd - performance.timing.navigationStart,
        domInteractive: performance.timing.domInteractive - performance.timing.navigationStart
      } : null
    };

    return performanceData;
  } catch (error) {
    handleError(error, 'PERFORMANCE_DATA_EXPORT_ERROR', 'LOW');
    return {
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      error: 'Failed to export performance data'
    };
  }
}

// Wrapper function to initialize all performance monitoring with comprehensive error handling
export function initializePerformanceMonitoring() {
  try {
    console.log('Initializing comprehensive performance monitoring...');
    
    // Initialize with error boundaries
    initializeWebVitals();
    initializePerformanceObserver();
    
    // Log successful initialization
    console.log('Performance monitoring initialized successfully');
  } catch (error) {
    handleError(error, 'PERFORMANCE_MONITORING_INIT_ERROR', 'HIGH', {
      timestamp: new Date().toISOString()
    });
    
    // Fallback: Try basic initialization
    try {
      console.log('Attempting basic Web Vitals initialization...');
      onCLS(console.log);
      onLCP(console.log);
      onFCP(console.log);
    } catch (fallbackError) {
      handleError(fallbackError, 'PERFORMANCE_FALLBACK_ERROR', 'HIGH');
    }
  }
}