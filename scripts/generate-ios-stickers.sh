#!/usr/bin/env bash
# Regenerates the iMessage sticker pack from the emojis the app shows (src/assets/emojis.json),
# in the same order, labelled "<Arrernte> (<English>)" for VoiceOver.
#
# Run after adding/changing emojis, then commit the result:
#   ./scripts/generate-ios-stickers.sh
#
# Needs ImageMagick (`magick`) and python3.
set -euo pipefail

cd "$(dirname "$0")/.."
SRC=public/assets/emojis
PACK="ios/App/Stickers/Stickers.xcstickers/Sticker Pack.stickerpack"
# Apple's "large" sticker size: bigger images are shrunk to it, smaller ones are left alone (limit is 500 KB per sticker)
SIZE=618

command -v magick >/dev/null || { echo "ImageMagick (magick) is required" >&2; exit 1; }

rm -rf "$PACK"
mkdir -p "$PACK"

python3 - "$SRC" "$PACK" <<'PY' | while IFS=$'\t' read -r file; do
import json, os, sys
src, pack = sys.argv[1], sys.argv[2]
emojis = json.load(open("src/assets/emojis.json"))["emojis"]
seen, stickers = set(), []
for e in emojis:
    f = os.path.basename(e["file"])
    if f in seen:
        continue
    seen.add(f)
    if not os.path.exists(os.path.join(src, f)):
        sys.exit(f"missing image: {f}")
    name = os.path.splitext(f)[0]
    label = f'{e["name_arrernte"]} ({e["name"]})'
    os.makedirs(os.path.join(pack, f"{name}.sticker"))
    json.dump({"info": {"author": "xcode", "version": 1},
               "properties": {"filename": f, "accessibility-label": label}},
              open(os.path.join(pack, f"{name}.sticker", "Contents.json"), "w"), indent=2)
    stickers.append({"filename": f"{name}.sticker"})
    print(f)
json.dump({"info": {"author": "xcode", "version": 1},
           "properties": {"grid-size": "regular"},
           "stickers": stickers},
          open(os.path.join(pack, "Contents.json"), "w"), indent=2)
PY
  name="${file%.png}"
  magick "$SRC/$file" -resize "${SIZE}x${SIZE}>" -strip "$PACK/$name.sticker/$file"
done

count=$(find "$PACK" -name '*.png' | wc -l)
big=$(find "$PACK" -name '*.png' -size +500k)
[ -z "$big" ] || { echo "Stickers over Apple's 500 KB limit:" >&2; echo "$big" >&2; exit 1; }
echo "Generated $count stickers in $PACK"
