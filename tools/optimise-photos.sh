#!/usr/bin/env bash
# Turn full-size photo sources into web-optimised JPEGs for the site.
#
#   source : assets/examples2/<id>.png   (your originals — any size)
#   output : assets/examples/<id>.jpg     (max 1280px wide, ~quality 82, 16:9-friendly)
#
# The site loads <id>.jpg first and falls back to the generated <id>.svg panel,
# so techniques without a photo yet still look finished. Re-run this whenever you
# add new images to assets/examples2/.
#
# Uses macOS `sips` if available, otherwise ImageMagick `convert`.

set -euo pipefail
cd "$(dirname "$0")/.."

SRC="assets/examples2"
DST="assets/examples"
mkdir -p "$DST"
shopt -s nullglob

count=0
for f in "$SRC"/*.png "$SRC"/*.PNG "$SRC"/*.jpg "$SRC"/*.jpeg "$SRC"/*.JPG; do
  id="$(basename "${f%.*}")"
  if command -v sips >/dev/null 2>&1; then
    sips -s format jpeg -s formatOptions 82 -Z 1280 "$f" --out "$DST/$id.jpg" >/dev/null
  elif command -v convert >/dev/null 2>&1; then
    convert "$f" -resize 1280x720 -strip -interlace Plane -quality 82 "$DST/$id.jpg"
  else
    echo "Error: need macOS 'sips' or ImageMagick 'convert' on PATH." >&2
    exit 1
  fi
  echo "optimised $id.jpg"
  count=$((count + 1))
done

echo "Done — $count image(s) written to $DST/"
