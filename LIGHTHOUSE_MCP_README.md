# 🚀 Lighthouse MCP Integration

A comprehensive integration of Google Lighthouse with Model Context Protocol (MCP) for automated web performance monitoring, AI-powered analysis, and intelligent optimization recommendations.

## 🌟 Features

- **Automated Performance Audits**: Run Lighthouse audits programmatically
- **AI-Powered Analysis**: Get intelligent insights and recommendations using GPT-4
- **Real-time Monitoring**: Track Core Web Vitals and performance metrics
- **CI/CD Integration**: Automated performance checks in your deployment pipeline
- **Historical Tracking**: Monitor performance trends over time
- **Interactive Dashboard**: Visual performance monitoring interface
- **Smart Recommendations**: Actionable, code-specific optimization suggestions

## 🎯 What's Included

### 1. Core Components
- **Lighthouse MCP Server** (`lighthouse-mcp-server.js`) - Main server for running audits and AI analysis
- **CLI Tool** (`lighthouse-mcp-cli.js`) - Command-line interface for easy usage
- **Web Vitals Tracker** (`src/utils/webVitals.js`) - Real-time performance monitoring
- **Performance Dashboard** (`src/components/PerformanceMonitor.jsx`) - React component for visualizing data

### 2. Configuration Files
- **Lighthouse CI Config** (`.lighthouserc.js`) - Lighthouse audit configuration
- **GitHub Actions Workflow** (`.github/workflows/lighthouse-mcp.yml`) - Automated CI/CD audits

### 3. Performance Optimizations
- Web Vitals tracking with intelligent insights
- Core Web Vitals monitoring (LCP, FID, CLS)
- Performance budgets and thresholds
- Automated optimization suggestions

## 📊 Metrics Tracked

### Core Web Vitals
- **Largest Contentful Paint (LCP)** - Loading performance
- **First Input Delay (FID)** - Interactivity
- **Cumulative Layout Shift (CLS)** - Visual stability

### Additional Performance Metrics
- **First Contentful Paint (FCP)** - Initial rendering
- **Speed Index** - Visual loading speed
- **Total Blocking Time (TBT)** - Main thread blocking
- **Time to First Byte (TTFB)** - Server response time

### Quality Scores
- **Performance Score** (0-100)
- **Accessibility Score** (0-100)
- **Best Practices Score** (0-100)
- **SEO Score** (0-100)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Navigate to frontend directory
cd frontend

# Install required packages
yarn add web-vitals lighthouse lighthouse-ci

# Install CLI dependencies
npm install -g lighthouse-ci commander
```

### 2. Initialize Lighthouse MCP

```bash
# Run the initialization script
node ../lighthouse-mcp-cli.js init
```

This creates:
- `lighthouse-reports/` directory for storing audit results
- `.lighthouserc.js` configuration file
- Basic performance monitoring setup

### 3. Run Your First Audit

```bash
# Start your development server
yarn start

# In another terminal, run the audit
node ../lighthouse-mcp-cli.js audit --urls "http://localhost:3000"
```

### 4. View Results

The audit will generate:
- Detailed performance scores
- Core Web Vitals metrics
- AI-powered optimization recommendations
- Historical trend data

## 📱 Using the Performance Dashboard

Add the performance monitor to your React app:

```jsx
import PerformanceMonitor from './components/PerformanceMonitor';

