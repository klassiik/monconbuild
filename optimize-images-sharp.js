// Image Optimization using Sharp
// Install: npm install sharp
// Run: node optimize-images-sharp.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'frontend', 'public');

const optimizationTasks = [
  {
    input: '3.png',
    output: '3.webp',
    maxWidth: 1920,
    quality: 85
  },
  {
    input: '4.png',
    output: '4.webp',
    maxWidth: 1920,
    quality: 85
  },
  {
    input: 'hero.webp',
    output: 'hero-optimized.webp',
    maxWidth: 1920,
    quality: 85
  }
];

async function optimizeImages() {
  console.log('\nOptimizing Images...\n');
  
  for (const task of optimizationTasks) {
    const inputPath = path.join(publicDir, task.input);
    const outputPath = path.join(publicDir, task.output);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`✗ ${task.input} not found`);
      continue;
    }
    
    try {
      const originalSize = fs.statSync(inputPath).size;
      console.log(`Processing: ${task.input} (${(originalSize / 1024 / 1024).toFixed(2)} MB)`);
      
      await sharp(inputPath)
        .webp({ 
          quality: task.quality, 
          effort: 6 
        })
        .resize({ 
          width: task.maxWidth, 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .toFile(outputPath);
      
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      const newSizeMB = (optimizedSize / 1024 / 1024).toFixed(2);
      
      console.log(`✓ Created ${task.output} - ${newSizeMB} MB (saved ${savings}%)\n`);
    } catch (error) {
      console.error(`✗ Error processing ${task.input}: ${error.message}\n`);
    }
  }
  
  console.log('Optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Review the optimized images');
  console.log('2. Rename the optimized files to replace originals if satisfied');
  console.log('3. Update code references if needed');
}

optimizeImages().catch(console.error);
