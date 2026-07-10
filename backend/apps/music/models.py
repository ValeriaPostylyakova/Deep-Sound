import uuid

from django.conf import settings
from django.db import models
from pytils.translit import slugify

from common.utils.optimize_image import optimize_image
from ..artists.models import Artist

STATUS_CHOICES_PLAYLIST = [
    ("draft", "Черновик"),
    ("pending", "На проверке"),
    ("rejected", "Отклонено"),
    ("approved", "Одобрено"),
    ("published", "Опубликовано"),
]

STATUS_CHOICES_TRACK_ALBUM = [
    ("waiting", "В ожидании"),
    ("processing", "В обработке"),
    ("pending", "На проверке"),
    ("rejected", "Отклонено"),
    ("approved", "Одобрено"),
    ("published", "Опубликовано"),
]


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Album(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="albums/", null=True, blank=True)

    author = models.ForeignKey(
        Artist, on_delete=models.SET_NULL, null=True, related_name="albums"
    )

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="albums"
    )

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES_TRACK_ALBUM, default="draft"
    )
    rejection_message = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "author"],
                name="unique_album_name_author",
            ),
        ]

    def __str__(self):
        return f"{self.name} by {self.author}"

    def save(self, *args, **kwargs):
        if self.image and hasattr(self.image, "file"):
            optimize_image(self)
        super().save(*args, **kwargs)


class TrackText(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    text = models.TextField()

    def __str__(self):
        return f"{self.text} by {self.track.title}"


class Track(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    image = models.ImageField(upload_to="tracks/images/", null=True, blank=True)
    title = models.CharField(max_length=100, unique=True)
    audio = models.FileField(upload_to="tracks/audio/")
    duration = models.IntegerField(default=0)

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES_TRACK_ALBUM, default="waiting"
    )
    rejection_message = models.TextField(blank=True, null=True)

    author = models.ForeignKey(
        Artist, on_delete=models.SET_NULL, null=True, related_name="tracks"
    )

    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, related_name="tracks"
    )

    album = models.ForeignKey(
        Album, on_delete=models.PROTECT, related_name="tracks", null=True, blank=True
    )

    text = models.OneToOneField(TrackText, on_delete=models.CASCADE, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)


class Playlist(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="playlists/", null=True, blank=True)

    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES_PLAYLIST, default="draft"
    )

    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="playlists",
        blank=True,
        null=True,
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="playlists",
        blank=True,
        null=True,
    )

    tracks = models.ManyToManyField(Track, related_name="playlists", blank=True)

    is_official = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "is_official", "author"], name="unique_official_playlist_name_author"
            ),
        ]

    def __str__(self):
        return f"{self.name} by {self.category}"

    def save(self, *args, **kwargs):
        if self.image and hasattr(self.image, "file"):
            optimize_image(self)
        super().save(*args, **kwargs)


class FavoriteAlbum(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'album'], name="unique_user_favorite_album"
            )
        ]

    created_at = models.DateTimeField(auto_now_add=True)


class FavoriteTrack(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    track = models.ForeignKey(Track, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'track'], name="unique_user_favorite_track"
            )
        ]

    created_at = models.DateTimeField(auto_now_add=True)


class FavoriteArtist(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'artist'], name="unique_user_favorite_artist"
            )
        ]

    created_at = models.DateTimeField(auto_now_add=True)
