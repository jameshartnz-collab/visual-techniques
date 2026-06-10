#!/usr/bin/env bash
# One-command deploy for THE FRAME.
#
#   bash tools/deploy.sh                 # commit any changes and push
#   bash tools/deploy.sh "your message"  # with a custom commit message
#
# Steps:
#   1. Optimise any NEW photos in assets/examples2/ that don't have a JPEG yet.
#   2. Stage everything, commit (skipped if nothing changed).
#   3. Push to GitHub → GitHub Pages redeploys automatically.
#
# Requires GitHub auth to be set up once (e.g. `gh auth login`), so no token prompt.

set -euo pipefail
cd "$(dirname "$0")/.."

msg="${1:-Update site ($(date '+%Y-%m-%d %H:%M'))}"

# 1. Optimise only photos that are missing a JPEG (fast; existing ones untouched).
if [ -d assets/examples2 ]; then
  bash tools/optimise-photos.sh --missing-only
fi

# 2. Commit if there's anything to commit.
git add -A
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "$msg"
  echo "Committed: $msg"
fi

# 3. Push (also sends any earlier unpushed commits).
echo "Pushing…"
git push

echo ""
echo "Done. Live in ~1 minute at:"
echo "  https://jameshartnz-collab.github.io/visual-techniques/"
