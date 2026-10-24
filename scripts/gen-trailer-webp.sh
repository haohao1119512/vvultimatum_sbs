#!/usr/bin/env bash
# Regenerate responsive trailer cover WebPs from public/images/hero-trailer-thumbnail.jpg
# Requires cwebp (brew install webp). Run from the project root.
set -euo pipefail
src="public/images/hero-trailer-thumbnail.jpg"
[ -f "$src" ] || { echo "missing $src"; exit 1; }
for w in 480 768 1280; do
  cwebp -q 78 -resize "$w" 0 "$src" -o "public/images/hero-trailer-$w.webp"
done
ls -la public/images/hero-trailer-*.webp