function App() {
  return (
    <div>
      {/* Your existing components */}
      
      {/* Add performance dashboard */}
      <PerformanceMonitor />
    </div>
  );
}
```

## 🔧 CLI Commands

### Basic Audit
```bash
node lighthouse-mcp-cli.js audit
```

### Audit Multiple URLs
```bash
node lighthouse-mcp-cli.js audit --urls "http://localhost:3000,http://localhost:3000/about,http://localhost:3000/services"
```

### CI Mode (Strict Thresholds)
```bash
node lighthouse-mcp-cli.js audit --ci
```

### Compare Results
```bash
node lighthouse-mcp-cli.js compare --current report1.json --previous report2.json
```

### View History
```bash
node lighthouse-mcp-cli.js history --days 30
```

## 🤖 AI Analysis Features

The AI analysis provides:

### 1. Smart Issue Detection
- Identifies critical performance bottlenecks
- Prioritizes issues by impact and effort
- Provides context-aware recommendations

### 2. Code-Specific Suggestions
- Tailored recommendations for React/Tailwind projects
- Specific implementation examples
- Estimated performance impact

### 3. Trend Analysis
- Compares performance over time
- Identifies performance regressions
- Suggests preventive measures

## 🔄 CI/CD Integration

### GitHub Actions
The included workflow (`.github/workflows/lighthouse-mcp.yml`) automatically:

1. **Triggers on**: Push to main/develop, Pull Requests, Daily schedule
2. **Builds** your application
3. **Runs** Lighthouse audits on multiple pages
4. **Analyzes** results with AI
5. **Comments** on PRs with performance insights
6. **Stores** historical data for trending

### Setup Instructions

1. **Add Secrets** to your GitHub repository:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

2. **Configure URLs** in the workflow file:
   ```yaml
   URLS="https://your-domain.com,https://your-domain.com/about"
   ```

3. **Customize Thresholds** in `.lighthouserc.js`:
   ```javascript
   assertions: {
     'categories:performance': ['warn', { minScore: 0.9 }],
     'categories:accessibility': ['error', { minScore: 0.9 }]
   }
   ```

## 📈 Performance Thresholds

### Default Thresholds
- **Performance**: 90+ (Excellent), 70-89 (Good), <70 (Needs Work)
- **Accessibility**: 90+ (Required), <90 (Failing)
- **Best Practices**: 90+ (Excellent), 70-89 (Good), <70 (Needs Work)
- **SEO**: 90+ (Excellent), 70-89 (Good), <70 (Needs Work)

### Core Web Vitals Thresholds
- **LCP**: <2.5s (Good), 2.5-4s (Needs Improvement), >4s (Poor)
- **FID**: <100ms (Good), 100-300ms (Needs Improvement), >300ms (Poor)
- **CLS**: <0.1 (Good), 0.1-0.25 (Needs Improvement), >0.25 (Poor)

## 🎛️ Configuration Options

### Lighthouse Configuration (`.lighthouserc.js`)
```javascript
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo']
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }]
      }
    }
  }
};
```

### AI Model Configuration
```javascript
const server = new LighthouseMCPServer({
  aiModel: 'gpt-4',           // AI model to use
  reportPath: './reports',    // Report output directory
  targetUrl: 'http://localhost:3000'
});
```

## 🛠️ Troubleshooting

### Common Issues

1. **"No browser found"**
   ```bash
   # Install Chrome/Chromium
   # macOS
   brew install --cask google-chrome
   
   # Ubuntu/Debian
   sudo apt-get install google-chrome-stable
   ```

2. **"Permission denied"**
   ```bash
   # Make CLI executable
   chmod +x lighthouse-mcp-cli.js
   ```

3. **"AI analysis failed"**
   - Check OPENAI_API_KEY environment variable
   - Verify API key has sufficient credits
   - Check network connectivity

### Performance Issues

1. **Slow audits**: Reduce `numberOfRuns` in `.lighthouserc.js`
2. **High memory usage**: Close unnecessary browser tabs
3. **Network timeouts**: Increase timeout values in configuration

## 📚 Best Practices

### 1. Regular Monitoring
- Run audits on every deployment
- Set up daily scheduled audits
- Monitor performance trends weekly

### 2. Optimization Strategy
- Fix critical issues first (Performance, Accessibility)
- Implement quick wins from AI recommendations
- Plan long-term optimizations based on trends

### 3. Team Integration
- Include performance scores in code reviews
- Set performance budgets for features
- Train team on Web Vitals importance

## 🔗 Resources

- [Google Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Web Vitals Guide](https://web.dev/vitals/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Core Web Vitals Thresholds](https://web.dev/defining-core-web-vitals-thresholds/)

## 📄 License

This Lighthouse MCP integration is part of your project and follows the same licensing terms.

## 🤝 Contributing

1. **Report Issues**: Use GitHub issues for bugs and feature requests
2. **Suggest Improvements**: AI recommendations can always be enhanced
3. **Share Optimizations**: Contribute successful optimization strategies

---

**Powered by Google Lighthouse + AI for intelligent web performance optimization** 🚀