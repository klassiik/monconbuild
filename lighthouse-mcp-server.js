const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

class LighthouseMCPServer {
  constructor(options = {}) {
    this.options = {
      port: options.port || 3001,
      targetUrl: options.targetUrl || 'http://localhost:3000',
      reportPath: options.reportPath || './lighthouse-reports',
      aiModel: options.aiModel || 'gpt-4',
      ...options
    };
    
    this.performanceHistory = [];
  }

  async initialize() {
    // Ensure report directory exists
    if (!fs.existsSync(this.options.reportPath)) {
      fs.mkdirSync(this.options.reportPath, { recursive: true });
    }

    console.log(`Lighthouse MCP Server initialized on port ${this.options.port}`);
  }

  async runAudit(urls = []) {
    const auditUrls = urls.length > 0 ? urls : [this.options.targetUrl];
    const results = [];

    for (const url of auditUrls) {
      console.log(`Running Lighthouse audit for: ${url}`);
      
      try {
        // Launch Chrome with flags for local development
        const chrome = await chromeLauncher.launch({ 
          chromeFlags: [
            '--headless',
            '--no-sandbox',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--disable-dev-shm-usage',
            '--allow-running-insecure-content',
            '--disable-setuid-sandbox'
          ] 
        });
        
        // Run Lighthouse audit
        const options = {
          logLevel: 'info',
          output: 'json',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          port: chrome.port,
          formFactor: 'desktop',
          screenEmulation: {
            mobile: false,
            width: 1350,
            height: 940,
            deviceScaleFactor: 1,
            disabled: false,
          },
          throttling: {
            rttMs: 40,
            throughputKbps: 10240,
            cpuSlowdownMultiplier: 1,
            requestLatencyMs: 0,
            downloadThroughputKbps: 0,
            uploadThroughputKbps: 0,
          },
        };
        
        const auditResult = await lighthouse.default(url, options);
        await chrome.kill();

        const analysis = await this.analyzeWithAI(auditResult);
        
        const result = {
          url,
          timestamp: Date.now(),
          scores: auditResult.lhr.categories,
          metrics: this.extractKeyMetrics(auditResult.lhr),
          opportunities: auditResult.lhr.audits,
          aiAnalysis: analysis,
          recommendations: await this.generateRecommendations(auditResult, analysis)
        };

        results.push(result);
        this.performanceHistory.push(result);

        // Save detailed report
        await this.saveReport(result);

      } catch (error) {
        console.error(`Error auditing ${url}:`, error);
        results.push({
          url,
          error: error.message,
          timestamp: Date.now()
        });
      }
    }

    return results;
  }

  extractKeyMetrics(lhr) {
    const audits = lhr.audits;
    
    return {
      // Core Web Vitals
      lcp: audits['largest-contentful-paint']?.numericValue,
      fid: audits['max-potential-fid']?.numericValue,
      cls: audits['cumulative-layout-shift']?.numericValue,
      
      // Loading metrics
      fcp: audits['first-contentful-paint']?.numericValue,
      speedIndex: audits['speed-index']?.numericValue,
      tbt: audits['total-blocking-time']?.numericValue,
      
      // Additional metrics
      ttfb: audits['server-response-time']?.numericValue,
      interactive: audits['interactive']?.numericValue,
      
      // Resource metrics
      unusedCSS: audits['unused-css-rules']?.details?.overallSavingsBytes,
      unusedJS: audits['unused-javascript']?.details?.overallSavingsBytes,
      unoptimizedImages: audits['uses-optimized-images']?.details?.overallSavingsBytes,
      
      // Performance budget
      performanceBudget: audits['performance-budget']?.details?.items
    };
  }

  async analyzeWithAI(auditResult) {
    try {
      // For now, we'll provide a mock AI analysis
      // In a real implementation, you would call OpenAI API here
      const analysis = this.mockAIAnalysis(auditResult);

      return {
        summary: analysis.summary,
        criticalIssues: analysis.criticalIssues,
        quickWins: analysis.quickWins,
        longTermOptimizations: analysis.longTermOptimizations,
        priorityScore: analysis.priorityScore
      };
    } catch (error) {
      console.error('AI analysis failed:', error);
      return {
        summary: 'AI analysis unavailable - using basic analysis',
        criticalIssues: [],
        quickWins: [],
        longTermOptimizations: [],
        priorityScore: 0
      };
    }
  }

  mockAIAnalysis(auditResult) {
    const lhr = auditResult.lhr;
    const scores = lhr.categories;
    const perfScore = scores.performance?.score * 100;

    return {
      summary: `Performance score is ${perfScore}/100. ${perfScore >= 90 ? 'Excellent performance!' : perfScore >= 70 ? 'Good performance with room for improvement.' : 'Performance needs significant optimization.'}`,
      criticalIssues: perfScore < 70 ? [
        { title: 'Slow loading times', description: 'Page takes too long to load', priority: 'high' },
        { title: 'Large bundle size', description: 'JavaScript bundles are too large', priority: 'high' }
      ] : [],
      quickWins: [
        { title: 'Enable text compression', description: 'Use gzip/brotli compression', impact: '10-20% improvement' },
        { title: 'Optimize images', description: 'Convert to WebP format', impact: '15-25% improvement' }
      ],
      longTermOptimizations: [
        { title: 'Implement code splitting', description: 'Split code by routes', impact: '20-30% improvement' },
        { title: 'Add service worker', description: 'Cache resources for repeat visits', impact: '40-60% improvement' }
      ],
      priorityScore: perfScore < 70 ? 9 : perfScore < 90 ? 6 : 3
    };
  }

