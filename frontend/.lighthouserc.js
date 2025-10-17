module.exports = {
  ci: {
    collect: {
      // URLs to audit (local development and production)
      url: [
        'http://localhost:3000',
        'http://localhost:3000/services',
        'http://localhost:3000/about',
        'http://localhost:3000/portfolio',
        'http://localhost:3000/service-areas',
        'http://localhost:3000/contact'
      ],
      // Number of runs per URL for more accurate results
      numberOfRuns: 3,
      // Lighthouse settings
      settings: {
        chromeFlags: '--no-sandbox --disable-gpu --headless',
        preset: 'desktop',
        // Enable all categories
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        // Skip certain audits that might not be relevant
        skipAudits: [
          'uses-http2',
          'redirects-http'
        ]
      }
    },
    assert: {
      // Performance thresholds
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        // Core Web Vitals thresholds
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }]
      }
    },
    upload: {
      // Store results for historical tracking
      target: 'filesystem',
      outputDir: './lighthouse-reports',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%'
    },
    server: {
      // For CI/CD integration
      command: 'yarn start',
      port: 3000,
      // Wait for server to be ready
      waitForTimeout: 30000
    }
  }
};