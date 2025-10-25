# Lighthouse Metrics API - Setup Notes

## Status

The Lighthouse Metrics API integration scripts are created and ready to use. However, the public API endpoint returns a 405 (Method Not Allowed) response.

## Possible Reasons

1. **API Key Required** - The service may require authentication
2. **Different Endpoint** - The actual API endpoint might be different from documentation
3. **Service Restriction** - Free tier might not support programmatic access

## Next Steps

### Option 1: Get API Access

1. Visit [lighthouse-metrics.com](https://lighthouse-metrics.com)
2. Sign up for an account
3. Look for API key or authentication documentation
4. Update the script with authentication headers:

```javascript
const options = {
  hostname: LIGHTHOUSE_API,
  port: 443,
  path: LIGHTHOUSE_PATH,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY', // Add this
    'Content-Length': Buffer.byteLength(payload)
  }
};
```

### Option 2: Use PageSpeed Insights API (Free Alternative)

Google's PageSpeed Insights API is free and runs Lighthouse:

```bash
# Install
npm install --save-dev psi

# Run test
npx psi https://www.monconbuild.com --strategy=mobile
```

### Option 3: Use GitHub Action with LHCI

Already have `@lhci/cli` - can use free Lighthouse CI:

```bash
npm install --save-dev @lhci/cli
```

Then configure `.lighthouserc.js`

## Files Created

- ✅ `.github/workflows/lighthouse-ci.yml` - GitHub Actions workflow
- ✅ `scripts/lighthouse-test.js` - Node.js script for API calls
- ✅ `scripts/lighthouse-check.sh` - Bash script for quick tests
- ✅ `LIGHTHOUSE_METRICS.md` - Full documentation
- ✅ `frontend/package.json` - Updated with npm scripts

## Manual Testing

For now, you can:

1. **Use lighthouse-metrics.com UI** - Paste URLs manually
2. **Run local Lighthouse** - `npx lighthouse https://www.monconbuild.com`
3. **Use PageSpeed Insights** - https://pagespeed.web.dev/

The scripts are ready once you get API access credentials.
