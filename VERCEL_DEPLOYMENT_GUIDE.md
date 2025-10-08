# Monument Construction - Vercel Deployment Guide

## 🚀 Complete Deployment Instructions

### Prerequisites
- GitHub account (free)
- Vercel account (free) - sign up at https://vercel.com
- Git installed on your computer

---

## Step 1: Prepare Your Code

### Option A: If you have Git installed locally

1. **Initialize Git Repository** (if not already done)
```bash
cd /app/frontend
git init
git add .
git commit -m "Initial commit - Monument Construction website"
```

2. **Create GitHub Repository**
   - Go to https://github.com/new
   - Name: `monument-construction-website`
   - Make it Private or Public (your choice)
   - Don't initialize with README (we already have code)
   - Click "Create repository"

3. **Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/monument-construction-website.git
git branch -M main
git push -u origin main
```

### Option B: Upload Directly to GitHub

1. Go to https://github.com/new
2. Create new repository: `monument-construction-website`
3. Download your `/app/frontend` folder
4. Upload all files to the repository via GitHub web interface

---

## Step 2: Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended - Easiest)

1. **Go to Vercel**
   - Visit https://vercel.com
   - Click "Sign Up" or "Login"
   - Sign up with your GitHub account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Click "Import Git Repository"
   - Authorize Vercel to access your GitHub account
   - Select `monument-construction-website` repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Create React App** (should auto-detect)
   - Root Directory: `./` (leave as default)
   - Build Command: `yarn build` (should auto-fill)
   - Output Directory: `build` (should auto-fill)
   - Install Command: `yarn install` (should auto-fill)

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment
   - ✅ Your site will be live at: `https://monument-construction-website.vercel.app`

---

## Step 3: Add Custom Domain (Optional)

### If you own monumentconstruction.com or similar:

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Settings" → "Domains"
   - Click "Add Domain"
   - Enter: `monumentconstruction.com`

2. **Update DNS Settings** (at your domain registrar)
   Vercel will show you which DNS records to add:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for DNS Propagation** (5 minutes - 48 hours)
   - Vercel will automatically issue SSL certificate
   - Your site will be live at `https://monumentconstruction.com`

---

## Step 4: Verify Deployment

### Test These URLs:
- ✅ Homepage: `https://your-site.vercel.app/`
- ✅ Services: `https://your-site.vercel.app/services`
- ✅ About: `https://your-site.vercel.app/about`
- ✅ Portfolio: `https://your-site.vercel.app/portfolio`
- ✅ Service Areas: `https://your-site.vercel.app/service-areas`
- ✅ Contact: `https://your-site.vercel.app/contact`

### Test Features:
- ✅ Navigation works on all pages
- ✅ Mobile responsive design
- ✅ Contact form accepts input
- ✅ All images load correctly
- ✅ Click-to-call phone numbers work

---

## Configuration Details

### Files Created for Vercel:

**`vercel.json`** - Deployment configuration
- Configures build process
- Sets up URL rewrites for React Router
- Optimizes caching for static assets

### Build Settings:
- **Framework**: Create React App
- **Build Command**: `yarn build`
- **Output Directory**: `build`
- **Install Command**: `yarn install`
- **Node Version**: 18.x (auto-detected)

---

## Automatic Deployments

Once connected to GitHub, Vercel will automatically:
- ✅ Deploy on every push to `main` branch
- ✅ Create preview deployments for pull requests
- ✅ Run builds and show deployment status
- ✅ Generate unique URLs for each deployment

To update your site:
```bash
git add .
git commit -m "Update content"
git push
```
Vercel will automatically rebuild and deploy!

---

## Important Notes

### 1. Contact Form Limitation
The contact form currently saves to localStorage (browser storage only). For production:

**Option A: Use Form Service (Easiest)**
- Sign up for [Formspree](https://formspree.io) or [Basin](https://usebasin.com)
- Get form endpoint URL
- Update Contact.jsx with the endpoint

**Option B: Backend Integration**
- Deploy backend API separately
- Update form to POST to API endpoint
- Set up email notifications via SendGrid/Mailgun

### 2. Environment Variables
If you add backend API or form services:
- Go to Vercel Dashboard → Settings → Environment Variables
- Add `REACT_APP_API_URL` or similar
- Redeploy for changes to take effect

### 3. Analytics (Optional)
Add Google Analytics:
1. Vercel Dashboard → Settings → Analytics
2. Enable Vercel Analytics (built-in, free)
   OR
3. Add Google Analytics tracking code to `public/index.html`

---

## Troubleshooting

### Build Fails
**Error**: Module not found
**Solution**: Ensure all dependencies are in `package.json`
```bash
cd /app/frontend
yarn install
```

**Error**: Build command failed
**Solution**: Check build logs in Vercel dashboard
- Often caused by missing environment variables
- Or incompatible Node version

### Routes Don't Work (404 errors)
**Solution**: Ensure `vercel.json` has proper rewrites
```json
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```

### Images Not Loading
**Solution**: Verify image URLs are absolute paths
- Check all `<img src="...">` tags
- External URLs should work fine
- Local images should be in `/public` folder

---

## Performance Optimization

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS/SSL
- ✅ Image optimization
- ✅ Automatic compression (Gzip/Brotli)
- ✅ Edge caching
- ✅ DDoS protection

Expected Lighthouse Scores:
- **Performance**: 90-100
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

---

## Cost

**Free Tier Includes:**
- Unlimited deployments
- Automatic HTTPS
- 100GB bandwidth/month
- Custom domains
- Preview deployments

This is **more than enough** for a construction company website!

---

## Post-Deployment Checklist

After deployment:

### SEO Setup
- [ ] Submit to Google Search Console
  - Go to https://search.google.com/search-console
  - Add property: `https://your-site.vercel.app`
  - Verify ownership (Vercel makes this easy)
  - Submit sitemap

- [ ] Set up Google My Business
  - Claim/verify Monument Construction listing
  - Add website URL
  - Add photos from portfolio

- [ ] Update Business Listings
  - Add website to Yelp
  - Update Facebook business page
  - Add to local directories

### Marketing
- [ ] Share on social media
- [ ] Add to email signatures
- [ ] Update business cards with website
- [ ] Add to vehicle wraps/signage

### Monitoring
- [ ] Set up Vercel Analytics
- [ ] Monitor contact form submissions
- [ ] Track visitor metrics
- [ ] Check mobile usability

---

## Support & Next Steps

### Need Help?
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: support@vercel.com
- Community: https://github.com/vercel/vercel/discussions

### Future Enhancements
1. Add backend for contact form
2. Integrate Google Reviews
3. Add blog section
4. Set up Google Ads
5. Add more portfolio projects

---

## Quick Reference

**Your GitHub Repo**: `https://github.com/YOUR_USERNAME/monument-construction-website`

**Vercel Dashboard**: `https://vercel.com/dashboard`

**Live Site**: `https://monument-construction-website.vercel.app` (or your custom domain)

**Phone**: (916) 607-1972  
**Email**: monumentconstruction@comcast.net  
**License**: #801602

---

**Monument Construction**  
Professional Construction & Finish Carpentry  
Serving Colfax, Placer County & Nevada County, CA
