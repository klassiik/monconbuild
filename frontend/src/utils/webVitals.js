import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// Web Vitals reporting function
function sendToAnalytics(metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }

  // Send to your analytics service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics 4
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        metric_id: metric.id,
        metric_value: metric.value,
        metric_delta: metric.delta,
        custom_parameter_1: 'lighthouse_mcp'
      });
    }

    // Example: Send to your custom analytics endpoint
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent
      })
    }).catch(console.error);
  }
}

// Enhanced reporting with performance insights
function sendToAnalyticsWithInsights(metric) {
  const insights = generatePerformanceInsights(metric);
  
  sendToAnalytics({
    ...metric,
    insights
  });
}

// Generate AI-friendly performance insights
function generatePerformanceInsights(metric) {
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
  }

  return insights;
}

// Initialize Web Vitals tracking
export function initializeWebVitals() {
  onCLS(sendToAnalyticsWithInsights);
  onINP(sendToAnalyticsWithInsights);
  onFCP(sendToAnalyticsWithInsights);
  onLCP(sendToAnalyticsWithInsights);
  onTTFB(sendToAnalyticsWithInsights);
}

// Performance observer for additional metrics
export function initializePerformanceObserver() {
  if ('PerformanceObserver' in window) {
    // Observe navigation timing
    const navigationObserver = new PerformanceObserver((list) => {
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
    });

    navigationObserver.observe({ entryTypes: ['navigation'] });

    // Observe long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
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
    });

    if (PerformanceObserver.supportedEntryTypes.includes('longtask')) {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    }
  }
}

// Export performance data for Lighthouse MCP analysis
export function exportPerformanceData() {
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
    } : null
  };

  return performanceData;
}