import uuid

from django.conf import settings
from django.db import models

from common.utils.optimize_image import optimize_image


class ListenerProfile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    avatar = models.ImageField(upload_to="avatars/listeners/", null=True, blank=True)

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="listener"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.email

    def save(self, *args, **kwargs):
        if self.avatar and hasattr(self.avatar, "file"):
            optimize_image(self)
        super().save(*args, **kwargs)


class ListenerPlaylist(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="playlists/listeners/", null=True, blank=True)

    category = models.ForeignKey(
        'content.Category',
        on_delete=models.PROTECT,
        related_name="playlists",
        blank=True,
        null=True,
    )

    author = models.ForeignKey(
        'ListenerProfile',
        on_delete=models.PROTECT,
        related_name="playlists",
        blank=True,
        null=True,
    )

    tracks = models.ManyToManyField('content.Track', related_name="listener_playlists", blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["name", "author"], name="unique_playlist_name_author"
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

    user = models.ForeignKey('ListenerProfile', on_delete=models.CASCADE)
    album = models.ForeignKey('content.Album', on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'album'], name="unique_user_favorite_album"
            )
        ]

    created_at = models.DateTimeField(auto_now_add=True)


class FavoriteTrack(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)

    user = models.ForeignKey('ListenerProfile', on_delete=models.CASCADE)
    track = models.ForeignKey('content.Track', on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'track'], name="unique_user_favorite_track"
            )
        ]

    created_at = models.DateTimeField(auto_now_add=True)


class FavoriteArtist(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)

    user = models.ForeignKey('ListenerProfile', on_delete=models.CASCADE)
    artist = models.ForeignKey('artists.ArtistProfile', on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'artist'], name="unique_user_favorite_artist"
            )
        ]

    created_at = models.DateTimeField(auto_now_add=True)
