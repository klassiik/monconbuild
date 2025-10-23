import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';
import "@/index.css";
import App from "@/App";
import { initializeWebVitals, initializePerformanceObserver } from "./utils/webVitals";

// Register service worker for aggressive caching
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Initialize performance monitoring
initializeWebVitals();
initializePerformanceObserver();

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
