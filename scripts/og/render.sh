#!/usr/bin/env bash
# Regenerate the social share card and apple-touch-icon with headless Chrome.
#   scripts/og/render.sh
set -euo pipefail
cd "$(dirname "$0")/../.."
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
shot() { # <html> <out.png> <w> <h>
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --allow-file-access-from-files --virtual-time-budget=3000 \
    --window-size="$3,$4" --screenshot="$2" "file://$PWD/$1" >/dev/null 2>&1
  sips -g pixelWidth -g pixelHeight "$2" | tail -2
}
shot scripts/og/card.html src/assets/og-card.png 1200 630
shot scripts/og/touch-icon.html public/apple-touch-icon.png 180 180
