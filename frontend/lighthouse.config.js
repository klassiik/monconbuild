/**
 * Lighthouse CI Configuration
 * 
 * This configuration handles different scenarios for performance auditing:
 * - Local development (with Chrome security workarounds)
 * - Production URLs
 * - CI/CD environments
 */

module.exports = {
  ci: {
    collect: {
      // For local development, use production URL or setup tunnel
      url: process.env.NODE_ENV === 'production' 
        ? ['https://monconbuild.vercel.app/'] 
        : ['http://localhost:3000'],
      
      // Chrome flags for local development
      chromeFlags: [
        '--headless',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-features=VizDisplayCompositor',
        '--disable-web-security',
        '--disable-features=TranslateUI',
        '--disable-ipc-flooding-protection',
        '--allow-running-insecure-content',
        '--ignore-certificate-errors',
        '--ignore-ssl-errors',
        '--ignore-certificate-errors-spki-list',
        '--user-data-dir=/tmp/chrome-lighthouse'
      ],
      
      // Retry failed audits
      numberOfRuns: 1,
      
      // Skip certain audits that might fail in localhost
      skipAudits: process.env.NODE_ENV !== 'production' ? [
        'uses-https',
        'redirects-http'
      ] : []
    },
    
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports'
    },
    
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.8 }],
        'categories:seo': ['warn', { minScore: 0.8 }]
      }
    }
  },
  
  // Development-specific settings
  development: {
    // Alternative: Use ngrok or similar tunneling service
    // url: 'https://abc123.ngrok.io',
    
    // Or test against staging/production URL
    fallbackUrl: 'https://monconbuild.vercel.app/'
  }
};