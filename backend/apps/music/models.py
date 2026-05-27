import uuid
from typing import Iterable

from django.conf import settings
from django.db import models
from pytils.translit import slugify

from apps.common.utils.optimize_image import optimize_image

from ..artists.models import Artist

STATUS_CHOICES = [
    ("draft", "Черновик"),
    ("pending", "На проверке"),
    ("rejected", "Отклонено"),
    ("published", "Опубликовано"),
]

TYPE_PLAYLIST_CHOICES = [
    ("user", "Плейлист пользователя"),
    ("artist", "Плейлист исполнителя"),
]


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Track(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    image = models.ImageField(upload_to="tracks/images/")
    title = models.CharField(max_length=100, unique=True)
    audio = models.FileField(upload_to="tracks/audio/")
    duration = models.IntegerField(default=0)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    rejection_message = models.TextField(blank=True, null=True)

    author = models.ForeignKey(
        Artist, on_delete=models.SET_NULL, null=True, related_name="tracks"
    )

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="tracks"
    )

    created_at = models.DateTimeField(auto_now_add=True)


class Playlist(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="playlists/", null=True, blank=True)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="draft")
    rejection_message = models.TextField(blank=True, null=True)

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="playlists",
        blank=True,
        null=True,
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="playlists"
    )

    tracks = models.ManyToManyField(Track, related_name="playlists", blank=True)

    type = models.CharField(
        max_length=20, choices=TYPE_PLAYLIST_CHOICES, default="user"
    )

    is_official = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "author", "type", "is_official"],
                name="unique_playlist_name_author",
            ),
        ]

    def __str__(self):
        return f"{self.name} by {self.author}"

    def save(self, *args, **kwargs):
        if self.image and hasattr(self.image, "file"):
            optimize_image(self)
        super().save(*args, **kwargs)
