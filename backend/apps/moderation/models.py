import uuid

from django.db import models

from common.utils.optimize_image import optimize_image


class ModerationPlaylist(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    image = models.ImageField(upload_to="playlists/moderations/", null=True, blank=True)

    category = models.ForeignKey(
        'content.Category',
        on_delete=models.PROTECT,
        related_name="playlists",
        blank=True,
        null=True,
    )

    tracks = models.ManyToManyField('content.Track', related_name="moderation_playlists", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} by {self.category}"

    def save(self, *args, **kwargs):
        if self.image and hasattr(self.image, "file"):
            optimize_image(self)
        super().save(*args, **kwargs)
