// Portfolio data — categories, featured slideshow, and the library build sequence.
// Image files are produced by scripts/import-images.mjs into /public/images/<Cat>/.
// Descriptions are intentionally short (one line) to keep the focus on the photos.

const seq = (dir, base, n, ext = 'webp') =>
  Array.from({ length: n }, (_, i) => `/images/${dir}/${base}-${i + 1}.${ext}`);

export const portfolioCategories = [
  {
    id: 'kitchens',
    name: 'Kitchens',
    blurb: 'Custom cabinetry, quartz counters, and full remodels.',
    images: seq('Kitchens', 'kitchen', 8),
  },
  {
    id: 'library-offices',
    name: 'Library & Offices',
    blurb: 'Floor-to-ceiling built-ins and coffered ceilings.',
    images: seq('Library-Offices', 'library', 8),
  },
  {
    id: 'framing',
    name: 'Framing',
    blurb: 'Foundations to rooflines, built straight and strong.',
    images: seq('Framing', 'framing', 9),
  },
  {
    id: 'fireplaces',
    name: 'Fireplaces',
    blurb: 'Stone surrounds and reclaimed-timber mantels.',
    images: seq('Fireplaces', 'fireplace', 3),
  },
  {
    id: 'bathrooms',
    name: 'Bathrooms',
    blurb: 'Tile showers, custom vanities, spa-like retreats.',
    images: seq('Bathrooms', 'bathroom', 6),
  },
  {
    id: 'outdoors',
    name: 'Outdoor Living',
    blurb: 'Decks, staircases, and timber-frame pavilions.',
    images: seq('Outdoors', 'outdoor', 8),
  },
  {
    id: 'built-ins',
    name: 'Custom Built-Ins',
    blurb: 'Media walls, bars, and fine finish carpentry.',
    images: seq('FinishCarpentry', 'builtins', 4),
  },
  {
    id: 'additions',
    name: 'Additions & Sunrooms',
    blurb: 'Light-filled additions that blend right in.',
    images: seq('Additions', 'addition', 5),
  },
];

// Ordered bare-build -> finished sequence for the "progress" slideshow.
export const libraryProgress = [
  { src: '/images/Library-Progress/library-progress-1.webp', caption: 'Framing the built-ins' },
  { src: '/images/Library-Progress/library-progress-2.webp', caption: 'Curved shelving takes shape' },
  { src: '/images/Library-Progress/library-progress-3.webp', caption: 'Cornice and corbel details' },
  { src: '/images/Library-Progress/library-progress-4.webp', caption: 'Lighting goes in' },
  { src: '/images/Library-Progress/library-progress-5.webp', caption: 'Ready for stain and finish' },
  { src: '/images/Library-Progress/library-progress-6.webp', caption: 'The room takes shape' },
  { src: '/images/Library-Progress/library-progress-7.webp', caption: 'Hand-fitted joinery' },
  { src: '/images/Library-Progress/library-progress-final-1.webp', caption: 'The finished library' },
];

// Featured hero shots for the auto-slideshow (best across categories).
export const featuredSlides = [
  { src: '/images/Library-Offices/library-1.webp', title: 'Custom Library & Built-Ins', caption: 'Placer County, CA' },
  { src: '/images/Kitchens/kitchen-1.webp', title: 'Modern Kitchen Remodel', caption: 'Placer County, CA' },
  { src: '/images/Fireplaces/fireplace-1.webp', title: 'Stone Fireplace & Mantel', caption: 'Nevada County, CA' },
  { src: '/images/Outdoors/outdoor-1.webp', title: 'Timber-Frame Pavilion', caption: 'Nevada County, CA' },
  { src: '/images/Additions/addition-1.webp', title: 'Sunroom Addition', caption: 'Placer County, CA' },
  { src: '/images/Bathrooms/bathroom-1.webp', title: 'Luxury Bathroom', caption: 'Placer County, CA' },
];
