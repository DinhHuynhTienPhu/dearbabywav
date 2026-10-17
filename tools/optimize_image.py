# Thu nhỏ + nén ảnh cho web (cần Pillow). Định dạng ra theo đuôi file đích: .webp / .jpg / .png
# Dùng: python tools/optimize_image.py <ảnh nguồn> <file đích> [chiều rộng tối đa, mặc định 900]
# Ghi đè lên chính file nguồn được (ảnh đã nhỏ hơn max thì chỉ nén lại).
# Cỡ đang dùng: ảnh thành viên 600, ảnh bìa card link 900, icon nhỏ 128.
import sys
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
max_w = int(sys.argv[3]) if len(sys.argv) > 3 else 900

im = Image.open(src).convert('RGB')
if im.width > max_w:
    im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)

ext = dst.lower().rsplit('.', 1)[-1]
if ext == 'webp':
    im.save(dst, 'WEBP', quality=80, method=6)
elif ext in ('jpg', 'jpeg'):
    im.save(dst, 'JPEG', quality=82, optimize=True, progressive=True)
else:
    im.save(dst, optimize=True)
print(dst, im.size)
