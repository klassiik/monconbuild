// One-off importer: convert raw photos from repo-root images/ into web-served,
// optimized webp (full + medium + thumbnails) under public/images/<Category>/.
// Categorization was done by visual inspection (see MANIFEST below).
// Run:  node scripts/import-images.mjs
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';

// Two source folders: img/ holds the full-resolution originals (emailed by the
// owner, 1-8 MB each) and is preferred; images/ is the older ~600px batch, kept
// only for shots that never arrived at full resolution.
const ORIG = 'C:/Users/klass/OneDrive/Documents/GitHub/monconbuild/img';
const OLD = 'C:/Users/klass/OneDrive/Documents/GitHub/monconbuild/images';
const PUB = 'C:/Users/klass/OneDrive/Documents/GitHub/monconbuild/frontend/public/images';

const SIZES = { full: 1920, medium: 1200, thumbnails: 400 };

// [sourceDir, sourceFilename, categoryFolder, baseName] -- array order = display order.
const MANIFEST = [
  // === Kitchens: white farmhouse + dark-island kitchens (originals), then the
  //     yellow-wall remodel that only exists in the old 600px batch ===
  [ORIG, 'IMG_8943.JPG', 'Kitchens', 'kitchen'],
  [ORIG, 'IMG_8935.JPG', 'Kitchens', 'kitchen'],
  [ORIG, 'IMG_8942.JPG', 'Kitchens', 'kitchen'],
  [ORIG, 'IMG_4756.JPG', 'Kitchens', 'kitchen'],
  [ORIG, 'IMG_4758.JPG', 'Kitchens', 'kitchen'],
  [OLD, '11.jpg', 'Kitchens', 'kitchen'],
  [OLD, '2.jpg', 'Kitchens', 'kitchen'],
  [OLD, '19.jpg', 'Kitchens', 'kitchen'],

  // === Library & Offices (finished rooms) ===
  [ORIG, 'IMG_8954.jpg', 'Library-Offices', 'library'],
  [ORIG, 'IMG_7875.jpg', 'Library-Offices', 'library'],
  [ORIG, 'IMG_8028.jpg', 'Library-Offices', 'library'],
  [ORIG, 'IMG_1143.JPG', 'Library-Offices', 'library'],
  [ORIG, 'IMG_1087.JPG', 'Library-Offices', 'library'],
  [ORIG, 'IMG_0705.jpg', 'Library-Offices', 'library'],
  [ORIG, 'IMG_0380.jpg', 'Library-Offices', 'library'],
  [ORIG, 'IMG_0382.jpg', 'Library-Offices', 'library'],

  // === Library Progress (ORDERED: bare build -> finished room) ===
  [ORIG, 'IMG_0367.jpg', 'Library-Progress', 'library-progress'],
  [ORIG, 'IMG_0483.JPG', 'Library-Progress', 'library-progress'],
  [ORIG, 'IMG_0427.JPG', 'Library-Progress', 'library-progress'],
  [ORIG, 'IMG_7580.jpg', 'Library-Progress', 'library-progress'],
  [ORIG, 'IMG_7582.jpg', 'Library-Progress', 'library-progress'],
  [ORIG, 'IMG_0929.JPG', 'Library-Progress', 'library-progress'],
  [ORIG, 'IMG_8528.jpg', 'Library-Progress', 'library-progress'],
  [ORIG, 'IMG_8028.jpg', 'Library-Progress', 'library-progress-final'],

  // === Framing ===
  [ORIG, 'IMG_4211.jpg', 'Framing', 'framing'],
  [ORIG, 'IMG_4275.jpg', 'Framing', 'framing'],
  [ORIG, 'IMG_4335.jpg', 'Framing', 'framing'],
  [ORIG, 'IMG_3966.jpg', 'Framing', 'framing'],
  [ORIG, 'IMG_9454.JPG', 'Framing', 'framing'],
  [ORIG, 'IMG_9482.JPG', 'Framing', 'framing'],
  [ORIG, 'IMG_9489.JPG', 'Framing', 'framing'],
  [ORIG, 'IMG_9537.JPG', 'Framing', 'framing'],
  [ORIG, 'IMG_7126.jpeg', 'Framing', 'framing'],

  // === Fireplaces ===
  [ORIG, 'IMG_5606.jpg', 'Fireplaces', 'fireplace'],
  [ORIG, 'IMG_5944.JPG', 'Fireplaces', 'fireplace'],
  [ORIG, 'IMG_5942.JPG', 'Fireplaces', 'fireplace'],

  // === Bathrooms ===
  [ORIG, 'IMG_2495.JPG', 'Bathrooms', 'bathroom'],
  [ORIG, 'IMG_2237.jpg', 'Bathrooms', 'bathroom'],
  [ORIG, 'IMG_2498.JPG', 'Bathrooms', 'bathroom'],
  [ORIG, 'IMG_0801.JPG', 'Bathrooms', 'bathroom'],
  [ORIG, 'IMG_0802.JPG', 'Bathrooms', 'bathroom'],
  [ORIG, 'IMG_6853.JPG', 'Bathrooms', 'bathroom'],

  // === Outdoor Living (pavilion, decks, stairs) ===
  [ORIG, 'IMG_6425.jpg', 'Outdoors', 'outdoor'],
  [ORIG, 'IMG_8932.jpg', 'Outdoors', 'outdoor'],
  [ORIG, 'IMG_8938.jpg', 'Outdoors', 'outdoor'],
  [ORIG, 'IMG_0895.jpg', 'Outdoors', 'outdoor'],
  [ORIG, 'IMG_0896.jpg', 'Outdoors', 'outdoor'],
  [ORIG, 'IMG_1283.jpg', 'Outdoors', 'outdoor'],
  [ORIG, 'IMG_1574.jpg', 'Outdoors', 'outdoor'],
  [ORIG, 'IMG_5247.jpg', 'Outdoors', 'outdoor'],

  // === Custom Built-Ins (media walls, bar niche) ===
  [ORIG, 'IMG_5537.jpg', 'FinishCarpentry', 'builtins'],
  [ORIG, 'IMG_5548.jpg', 'FinishCarpentry', 'builtins'],
  [ORIG, 'IMG_8949.jpg', 'FinishCarpentry', 'builtins'],
  [OLD, '14.jpg', 'FinishCarpentry', 'builtins'],

  // === Additions & Sunrooms ===
  [ORIG, 'IMG_9017.JPG', 'Additions', 'addition'],
  [ORIG, 'IMG_9018.JPG', 'Additions', 'addition'],
  [ORIG, 'IMG_8642.JPG', 'Additions', 'addition'],
  [ORIG, 'IMG_8655.JPG', 'Additions', 'addition'],
  [ORIG, 'IMG_8671.JPG', 'Additions', 'addition'],
];