  createAnalysisPrompt(auditResult) {
    const lhr = auditResult.lhr;
    const scores = lhr.categories;
    const metrics = this.extractKeyMetrics(lhr);

    return `
Analyze this Lighthouse audit result and provide optimization recommendations:

Performance Score: ${scores.performance?.score * 100}/100
Accessibility Score: ${scores.accessibility?.score * 100}/100
Best Practices Score: ${scores['best-practices']?.score * 100}/100
SEO Score: ${scores.seo?.score * 100}/100

Key Metrics:
- LCP: ${metrics.lcp}ms
- FID: ${metrics.fid}ms
- CLS: ${metrics.cls}
- FCP: ${metrics.fcp}ms
- Speed Index: ${metrics.speedIndex}ms
- Total Blocking Time: ${metrics.tbt}ms

Failed Audits:
${Object.entries(lhr.audits)
  .filter(([_, audit]) => audit.score !== null && audit.score < 1)
  .map(([key, audit]) => `- ${audit.title}: ${audit.description}`)
  .join('\n')}

Please provide:
1. A concise summary of the performance state
2. Critical issues that need immediate attention
3. Quick wins for easy performance improvements
4. Long-term optimization strategies
5. A priority score (1-10) for overall optimization urgency

Focus on actionable, specific recommendations for a React application using Tailwind CSS and modern web technologies.
`;
  }

  async generateRecommendations(auditResult, aiAnalysis) {
    const recommendations = [];
    const audits = auditResult.lhr.audits;

    // Code-level recommendations
    if (audits['unused-css-rules']?.score < 1) {
      recommendations.push({
        type: 'code',
        priority: 'high',
        title: 'Remove Unused CSS',
        description: 'Optimize Tailwind CSS purging configuration',
        implementation: `
// Update tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  // Add safelist for dynamic classes
  safelist: [
    // Add classes that are dynamically generated
  ]
}`,
        estimatedImpact: '10-30% reduction in CSS bundle size'
      });
    }

    if (audits['unused-javascript']?.score < 1) {
      recommendations.push({
        type: 'code',
        priority: 'high',
        title: 'Code Splitting Optimization',
        description: 'Implement route-based code splitting',
        implementation: `
// Use React.lazy for route components
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));

// Wrap routes with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/services" element={<Services />} />
  </Routes>
</Suspense>`,
        estimatedImpact: '20-40% reduction in initial bundle size'
      });
    }

    if (audits['uses-optimized-images']?.score < 1) {
      recommendations.push({
        type: 'asset',
        priority: 'medium',
        title: 'Image Optimization',
        description: 'Convert images to modern formats and add responsive loading',
        implementation: `
// Use next/image equivalent or implement lazy loading
<img 
  src="/images/hero.webp" 
  alt="Hero image"
  loading="lazy"
  width="800"
  height="600"
  className="object-cover"
/>`,
        estimatedImpact: '15-25% reduction in image payload'
      });
    }

    // Add AI-generated recommendations
    if (aiAnalysis.quickWins) {
      aiAnalysis.quickWins.forEach(win => {
        recommendations.push({
          type: 'ai-suggestion',
          priority: 'medium',
          title: win.title,
          description: win.description,
          implementation: win.code || 'See AI analysis for details',
          estimatedImpact: win.impact || 'See AI analysis for impact estimation'
        });
      });
    }

    return recommendations;
  }

  async saveReport(result) {
    const filename = `lighthouse-report-${Date.now()}.json`;
    const filepath = path.join(this.options.reportPath, filename);
    
    await fs.promises.writeFile(
      filepath, 
      JSON.stringify(result, null, 2),
      'utf8'
    );

    console.log(`Report saved: ${filepath}`);
  }

  async getPerformanceHistory(limit = 10) {
    return this.performanceHistory.slice(-limit);
  }

  async comparePerformance(current, previous) {
    if (!previous) return null;

    const comparison = {
      performance: {
        current: current.scores.performance?.score * 100,
        previous: previous.scores.performance?.score * 100,
        change: (current.scores.performance?.score - previous.scores.performance?.score) * 100
      },
      metrics: {}
    };

    // Compare key metrics
    ['lcp', 'fid', 'cls', 'fcp', 'speedIndex', 'tbt'].forEach(metric => {
      if (current.metrics[metric] && previous.metrics[metric]) {
        comparison.metrics[metric] = {
          current: current.metrics[metric],
          previous: previous.metrics[metric],
          change: current.metrics[metric] - previous.metrics[metric],
          percentChange: ((current.metrics[metric] - previous.metrics[metric]) / previous.metrics[metric]) * 100
        };
      }
    });

    return comparison;
  }
}

module.exports = LighthouseMCPServer;