# Static Site Generation (SSG) Setup for Monument Construction

## Overview
This React application is configured with **react-snap** to pre-render all pages to static HTML for optimal SEO and performance.

## How It Works

### 1. **React-Snap Configuration**
The app uses `react-snap` to crawl and pre-render all routes defined in the app.

**Configuration in `package.json`:**
```json
"reactSnap": {
  "include": [
    "/",
    "/services",
    "/about",
    "/portfolio",
    "/service-areas",
    "/contact"
  ],
  "minifyHtml": {
    "collapseWhitespace": true,
    "removeComments": true
  },
  "puppeteerArgs": [
    "--no-sandbox",
    "--disable-setuid-sandbox"
  ]
}
```

### 2. **Hydration Setup**
The `src/index.js` file is configured to use React's `hydrateRoot()` for pre-rendered content:

```javascript
// Uses hydrate for pre-rendered HTML, render for development
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, <App />);
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
```

## Building for Production

### Development Build (Regular React)
```bash
yarn build
```

### Production Build with Static HTML (SSG)
```bash
yarn build:static
```

This will:
1. Create an optimized production build
2. Pre-render all 6 pages to static HTML
3. Generate individual HTML files for each route
4. Keep React hydration for interactivity

## Output Structure
After running `yarn build:static`, the `build/` folder will contain:

```
build/
├── index.html          # Pre-rendered homepage
├── services/
│   └── index.html      # Pre-rendered services page
├── about/
│   └── index.html      # Pre-rendered about page
├── portfolio/
│   └── index.html      # Pre-rendered portfolio page
├── service-areas/
│   └── index.html      # Pre-rendered service areas page
├── contact/
│   └── index.html      # Pre-rendered contact page
└── static/
    ├── css/            # Compiled CSS
    └── js/             # Compiled JavaScript
```

## SEO Benefits

✅ **Search Engine Crawlability**
- Each page has fully rendered HTML
- No JavaScript execution required for initial content
- All meta tags, headings, and content immediately visible

✅ **Performance**
- Faster First Contentful Paint (FCP)
- Better Time to Interactive (TTI)
- Reduced server load

✅ **Social Media Sharing**
- Open Graph tags work immediately
- Preview images load correctly
- Proper link previews on Facebook, Twitter, LinkedIn

## SEO Features Implemented

### 1. **Comprehensive Meta Tags** (`public/index.html`)
```html
<title>Monument Construction | Licensed General Contractor Colfax CA</title>
<meta name="description" content="Monument Construction provides expert finish carpentry..."/>
<meta name="keywords" content="general contractor Colfax CA, finish carpenter Placer County..."/>
```

### 2. **Schema.org Structured Data**
Local business schema markup for:
- Business name and description
- Contact information
- Service areas
- Contractor license credentials

### 3. **Semantic HTML**
- Proper heading hierarchy (H1 → H2 → H3)
- Descriptive alt text on all images
- Clean, semantic HTML5 structure

### 4. **Local SEO Optimization**
- Location-specific keywords in content
- Service area pages for each region
- Address and contact information prominently displayed

## Deployment

### Option 1: Static Hosting (Recommended for SEO)
Deploy the `build/` folder to:
- **Netlify** - Drag and drop deployment
- **Vercel** - Connect GitHub repo
- **AWS S3 + CloudFront** - Scalable hosting
- **GitHub Pages** - Free hosting

### Option 2: Current Emergent Setup
The app works as-is in development mode. For production deployment on Emergent:
1. Build the static version locally: `yarn build:static`
2. The generated HTML files can be deployed to any static host
3. Modern search engines can crawl the React version, but static HTML is optimal

## Testing the Static Build Locally

```bash
# Build the static version
yarn build:static

# Serve locally to test
npx serve -s build

# Visit http://localhost:3000
```

## Important Notes

1. **Contact Form**: Currently stores data in localStorage (frontend-only). For production, integrate with a backend API or service like Formspree, Basin, or Netlify Forms.

2. **Images**: All project images are hosted on external URLs. Consider moving to a CDN for better performance.

3. **Browser Compatibility**: Supports all modern browsers (Chrome, Firefox, Safari, Edge).

## Troubleshooting

### React-snap fails to build
If you encounter Chrome/Puppeteer issues:
```bash
# Install required dependencies (Linux)
sudo apt-get install -y chromium-browser

# Or skip pre-rendering for now
yarn build
```

### Hydration Warnings
If you see hydration mismatches:
- Ensure server/client rendering is identical
- Check for random IDs or timestamps in components
- Verify localStorage is accessed after mount

## Performance Metrics

Expected Lighthouse scores:
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

**Monument Construction**  
Licensed Contractor #801602  
Serving Colfax, Placer County & Nevada County, CA  
📞 (916) 607-1972
