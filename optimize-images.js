const fs = require('fs');
const path = require('path');

// Image optimization script using Node.js
// This will create optimized versions of large images

const publicDir = path.join(__dirname, 'frontend', 'public');

const optimizationTasks = [
  {
    input: '3.png',
    output: '3.webp',
    description: 'Converting 3.png (12.7MB) to optimized WebP'
  },
  {
    input: '4.png',
    output: '4.webp',
    description: 'Converting 4.png (6.35MB) to optimized WebP'
  },
  {
    input: 'hero.webp',
    output: 'hero-optimized.webp',
    description: 'Re-optimizing hero.webp (1.9MB)'
  }
];

console.log('Image Optimization Script');
console.log('========================\n');

console.log('IMPORTANT: To optimize these images, you need to install sharp:\n');
console.log('  npm install sharp\n');
console.log('Then run this script with:\n');
console.log('  node optimize-images.js\n');
console.log('\nAlternatively, you can:');
console.log('1. Use an online tool like TinyPNG (https://tinypng.com/)');
console.log('2. Use Squoosh (https://squoosh.app/)');
console.log('3. Use ImageMagick or other command-line tools\n');

console.log('Images to optimize:');
optimizationTasks.forEach(task => {
  const inputPath = path.join(publicDir, task.input);
  if (fs.existsSync(inputPath)) {
    const stats = fs.statSync(inputPath);
    const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`  ✓ ${task.input} (${sizeMB} MB) -> ${task.output}`);
  } else {
    console.log(`  ✗ ${task.input} (not found)`);
  }
});

console.log('\n--- Sharp-based optimization code ---\n');
console.log(`
const sharp = require('sharp');

async function optimizeImages() {
  const tasks = ${JSON.stringify(optimizationTasks, null, 2)};
  
  for (const task of tasks) {
    try {
      const inputPath = path.join('${publicDir.replace(/\\/g, '\\\\')}', task.input);
      const outputPath = path.join('${publicDir.replace(/\\/g, '\\\\')}', task.output);
      
      console.log(\`Optimizing: \${task.description}\`);
      
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .resize({ width: 1920, withoutEnlargement: true })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      
      console.log(\`  ✓ Saved \${savings}% (\${(optimizedSize / 1024 / 1024).toFixed(2)} MB)\`);
    } catch (error) {
      console.error(\`  ✗ Error: \${error.message}\`);
    }
  }
}

optimizeImages();
`);

// Try to load sharp if available
try {
  const sharp = require('sharp');
  console.log('\n✓ Sharp is installed! Running optimization...\n');
  
  (async () => {
    for (const task of optimizationTasks) {
      try {
        const inputPath = path.join(publicDir, task.input);
        const outputPath = path.join(publicDir, task.output);
        
        if (!fs.existsSync(inputPath)) {
          console.log(`  ✗ ${task.input} not found`);
          continue;
        }
        
        console.log(`Optimizing: ${task.description}`);
        
        await sharp(inputPath)
          .webp({ quality: 85, effort: 6 })
          .resize({ width: 1920, withoutEnlargement: true })
          .toFile(outputPath);
        
        const originalSize = fs.statSync(inputPath).size;
        const optimizedSize = fs.statSync(outputPath).size;
        const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
        
        console.log(`  ✓ Saved ${savings}% (${(optimizedSize / 1024 / 1024).toFixed(2)} MB)\n`);
      } catch (error) {
        console.error(`  ✗ Error: ${error.message}\n`);
      }
    }
  })();
} catch (e) {
  // Sharp not installed, instructions already shown above
}
