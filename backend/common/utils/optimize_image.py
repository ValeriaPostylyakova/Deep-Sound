import io

from PIL import Image
from django.core.files.base import ContentFile


def optimize_image(instance):
    try:
        if hasattr(instance, "image") and instance.image:
            image_field = instance.image
        elif hasattr(instance, "avatar") and instance.avatar:
            image_field = instance.avatar
        else:
            return

        img = Image.open(image_field)

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

        filename = f"{getattr(instance, 'id', 'image')}.webp"
        image_field.save(filename, ContentFile(buffer.getvalue()), save=False)

    except Exception as e:
        print(f"Ошибка оптимизации изображения: {e}")
