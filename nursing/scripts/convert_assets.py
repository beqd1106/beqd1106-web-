# 福祉素材PNG → WebP変換（リサイズ+圧縮）
# 使い方: python convert_assets.py
from PIL import Image
from pathlib import Path

SRC = Path(r"C:\Users\user\Downloads\福祉素材")
DST = Path(r"C:\Users\user\Desktop\beqd1106-web-\nursing\images")

# (元ファイル, 出力名, 最大幅, 品質)
PICKS = [
    ("ChatGPT Image 2026年6月11日 21_47_53 (1).png", "photo_consult.webp",   1200, 82),
    ("ChatGPT Image 2026年6月11日 21_49_50 (1).png", "photo_interior.webp",  1400, 82),
    ("ChatGPT Image 2026年6月11日 21_59_50 (1).png", "texture_komorebi.webp", 1600, 75),
    ("ChatGPT Image 2026年6月11日 21_34_37 (1).png", "illust_scenes.webp",   1000, 85),
    ("ChatGPT Image 2026年6月11日 22_09_12 (1).png", "illust_bubbles.webp",   800, 85),
]

DST.mkdir(exist_ok=True)
for src_name, dst_name, max_w, q in PICKS:
    src = SRC / src_name
    img = Image.open(src)
    if img.width > max_w:
        h = round(img.height * max_w / img.width)
        img = img.resize((max_w, h), Image.LANCZOS)
    out = DST / dst_name
    img.save(out, "WEBP", quality=q, method=6)
    print(f"{dst_name}: {img.width}x{img.height} {out.stat().st_size // 1024}KB")
