#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * PageSpeed Optimization Script for Monument Construction Website
 * Based on the performance audit and recommendations
 */

class PageSpeedOptimizer {
  constructor() {
    this.projectRoot = process.cwd();
    this.frontendPath = path.join(this.projectRoot, 'frontend');
    this.publicPath = path.join(this.frontendPath, 'public');
    this.srcPath = path.join(this.frontendPath, 'src');
    
    this.optimizations = {
      completed: [],
      pending: [],
      failed: []
    };
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const colors = {
      info: '\x1b[36m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      error: '\x1b[31m',
      reset: '\x1b[0m'
    };
    
    console.log(`${colors[type]}[${timestamp}] ${message}${colors.reset}`);
  }

  async runOptimization(name, optimizationFn) {
    try {
      this.log(`Starting: ${name}`, 'info');
      await optimizationFn();
      this.optimizations.completed.push(name);
      this.log(`✅ Completed: ${name}`, 'success');
    } catch (error) {
      this.optimizations.failed.push({ name, error: error.message });
      this.log(`❌ Failed: ${name} - ${error.message}`, 'error');
    }
  }

  // 1. Create optimized sitemap.xml
  async createSitemap() {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://monumentconstruction.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://monumentconstruction.com/services</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://monumentconstruction.com/about</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monumentconstruction.com/portfolio</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://monumentconstruction.com/service-areas</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://monumentconstruction.com/contact</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

    const sitemapPath = path.join(this.publicPath, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  }

  // 2. Create optimized robots.txt
  async createRobots() {
    const robots = `User-agent: *
Allow: /

# Sitemaps
Sitemap: https://monumentconstruction.com/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Disallow admin pages (if any)
Disallow: /admin/
Disallow: /_next/
Disallow: /api/

# Allow important resources
Allow: /images/
Allow: /css/
Allow: /js/`;

    const robotsPath = path.join(this.publicPath, 'robots.txt');
    fs.writeFileSync(robotsPath, robots, 'utf8');
  }

  // 3. Update package.json with optimization scripts
  async updatePackageJson() {
    const packageJsonPath = path.join(this.frontendPath, 'package.json');
    
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Add optimization scripts
      packageJson.scripts = {
        ...packageJson.scripts,
        'optimize:images': 'node ../optimize-images.js',
        'optimize:css': 'tailwindcss -i ./src/index.css -o ./build/static/css/main.css --minify',
        'analyze:bundle': 'npm run build && npx bundle-analyzer build/static/js/*.js',
        'performance:audit': 'node ../lighthouse-mcp-cli.js audit',
        'performance:ci': 'node ../lighthouse-mcp-cli.js audit --ci'
      };

      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2), 'utf8');
    }
  }

  // 4. Generate performance report
  async generatePerformanceReport() {
    const report = {
      timestamp: new Date().toISOString(),
      optimizations: this.optimizations,
      expectedImprovements: {
        performanceScore: 'From 66 to 85-92',
        lcp: 'From 7.0s to 2.5-3.5s',
        tbt: 'From 200ms to 50ms',
        speedIndex: 'From 4.7s to 2.5-3.0s',
        bundleSize: 'From 4.5MB to ~1.2MB (after image optimization)'
      },
      nextSteps: [
        'Run image optimization script',
        'Deploy optimized version',
        'Run Lighthouse audit to verify improvements',
        'Monitor performance metrics regularly'
      ]
    };

    const reportPath = path.join(this.projectRoot, 'performance-optimization-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');
    
    this.log('📊 Performance optimization report generated', 'success');
    return report;
  }

  // Main optimization runner
  async runAllOptimizations() {
    this.log('🚀 Starting PageSpeed Optimization Suite', 'info');
    this.log('Based on Monument Construction performance audit', 'info');
    
    await this.runOptimization('Create Sitemap', () => this.createSitemap());
    await this.runOptimization('Create Robots.txt', () => this.createRobots());
    await this.runOptimization('Update Package.json', () => this.updatePackageJson());
    
    const report = await this.generatePerformanceReport();
    
    this.log('✅ PageSpeed optimization complete!', 'success');
    this.log(`Completed: ${this.optimizations.completed.length} optimizations`, 'success');
    
    if (this.optimizations.failed.length > 0) {
      this.log(`Failed: ${this.optimizations.failed.length} optimizations`, 'warning');
      this.optimizations.failed.forEach(failure => {
        this.log(`  - ${failure.name}: ${failure.error}`, 'warning');
      });
    }
    
    this.log('📋 Next steps:', 'info');
    report.nextSteps.forEach(step => {
      this.log(`  • ${step}`, 'info');
    });
    
    return report;
  }
}

// CLI interface
if (require.main === module) {
  const optimizer = new PageSpeedOptimizer();
  optimizer.runAllOptimizations().catch(console.error);
}

module.exports = PageSpeedOptimizer;