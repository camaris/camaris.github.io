# convert-images.ps1
# Usage: Open PowerShell, cd to this folder and run: .\convert-images.ps1
# Requirements (recommended): ImageMagick (magick) OR Google cwebp (for .webp output).
# This script will generate WebP variants at multiple sizes for the images present in this folder.
# It creates files like: about_me-400.webp, about_me-800.webp, about_me-1200.webp

$images = @(
    'about_me.png',
    'sand.png',
    'logo1.png',
    '1.png'
)

# sizes (width in px) to generate for each image
$sizes = @(400, 800, 1200)

# Check for ImageMagick
$hasMagick = (Get-Command magick -ErrorAction SilentlyContinue) -ne $null
$hasCwebp = (Get-Command cwebp -ErrorAction SilentlyContinue) -ne $null

if (-not $hasMagick -and -not $hasCwebp) {
    Write-Host "Neither 'magick' (ImageMagick) nor 'cwebp' is available on PATH."
    Write-Host "Install ImageMagick (https://imagemagick.org) or libwebp (https://developers.google.com/speed/webp/download) and re-run this script." -ForegroundColor Yellow
    exit 1
}

foreach ($img in $images) {
    if (-not (Test-Path $img)) {
        Write-Host "Skipping $img - file not found." -ForegroundColor DarkYellow
        continue
    }

    $base = [System.IO.Path]::GetFileNameWithoutExtension($img)

    if ($hasMagick) {
        foreach ($w in $sizes) {
            $out = "${base}-$w.webp"
            Write-Host "Generating $out via ImageMagick (width $w)"
            # Resize with filter, strip metadata, and set quality
            magick convert "$img" -strip -resize "${w}x" -quality 80 "$out"
        }
        # Also create a full-size webp at quality 85
        $outFull = "${base}-full.webp"
        Write-Host "Generating $outFull (full width)"
        magick convert "$img" -strip -quality 85 "$outFull"
    }
    else {
        # fallback to cwebp - only full size or best effort
        $out = "${base}.webp"
        Write-Host "Generating $out via cwebp"
        cwebp -q 80 "$img" -o "$out"
    }
}

Write-Host "Done. Add generated .webp files to your site (they were created next to the originals)." -ForegroundColor Green
