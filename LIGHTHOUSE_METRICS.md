# Lighthouse Metrics Integration

Automated performance testing using [lighthouse-metrics.com](https://lighthouse-metrics.com) API.

## Quick Start

### Run Lighthouse Tests

```bash
# Test homepage only
npm run lighthouse

# Test all pages
npm run lighthouse:all

# Test specific URL
npm run lighthouse:url https://www.monconbuild.com/services
```

### Using the Script Directly

```bash
# Test homepage
node scripts/lighthouse-test.js

# Test all pages
node scripts/lighthouse-test.js --all

# Test specific URL
node scripts/lighthouse-test.js https://www.example.com
```

### Bash Script (Linux/Mac)

```bash
# Make executable
chmod +x scripts/lighthouse-check.sh

# Test homepage
./scripts/lighthouse-check.sh

# Test all pages
./scripts/lighthouse-check.sh --all

# Test specific URL
./scripts/lighthouse-check.sh https://www.example.com
```

## CI/CD Integration

### GitHub Actions Workflow

The workflow automatically runs Lighthouse tests:

- **On push to main** - Tests all pages after deployment
- **On pull requests** - Tests affected pages
- **Daily at 2 AM UTC** - Scheduled performance monitoring
- **Manual trigger** - Run tests anytime via workflow dispatch

#### Manual Trigger

1. Go to **Actions** tab in GitHub
2. Select **Lighthouse CI** workflow
3. Click **Run workflow**
4. Optionally specify a custom URL

### Pages Tested

The CI automatically tests these pages:
- Home (`/`)
- Services (`/services`)
- About (`/about`)
- Portfolio (`/portfolio`)
- Contact (`/contact`)
- Finish Carpentry (`/services/finish-carpentry`)

## API Integration

### Direct API Call

```bash
curl -X POST https://lighthouse-metrics.com/v1/lighthouse/checks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.monconbuild.com",
    "regions": ["us-west1"]
  }'
```

### Available Regions

- `us-west1` - US West Coast (default)
- `us-east1` - US East Coast
- `europe-west1` - Europe
- `asia-east1` - Asia

### Response Format

```json
{
  "id": "abc123",
  "url": "https://www.monconbuild.com",
  "status": "pending"
}
```

View results at: `https://lighthouse-metrics.com/checks/{id}`

## Configuration

### Add More Pages

Edit `scripts/lighthouse-test.js`:

```javascript
const PAGES = [
  { url: 'https://www.monconbuild.com/', name: 'Home' },
  { url: 'https://www.monconbuild.com/new-page', name: 'New Page' }
  // Add more pages here
];
```

### Change Test Regions

Edit the `DEFAULT_REGIONS` in `scripts/lighthouse-test.js`:

```javascript
const DEFAULT_REGIONS = ['us-west1', 'europe-west1'];
```

## Performance Monitoring

### Set Performance Budgets

Create thresholds for your Lighthouse scores:

- **Performance:** ≥ 90
- **Accessibility:** ≥ 95
- **Best Practices:** ≥ 95
- **SEO:** ≥ 100

Monitor these via lighthouse-metrics.com dashboard.

### Alerts

Set up alerts on lighthouse-metrics.com to get notified when:
- Performance score drops below threshold
- Core Web Vitals fail
- New issues are detected

## Troubleshooting

### Rate Limiting

The scripts include 2-second delays between requests to avoid rate limiting. If you hit limits:

1. Reduce number of pages tested
2. Increase delay in script
3. Use fewer regions

### API Errors

If you get API errors:

1. Check your internet connection
2. Verify URL is accessible
3. Try again later (service may be down)

## Resources

- [Lighthouse Metrics Documentation](https://lighthouse-metrics.com/docs)
- [Lighthouse Scoring Guide](https://web.dev/performance-scoring/)
- [Core Web Vitals](https://web.dev/vitals/)

## Example Output

```
🚀 Lighthouse Metrics API - Performance Testing

Testing 6 pages...

🔍 Testing Home...
============================================================
📊 Lighthouse Test: Home
============================================================
URL: https://www.monconbuild.com/
✅ Test initiated successfully
Test ID: abc123xyz
View results: https://lighthouse-metrics.com/checks/abc123xyz

✨ Testing complete!
📈 View all reports at: https://lighthouse-metrics.com
```