async function main() {
  const counters = {};
  const produced = {};
  let ok = 0,
    fail = 0;

  for (const [dir, src, cat, base] of MANIFEST) {
    const key = `${cat}/${base}`;
    counters[key] = (counters[key] || 0) + 1;
    const rel = `${cat}/${base}-${counters[key]}.webp`;
    try {
      const input = join(dir, src);
      if (!existsSync(input)) throw new Error('missing source');
      // Effective (post-EXIF-rotation) source width, to decide on upscaling.
      const meta = await sharp(input).metadata();
      const srcW = meta.orientation >= 5 ? meta.height : meta.width;
      for (const [size, width] of Object.entries(SIZES)) {
        const outDir =
          size === 'full' ? join(PUB, cat) : join(PUB, size, cat);
        mkdirSync(outDir, { recursive: true });
        const outPath =
          size === 'full'
            ? join(PUB, rel)
            : join(PUB, size, rel);
        mkdirSync(dirname(outPath), { recursive: true });
        // Most sources are only ~600px (downsized in transit). Pre-upscaling
        // up to 2x with Lanczos + sharpening looks visibly better on screen
        // than letting the browser stretch them into the layout.
        const outW = srcW >= width ? width : Math.min(width, srcW * 2);
        const upscaled = outW > srcW;
        let pipeline = sharp(input).rotate().resize({ width: outW });
        if (upscaled) pipeline = pipeline.sharpen({ sigma: 0.9 });
        await pipeline.webp({ quality: 88, effort: 5 }).toFile(outPath);
      }
      (produced[cat] = produced[cat] || []).push(`/images/${rel}`);
      ok++;
    } catch (e) {
      fail++;
      console.log('FAIL', src, '->', cat, '-', e.message.split('\n')[0]);
    }
  }

  console.log(`\nDONE: ${ok} imported, ${fail} failed\n`);
  console.log(JSON.stringify(produced, null, 2));
}

main();
