import "./App.css";
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy-load Toaster to avoid pulling sonner/next-themes into the main bundle
const LazyToaster = lazy(() =>
  import('./components/ui/sonner').then((m) => ({ default: m.Toaster }))
);

/**
 * Root layout shared across every route. Renders the persistent chrome
 * (header/footer) with the matched page in the <Outlet />. Replaces the old
 * BrowserRouter tree now that routing is driven by vite-react-ssg's data router.
 */
export default function Layout() {
  // Mount toaster only after idle so it doesn't impact initial route JS
  const [mountToaster, setMountToaster] = useState(false);
  useEffect(() => {
    const onIdle = () => setMountToaster(true);
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(onIdle, { timeout: 3000 });
    } else {
      const t = setTimeout(onIdle, 1500);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-white focus:text-green-700 focus:font-bold focus:shadow-md top-0 left-0"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <Outlet />
        </main>
        <Footer />
        {mountToaster && (
          <Suspense fallback={null}>
            <LazyToaster />
          </Suspense>
        )}
      </div>
    </ErrorBoundary>
  );
}
