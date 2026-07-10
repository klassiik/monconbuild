// Generates public/sitemap.xml at build time with per-URL <lastmod> derived from
// the last git commit touching each route's source file(s), falling back to the
// file's mtime for uncommitted work. Run from the frontend/ directory (the build
// script does this automatically); Vite then copies public/ into dist/.
//
// City routes are derived from src/data/cities.js, so adding a city there adds
// its sitemap entry automatically. changefreq/priority are intentionally omitted
// (ignored by Google).

import { execSync } from 'node:child_process';
import { statSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CITIES } from '../src/data/cities.js';

const FRONTEND_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.monconbuild.com';

// Shared chrome affects every page's rendered HTML, but only meaningful content
// changes should bump lastmod — so each route lists just its own content sources.
const ROUTES = [
  { path: '/', sources: ['src/pages/Home.jsx'] },
  { path: '/services', sources: ['src/pages/Services.jsx'] },
  { path: '/about', sources: ['src/pages/About.jsx'] },
  { path: '/portfolio', sources: ['src/pages/Portfolio.jsx'] },
  { path: '/service-areas', sources: ['src/pages/ServiceAreas.jsx', 'src/data/cities.js'] },
  { path: '/contact', sources: ['src/pages/Contact.jsx'] },
  { path: '/services/finish-carpentry', sources: ['src/pages/services/FinishCarpentry.jsx'] },
  { path: '/services/general-construction', sources: ['src/pages/services/GeneralConstruction.jsx'] },
  { path: '/services/residential-projects', sources: ['src/pages/services/ResidentialProjects.jsx'] },
  { path: '/services/home-additions', sources: ['src/pages/services/HomeAdditions.jsx'] },
  { path: '/services/custom-woodwork', sources: ['src/pages/services/CustomWoodwork.jsx'] },
  { path: '/services/complete-remodeling', sources: ['src/pages/services/CompleteRemodeling.jsx'] },
  ...CITIES.map((c) => ({
    path: `/service-areas/${c.slug}`,
    sources: ['src/pages/CityLanding.jsx', 'src/data/cities.js'],
  })),
];

const toDateString = (d) => d.toISOString().slice(0, 10);

const lastmodForFile = (file) => {
  try {
    const isDirty = execSync(`git status --porcelain -- "${file}"`, {
      cwd: FRONTEND_ROOT,
      encoding: 'utf8',
    }).trim().length > 0;
    if (!isDirty) {
      const gitDate = execSync(`git log -1 --format=%cs -- "${file}"`, {
        cwd: FRONTEND_ROOT,
        encoding: 'utf8',
      }).trim();
      if (gitDate) return gitDate;
    }
  } catch {
    // not a git checkout (e.g. some CI tarballs) — fall through to mtime
  }
  try {
    return toDateString(statSync(resolve(FRONTEND_ROOT, file)).mtime);
  } catch {
    return toDateString(new Date());
  }
};

// Cache per-file dates; several routes share sources.
const fileDates = new Map();
const dateFor = (file) => {
  if (!fileDates.has(file)) fileDates.set(file, lastmodForFile(file));
  return fileDates.get(file);
};

const entries = ROUTES.map(({ path, sources }) => {
  const lastmod = sources.map(dateFor).sort().at(-1);
  return `  <url>\n    <loc>${SITE}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

const out = resolve(FRONTEND_ROOT, 'public/sitemap.xml');
writeFileSync(out, xml);
console.log(`sitemap: wrote ${ROUTES.length} URLs to ${out}`);
