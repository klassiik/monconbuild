#!/usr/bin/env node

const { program } = require('commander');
const LighthouseMCPServer = require('./lighthouse-mcp-server.js');
const fs = require('fs');
const path = require('path');

program
  .name('lighthouse-mcp')
  .description('Lighthouse MCP CLI for automated performance auditing with AI insights')
  .version('1.0.0');

program
  .command('audit')
  .description('Run Lighthouse audit with AI analysis')
  .option('-u, --urls <urls>', 'Comma-separated URLs to audit', 'http://localhost:3000')
  .option('-o, --output <path>', 'Output directory for reports', './lighthouse-reports')
  .option('-m, --model <model>', 'AI model to use for analysis', 'gpt-4')
  .option('-f, --format <format>', 'Output format (json|html|csv)', 'json')
  .option('--ci', 'Run in CI mode with strict thresholds')
  .option('--compare', 'Compare with previous audit results')
  .action(async (options) => {
    console.log('🚀 Starting Lighthouse MCP Audit...\n');
    
    const server = new LighthouseMCPServer({
      reportPath: options.output,
      aiModel: options.model
    });

    try {
      await server.initialize();
      
      const urls = options.urls.split(',').map(url => url.trim());
      console.log(`Auditing ${urls.length} URL(s):`);
      urls.forEach(url => console.log(`  - ${url}`));
      console.log('');

      const results = await server.runAudit(urls);

      // Generate summary
      console.log('📊 Audit Results Summary:');
      console.log('========================');
      
      results.forEach(result => {
        if (result.error) {
          console.log(`❌ ${result.url}: Error - ${result.error}`);
          return;
        }

        const scores = result.scores;
        console.log(`\n🌐 ${result.url}`);
        console.log(`  Performance: ${Math.round(scores.performance?.score * 100)}/100 ${getScoreEmoji(scores.performance?.score)}`);
        console.log(`  Accessibility: ${Math.round(scores.accessibility?.score * 100)}/100 ${getScoreEmoji(scores.accessibility?.score)}`);
        console.log(`  Best Practices: ${Math.round(scores['best-practices']?.score * 100)}/100 ${getScoreEmoji(scores['best-practices']?.score)}`);
        console.log(`  SEO: ${Math.round(scores.seo?.score * 100)}/100 ${getScoreEmoji(scores.seo?.score)}`);

        // Show key metrics
        console.log(`  Core Web Vitals:`);
        console.log(`    LCP: ${result.metrics.lcp}ms`);
        console.log(`    CLS: ${result.metrics.cls}`);
        console.log(`    TBT: ${result.metrics.tbt}ms`);

        // Show AI recommendations
        if (result.aiAnalysis && result.aiAnalysis.quickWins.length > 0) {
          console.log(`  🎯 Quick Wins:`);
          result.aiAnalysis.quickWins.slice(0, 3).forEach(win => {
            console.log(`    - ${win.title}`);
          });
        }
      });

      // CI mode checks
      if (options.ci) {
        console.log('\n🔍 CI Mode: Checking thresholds...');
        let failed = false;
        
        results.forEach(result => {
          if (result.error) {
            failed = true;
            return;
          }

          const perfScore = result.scores.performance?.score * 100;
          const a11yScore = result.scores.accessibility?.score * 100;
          
          if (perfScore < 90) {
            console.log(`❌ Performance score too low: ${perfScore}/100 (required: 90+)`);
            failed = true;
          }
          
          if (a11yScore < 90) {
            console.log(`❌ Accessibility score too low: ${a11yScore}/100 (required: 90+)`);
            failed = true;
          }
        });

        if (failed) {
          console.log('\n💥 CI check failed! Please address the issues above.');
          process.exit(1);
        } else {
          console.log('\n✅ All CI checks passed!');
        }
      }

      console.log(`\n📁 Reports saved to: ${options.output}`);
      
    } catch (error) {
      console.error('❌ Audit failed:', error.message);
      process.exit(1);
    }
  });

program
  .command('compare')
  .description('Compare performance between two audit results')
  .option('-c, --current <path>', 'Path to current audit result')
  .option('-p, --previous <path>', 'Path to previous audit result')
  .action(async (options) => {
    try {
      const current = JSON.parse(fs.readFileSync(options.current, 'utf8'));
      const previous = JSON.parse(fs.readFileSync(options.previous, 'utf8'));

      const server = new LighthouseMCPServer();
      const comparison = await server.comparePerformance(current, previous);

      console.log('📈 Performance Comparison:');
      console.log('==========================');
      
      console.log(`Performance Score: ${comparison.performance.current} (${comparison.performance.change > 0 ? '+' : ''}${comparison.performance.change.toFixed(1)})`);
      
      Object.entries(comparison.metrics).forEach(([metric, data]) => {
        const emoji = data.change < 0 ? '✅' : '⚠️';
        console.log(`${emoji} ${metric.toUpperCase()}: ${data.current}ms (${data.change > 0 ? '+' : ''}${data.change}ms, ${data.percentChange.toFixed(1)}%)`);
      });

    } catch (error) {
      console.error('❌ Comparison failed:', error.message);
      process.exit(1);
    }
  });

program
  .command('history')
  .description('Show performance history and trends')
  .option('-d, --days <days>', 'Number of days to look back', '30')
  .option('-f, --format <format>', 'Output format (table|json|chart)', 'table')
  .action(async (options) => {
    console.log('📊 Performance History:');
    console.log('======================');
    
    const server = new LighthouseMCPServer();
    const history = await server.getPerformanceHistory(parseInt(options.days));
    
    if (history.length === 0) {
      console.log('No audit history found. Run some audits first!');
      return;
    }

    history.forEach((result, index) => {
      const date = new Date(result.timestamp).toLocaleDateString();
      const perfScore = Math.round(result.scores.performance?.score * 100);
      console.log(`${index + 1}. ${date} - Performance: ${perfScore}/100 ${getScoreEmoji(result.scores.performance?.score)}`);
    });
  });

program
  .command('init')
  .description('Initialize Lighthouse MCP in current project')
  .action(() => {
    console.log('🚀 Initializing Lighthouse MCP...');
    
    // Create lighthouse-reports directory
    if (!fs.existsSync('./lighthouse-reports')) {
      fs.mkdirSync('./lighthouse-reports', { recursive: true });
      console.log('✅ Created lighthouse-reports directory');
    }

    // Create .lighthouserc.js if it doesn't exist
    const lighthouseRcPath = './.lighthouserc.js';
    if (!fs.existsSync(lighthouseRcPath)) {
      const template = `module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports'
    }
  }
};`;
      fs.writeFileSync(lighthouseRcPath, template);
      console.log('✅ Created .lighthouserc.js configuration');
    }

    console.log('\n🎉 Lighthouse MCP initialized successfully!');
    console.log('\nNext steps:');
    console.log('1. Install dependencies: npm install lighthouse @lighthouse-mcp/core web-vitals');
    console.log('2. Run your first audit: lighthouse-mcp audit');
    console.log('3. Set up GitHub Actions for continuous monitoring');
  });

function getScoreEmoji(score) {
  if (!score) return '❓';
  if (score >= 0.9) return '🟢';
  if (score >= 0.7) return '🟡';
  return '🔴';
}

// Handle CLI execution
if (require.main === module) {
  program.parse();
}

module.exports = { program };