from io import BytesIO

from celery import shared_task
from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from PIL import Image

User = get_user_model()


@shared_task
def optimize_avatar(user_id):
    user = User.objects.get(id=user_id)

    if not user.avatar:
        return

    image = Image.open(user.avatar)

    if image.mode in ("RGBA", "P"):
        image = image.convert("RGB")

    image.thumbnail((1024, 1024))

    buffer = BytesIO()
    image.save(buffer, format="WEBP", quality=85, optimize=True)

    buffer.seek(0)

    filename = user.avatar.name.rsplit("/", 1)[-1].rsplit(".", 1)[0] + ".webp"

    user.avatar.save(filename, ContentFile(buffer.read()), save=False)
    user.save(update_fields=["avatar"])
