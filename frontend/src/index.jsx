import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from '@/App';
import "@/index.css";

// vite-react-ssg drives rendering/hydration and provides the Head (react-helmet)
// context, so no manual createRoot/hydrateRoot or HelmetProvider is needed here.
export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    // Client-only side effects (skipped during static generation)
    if (!isClient) return;

    // Register service worker for aggressive caching
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
          // Service worker registration failed
        });
      });
    }

    if (import.meta.env.PROD) {
      const runAfterIdle = (cb) => {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(cb, { timeout: 3000 });
        } else {
          setTimeout(cb, 1500);
        }
      };

      // Deferred performance monitoring
      runAfterIdle(async () => {
        try {
          const mod = await import('./utils/webVitals');
          mod.initializeWebVitals?.();
          mod.initializePerformanceObserver?.();
        } catch (e) {
          // Performance monitoring failed to load
        }
      });

      // Microsoft Clarity
      runAfterIdle(async () => {
        try {
          const { clarity } = await import('microsoft-clarity');
          clarity.init('trqrzo6kg0');
        } catch (e) {
          // Clarity failed to initialize
        }
      });
    }
  },
);
