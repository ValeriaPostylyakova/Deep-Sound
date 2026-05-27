import io

from django.core.files.base import ContentFile
from PIL import Image


def optimize_image(self):
    try:
        img = Image.open(self.image)

        if img.mode in ("RGBA", "P", "CMYK"):
            img = img.convert("RGB")

        width, height = img.size
        min_side = min(width, height)
        left = (width - min_side) / 2
        top = (height - min_side) / 2
        right = (width + min_side) / 2
        bottom = (height + min_side) / 2
        img = img.crop((left, top, right, bottom))

        output_size = (600, 600)
        img.thumbnail(output_size, Image.Resampling.LANCZOS)

        buffer = io.BytesIO()
        img.save(buffer, format="WEBP", quality=80, optimize=True)

        filename = f"{self.id or 'playlist'}.webp"
        self.image.save(filename, ContentFile(buffer.getvalue()), save=False)

    except Exception as e:
        print(e)
