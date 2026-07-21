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
const BATCH2 = 'C:/Users/klass/OneDrive/Documents/GitHub/monconbuild/img/batch2';
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
  // Cover: the client's finished home at sunset (recovered from the old site's
  // asset host; 600px is the only surviving copy)
  [ORIG, 'home-sunset.png', 'Framing', 'framing-sunset'],
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

  // === About page: William Rogers on a framing job ===
  [ORIG, 'IMG_3901.jpg', 'About', 'william-rogers'],

  // === Additions & Sunrooms ===
  [ORIG, 'IMG_9017.JPG', 'Additions', 'addition'],
  [ORIG, 'IMG_9018.JPG', 'Additions', 'addition'],
  [ORIG, 'IMG_8642.JPG', 'Additions', 'addition'],
  [ORIG, 'IMG_8655.JPG', 'Additions', 'addition'],
  [ORIG, 'IMG_8671.JPG', 'Additions', 'addition'],

  // ============ BATCH 2 (img/batch2, pre-sorted by the client) ============
  // Bathrooms: appended after batch-1 entries (numbering continues at 7)
  [BATCH2, 'bathroom/IMG_9636.jpg', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_9639.jpg', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_0462.JPG', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_0466.JPG', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_1093.JPEG', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_0800.JPG', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_2235.jpg', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_2236.jpg', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_2080.jpg', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_2082.jpg', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_4441.JPG', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_7842.JPG', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_7633.JPG', 'Bathrooms', 'bathroom'],
  [BATCH2, 'bathroom/IMG_1724.jpg', 'Bathrooms', 'bathroom'],

  // Outdoor Living: deck append (numbering continues at 9)
  [BATCH2, 'deck/BED4C1BC-1B5C-4841-8F24-CD1DCB0E158D.JPG', 'Outdoors', 'outdoor'],

  // Pergolas & Patio Covers (new category; source folder had exact dupes of
  // 67034D7A and of the 5C7FBD66/E42A9C89 action shot -- one copy each)
  [BATCH2, 'pergola/67034D7A-8B2C-4BC7-87F2-EC54D8B6DD8E.JPG', 'Pergolas', 'pergola'],
  [BATCH2, 'pergola/DD7F297D-FC2E-47D0-9381-29523B1B2919.JPG', 'Pergolas', 'pergola'],
  [BATCH2, 'pergola/IMG_2402.jpg', 'Pergolas', 'pergola'],
  [BATCH2, 'pergola/IMG_2397.JPG', 'Pergolas', 'pergola'],
  [BATCH2, 'pergola/IMG_2409.JPG', 'Pergolas', 'pergola'],
  [BATCH2, 'pergola/B744A760-7B66-41DD-8B24-A72230CCE343.JPG', 'Pergolas', 'pergola'],
  [BATCH2, 'pergola/8023B7AC-932F-497F-94E4-8B18331803B8.JPG', 'Pergolas', 'pergola'],
  [BATCH2, 'pergola/BD097186-5308-4E04-85D7-FA7F84703F79.JPG', 'Pergolas', 'pergola'],
  [BATCH2, 'pergola/60B9A7D9-49A1-4D8B-8B09-7CC4CDB58ABB.JPG', 'Pergolas', 'pergola'],
  [BATCH2, 'pergola/IMG_0089.JPG', 'Pergolas', 'pergola'],
  [BATCH2, 'pergola/5C7FBD66-1924-457C-B9E8-FD707F0912F3.JPG', 'Pergolas', 'pergola'],

  // Entertainment Centers (shown under Custom Built-Ins on the site)
  [BATCH2, 'entertainment center/C9DE5B14-BA8D-4A8F-AF2B-E78D19AE31F8.JPG', 'EntertainmentCenters', 'entertainment-center'],
  [BATCH2, 'entertainment center/E092B284-175F-43C6-B96E-E5CF02085670.JPG', 'EntertainmentCenters', 'entertainment-center'],
  [BATCH2, 'entertainment center/EA4CD22B-8BA9-4BCC-8B99-4CF4F135E026.JPG', 'EntertainmentCenters', 'entertainment-center'],
  [BATCH2, 'entertainment center/7FE6E5FB-C00E-4DAF-ACF7-64E92DE1CE0C.JPG', 'EntertainmentCenters', 'entertainment-center'],

  // Laundry Rooms (new category)
  [BATCH2, 'laundry/IMG_4365.JPG', 'Laundry', 'laundry'],
  [BATCH2, 'laundry/IMG_4368.JPG', 'Laundry', 'laundry'],
  [BATCH2, 'laundry/IMG_4369.JPG', 'Laundry', 'laundry'],
];

async function main() {
  const counters = {};
  const produced = {};
  let ok = 0,
    fail = 0,
    skipped = 0;

  for (const [dir, src, cat, base] of MANIFEST) {
    const key = `${cat}/${base}`;
    counters[key] = (counters[key] || 0) + 1;
    const rel = `${cat}/${base}-${counters[key]}.webp`;
    const input = join(dir, src);
    // Raw source folders may be offline (they are gitignored and the optimized
    // outputs are committed). Skip quietly -- the counter increment above still
    // reserves this entry's number so later entries keep stable filenames.
    if (!existsSync(input)) {
      skipped++;
      continue;
    }
    try {
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

  console.log(`\nDONE: ${ok} imported, ${fail} failed, ${skipped} skipped (source offline)\n`);
  console.log(JSON.stringify(produced, null, 2));
}

main();
