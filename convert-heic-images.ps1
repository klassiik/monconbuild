# PowerShell script to convert HEIC files to JPEG and fix folder names
# Requires ImageMagick to be installed: winget install ImageMagick.ImageMagick

$imagesPath = "c:\Users\klass\OneDrive\Documents\GitHub\monconbuild\frontend\public\images"

Write-Host "=== HEIC to JPEG Conversion Script ===" -ForegroundColor Cyan
Write-Host ""

# Check if ImageMagick is available
$magickAvailable = $null -ne (Get-Command "magick" -ErrorAction SilentlyContinue)

if (-not $magickAvailable) {
    Write-Host "ImageMagick not found. Installing via winget..." -ForegroundColor Yellow
    winget install ImageMagick.ImageMagick --accept-source-agreements --accept-package-agreements
    Write-Host "Please restart your terminal after installation and run this script again." -ForegroundColor Yellow
    exit
}

# Find all HEIC files
$heicFiles = Get-ChildItem -Path $imagesPath -Recurse -Filter "*.heic"
Write-Host "Found $($heicFiles.Count) HEIC files to convert" -ForegroundColor Green

foreach ($file in $heicFiles) {
    $newName = $file.FullName -replace '\.heic\.heic$', '.jpeg' -replace '\.heic$', '.jpeg'
    
    Write-Host "Converting: $($file.Name) -> $(Split-Path $newName -Leaf)" -ForegroundColor White
    
    try {
        # Convert using ImageMagick
        & magick "$($file.FullName)" -quality 85 "$newName"
        
        if (Test-Path $newName) {
            # Remove original HEIC file after successful conversion
            Remove-Item $file.FullName -Force
            Write-Host "  Success!" -ForegroundColor Green
        } else {
            Write-Host "  Failed to create output file" -ForegroundColor Red
        }
    } catch {
        Write-Host "  Error: $_" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Fixing Folder Names ===" -ForegroundColor Cyan

# Fix "Libaray-Offiices" -> "Library-Offices"
$oldLibraryPath = Join-Path $imagesPath "Libaray-Offiices"
$newLibraryPath = Join-Path $imagesPath "Library-Offices"

if (Test-Path $oldLibraryPath) {
    Rename-Item -Path $oldLibraryPath -NewName "Library-Offices"
    Write-Host "Renamed: Libaray-Offiices -> Library-Offices" -ForegroundColor Green
} elseif (Test-Path $newLibraryPath) {
    Write-Host "Library-Offices folder already exists" -ForegroundColor Yellow
}

# Fix "Living Rooms" -> "LivingRooms" (remove space)
$oldLivingPath = Join-Path $imagesPath "Living Rooms"
$newLivingPath = Join-Path $imagesPath "LivingRooms"

if (Test-Path $oldLivingPath) {
    Rename-Item -Path $oldLivingPath -NewName "LivingRooms"
    Write-Host "Renamed: Living Rooms -> LivingRooms" -ForegroundColor Green
} elseif (Test-Path $newLivingPath) {
    Write-Host "LivingRooms folder already exists" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Conversion Complete ===" -ForegroundColor Cyan
Write-Host "All HEIC files have been converted to JPEG format." -ForegroundColor Green
