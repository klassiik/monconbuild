#!/usr/bin/env node

/**
 * Lighthouse Metrics API Integration
 * Run Lighthouse performance tests programmatically
 * 
 * Usage:
 *   node scripts/lighthouse-test.js [url]
 *   node scripts/lighthouse-test.js --all
 */

const https = require('https');

// Configuration
const LIGHTHOUSE_API = 'lighthouse-metrics.com';
const LIGHTHOUSE_PATH = '/v1/lighthouse/checks';

// Pages to test
const PAGES = [
  { url: 'https://www.monconbuild.com/', name: 'Home' },
  { url: 'https://www.monconbuild.com/services', name: 'Services' },
  { url: 'https://www.monconbuild.com/about', name: 'About' },
  { url: 'https://www.monconbuild.com/portfolio', name: 'Portfolio' },
  { url: 'https://www.monconbuild.com/contact', name: 'Contact' },
  { url: 'https://www.monconbuild.com/service-areas', name: 'Service Areas' },
  { url: 'https://www.monconbuild.com/services/finish-carpentry', name: 'Finish Carpentry' },
  { url: 'https://www.monconbuild.com/services/general-construction', name: 'General Construction' },
  { url: 'https://www.monconbuild.com/services/home-additions', name: 'Home Additions' },
  { url: 'https://www.monconbuild.com/services/residential-projects', name: 'Residential Projects' },
  { url: 'https://www.monconbuild.com/services/custom-woodwork', name: 'Custom Woodwork' },
  { url: 'https://www.monconbuild.com/services/complete-remodeling', name: 'Complete Remodeling' }
];

// Region options: us-west1, us-east1, europe-west1, asia-east1
const DEFAULT_REGIONS = ['us-west1'];

/**
 * Run Lighthouse test via API
 */
function runLighthouseTest(url, regions = DEFAULT_REGIONS) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      url: url,
      regions: regions
    });

    const options = {
      hostname: LIGHTHOUSE_API,
      port: 443,
      path: LIGHTHOUSE_PATH,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          if (data.trim() === '') {
            resolve({ 
              success: true, 
              message: 'Test initiated (no response body)',
              statusCode: res.statusCode 
            });
          } else {
            const response = JSON.parse(data);
            resolve(response);
          }
        } catch (error) {
          // Return raw response if JSON parse fails
          resolve({ 
            raw: data, 
            statusCode: res.statusCode,
            error: `Parse failed: ${error.message}` 
          });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Display results in console
 */
function displayResults(pageName, url, response) {
  console.log('\n' + '='.repeat(60));
  console.log(`📊 Lighthouse Test: ${pageName}`);
  console.log('='.repeat(60));
  console.log(`URL: ${url}`);
  console.log(`Status Code: ${response.statusCode || 'N/A'}`);
  
  if (response.id) {
    console.log(`✅ Test initiated successfully`);
    console.log(`Test ID: ${response.id}`);
    console.log(`View results: https://lighthouse-metrics.com/checks/${response.id}`);
  } else if (response.success) {
    console.log(`✅ ${response.message}`);
  } else if (response.error) {
    console.log(`❌ Error: ${response.error}`);
  } else if (response.raw) {
    console.log('Raw response:', response.raw.substring(0, 200));
  } else {
    console.log('Response:', JSON.stringify(response, null, 2));
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  
  console.log('🚀 Lighthouse Metrics API - Performance Testing');
  console.log('');

  try {
    if (args.includes('--all')) {
      // Test all pages
      console.log(`Testing ${PAGES.length} pages...\n`);
      
      for (const page of PAGES) {
        console.log(`🔍 Testing ${page.name}...`);
        const response = await runLighthouseTest(page.url);
        displayResults(page.name, page.url, response);
        
        // Wait 2 seconds between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } else if (args.length > 0) {
      // Test specific URL
      const url = args[0];
      console.log(`Testing: ${url}\n`);
      const response = await runLighthouseTest(url);
      displayResults('Custom URL', url, response);
    } else {
      // Test homepage only
      const homepage = PAGES[0];
      console.log(`Testing: ${homepage.name}\n`);
      const response = await runLighthouseTest(homepage.url);
      displayResults(homepage.name, homepage.url, response);
    }

    console.log('\n✨ Testing complete!');
    console.log('📈 View all reports at: https://lighthouse-metrics.com\n');

  } catch (error) {
    console.error('\n❌ Error running Lighthouse tests:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { runLighthouseTest, PAGES };
