# Vercel Deployment Fix - Root Directory Configuration

## Problem
Vercel can't find `index.html` because it's looking in the wrong directory.

Your GitHub structure:
```
monument-construction-website/
└── frontend/
    ├── public/
    │   └── index.html  ← Vercel can't find this
    ├── src/
    ├── package.json
    └── ...
```

Vercel is looking at root, but files are in `frontend/` folder.

---

## Solution: Update Root Directory in Vercel

### Step 1: Go to Your Vercel Project Settings

1. Go to https://vercel.com/dashboard
2. Click on your `monument-construction-website` project
3. Click **"Settings"** (top menu)

### Step 2: Change Root Directory

1. In Settings, find **"Root Directory"** section (under General)
2. Click **"Edit"**
3. Change from: `./` 
4. Change to: `frontend`
5. Click **"Save"**

### Step 3: Redeploy

1. Go to **"Deployments"** tab
2. Click the three dots `...` on the latest failed deployment
3. Click **"Redeploy"**

OR

1. Go to your project overview
2. Click **"Redeploy"** button

---

## Alternative: Update via vercel.json (If above doesn't work)

If you prefer to configure via file:

**Create this file in your GitHub repository ROOT:**

`/vercel.json` (at the root of your repo, NOT inside frontend/)

```json
{
  "version": 2,
  "buildCommand": "cd frontend && yarn build",
  "outputDirectory": "frontend/build",
  "devCommand": "cd frontend && yarn start",
  "installCommand": "cd frontend && yarn install"
}
```

Then commit and push:
```bash
git add vercel.json
git commit -m "Fix: Update Vercel root directory"
git push
```

---

## Expected Result

After the fix, Vercel will:
- ✅ Find `frontend/public/index.html`
- ✅ Run `yarn install` in the `frontend/` directory
- ✅ Build successfully
- ✅ Deploy your site

Build should complete in ~2-3 minutes.

---

## If Still Having Issues

Try Option 3: **Re-import with correct structure**

### Option 3A: Move files to root in GitHub

In your GitHub repo, move all files from `frontend/` to root:

```
Before:
frontend/src/
frontend/public/
frontend/package.json

After:
src/
public/
package.json
```

### Option 3B: Delete and re-upload

1. Download the `/app/frontend/` folder contents (not the folder itself)
2. Delete your GitHub repository
3. Create new repository
4. Upload ONLY the contents (src, public, package.json, etc.)
5. Re-import to Vercel

---

## Quick Check

After deployment succeeds, test these URLs:
- Homepage: https://your-site.vercel.app/
- Services: https://your-site.vercel.app/services
- Contact: https://your-site.vercel.app/contact

All should work! 🎉
