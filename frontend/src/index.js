import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import "@/index.css";
import App from "@/App";
// Defer performance scripts to reduce main bundle size and JS execution on load
// We'll dynamically import web vitals after the page is idle in production

// Register service worker for aggressive caching
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(() => {
        // Service worker registered successfully
      })
      .catch(() => {
        // Service worker registration failed
      });
  });
}

// Initialize performance monitoring (deferred and production-only)
if (process.env.NODE_ENV === 'production') {
  const runAfterIdle = (cb) => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(cb, { timeout: 3000 });
    } else {
      setTimeout(cb, 1500);
    }
  };

  runAfterIdle(async () => {
    try {
      const mod = await import('./utils/webVitals');
      mod.initializeWebVitals?.();
      mod.initializePerformanceObserver?.();
    } catch (e) {
      // Performance monitoring failed to load
    }
  });
}

// Preload critical resources
if (typeof window !== 'undefined') {
  const preloadCSS = document.createElement('link');
  preloadCSS.rel = 'preload';
  preloadCSS.href = '/static/css/main.css';
  preloadCSS.as = 'style';
  document.head.appendChild(preloadCSS);
}

const rootElement = document.getElementById("root");

// Use hydrate if the HTML is pre-rendered (from react-snap)
// Otherwise use render for development
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(
    rootElement,
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </React.StrictMode>
  );
}
