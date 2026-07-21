from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from apps.artists.models import ArtistProfile
from apps.content.models import Track, Album
from apps.listeners.api.serializers.profiles.read import ListenerProfileDefault
from apps.listeners.models import FavoriteTrack, FavoriteAlbum, FavoriteArtist


class FavoriteWriteBaseSerializer(serializers.ModelSerializer):
    user_profile = serializers.HiddenField(default=ListenerProfileDefault())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        target_fields = [f for f in self.fields if f != 'user_profile']

        if target_fields:
            target_field = target_fields[0]
            self.validators.append(
                UniqueTogetherValidator(
                    queryset=self.Meta.model.objects.all(),
                    fields=["user_profile", target_field],
                    message="Вы уже добавили этот объект в избранное."
                )
            )


class FavoriteWriteTrackSerializer(FavoriteWriteBaseSerializer):
    track = serializers.PrimaryKeyRelatedField(queryset=Track.objects.all())

    class Meta:
        model = FavoriteTrack
        fields = ("user_profile", "track")


class FavoriteWriteAlbumSerializer(FavoriteWriteBaseSerializer):
    album = serializers.PrimaryKeyRelatedField(queryset=Album.objects.all())

    class Meta:
        model = FavoriteAlbum
        fields = ("user_profile", "album")


class FavoriteWriteArtistSerializer(FavoriteWriteBaseSerializer):
    artist = serializers.PrimaryKeyRelatedField(queryset=ArtistProfile.objects.all())

    class Meta:
        model = FavoriteArtist
        fields = ("user_profile", "artist")
