import uuid

from django.conf import settings
from django.db import models

from common.utils.optimize_image import optimize_image


class Artist(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    avatar = models.ImageField(upload_to="avatars/artists/", null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    bio = models.TextField(null=True, blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="artist"
    )

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.avatar and hasattr(self.avatar, "file"):
            optimize_image(self)
        super().save(*args, **kwargs)
