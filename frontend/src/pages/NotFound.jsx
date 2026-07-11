import React from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';

/**
 * 404 page. Rendered client-side for any unmatched route and emitted as a static
 * dist/404.html that Vercel automatically serves (with a real 404 status) for
 * URLs that don't match a prerendered file.
 */
export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-24">
      <Head>
        <title>Page Not Found | Monument Construction</title>
        <meta name="description" content="The page you're looking for could not be found." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="text-center max-w-xl">
        <p className="text-green-700 font-semibold text-lg mb-2">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          We couldn't find that page
        </h1>
        <p className="text-gray-600 mb-8">
          The page may have moved or no longer exists. Let's get you back to solid ground.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="border border-gray-300 hover:border-green-700 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
