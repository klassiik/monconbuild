# Image Optimization PowerShell Script
# Compresses large images to optimized WebP format

Write-Host "`nImage Optimization Script" -ForegroundColor Cyan
Write-Host "========================`n" -ForegroundColor Cyan

$publicDir = "frontend\public"

# Check if images exist
$images = @(
    @{ Name = "3.png"; Target = "3-optimized.png" }
    @{ Name = "4.png"; Target = "4-optimized.png" }
    @{ Name = "hero.webp"; Target = "hero-optimized.webp" }
)

Write-Host "Found large images:" -ForegroundColor Yellow
foreach ($img in $images) {
    $path = Join-Path $publicDir $img.Name
    if (Test-Path $path) {
        $size = [math]::Round((Get-Item $path).Length / 1MB, 2)
        Write-Host "  ✓ $($img.Name) - ${size} MB" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $($img.Name) - Not found" -ForegroundColor Red
    }
}

Write-Host "`n" -ForegroundColor Cyan
Write-Host "RECOMMENDED SOLUTIONS:" -ForegroundColor Yellow
Write-Host "=====================" -ForegroundColor Yellow
Write-Host ""
Write-Host "Option 1: Use online tool Squoosh (Recommended)" -ForegroundColor Cyan
Write-Host "  1. Visit: https://squoosh.app/" -ForegroundColor White
Write-Host "  2. Drag and drop 3.png, 4.png, and hero.webp" -ForegroundColor White
Write-Host "  3. Select WebP format with 85% quality" -ForegroundColor White
Write-Host "  4. Resize to max 1920px width" -ForegroundColor White
Write-Host "  5. Download and replace in $publicDir" -ForegroundColor White
Write-Host ""
Write-Host "Option 2: Use sharp via Node.js" -ForegroundColor Cyan
Write-Host "  Run: npm install sharp" -ForegroundColor White
Write-Host "  Then: node optimize-images-sharp.js" -ForegroundColor White
Write-Host ""
Write-Host "Option 3: Use ImageMagick (if installed)" -ForegroundColor Cyan
Write-Host "  magick $publicDir\3.png -resize 1920x -quality 85 $publicDir\3.webp" -ForegroundColor White
Write-Host "  magick $publicDir\4.png -resize 1920x -quality 85 $publicDir\4.webp" -ForegroundColor White
Write-Host "  magick $publicDir\hero.webp -resize 1920x -quality 85 $publicDir\hero-optimized.webp" -ForegroundColor White
Write-Host ""
Write-Host "TARGET SIZES:" -ForegroundColor Yellow
Write-Host "  3.png: 12.12 MB → <500 KB (95%+ reduction)" -ForegroundColor White
Write-Host "  4.png: 6.06 MB → <500 KB (92%+ reduction)" -ForegroundColor White
Write-Host "  hero.webp: 1.82 MB → <300 KB (84%+ reduction)" -ForegroundColor White
Write-Host ""
