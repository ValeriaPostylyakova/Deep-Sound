from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from apps.artists.models import Artist
from apps.music.models import FavoriteTrack, FavoriteAlbum, FavoriteArtist, Album, Track


class FavoriteWriteBaseSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        target_fields = [f for f in self.fields if f != 'user']
        if target_fields:
            target_field = target_fields[0]

            self.validators.append(
                UniqueTogetherValidator(
                    queryset=self.Meta.model.objects.all(),
                    fields=["user", target_field],
                    message="Вы уже добавили этот объект в избранное."
                )
            )


class FavoriteWriteTrackSerializer(FavoriteWriteBaseSerializer):
    track = serializers.PrimaryKeyRelatedField(queryset=Track.objects.all())

    class Meta:
        model = FavoriteTrack
        fields = ("user", "track")


class FavoriteWriteAlbumSerializer(FavoriteWriteBaseSerializer):
    album = serializers.PrimaryKeyRelatedField(queryset=Album.objects.all())

    class Meta:
        model = FavoriteAlbum
        fields = ("user", "album")


class FavoriteWriteArtistSerializer(FavoriteWriteBaseSerializer):
    artist = serializers.PrimaryKeyRelatedField(queryset=Artist.objects.all())

    class Meta:
        model = FavoriteArtist
        fields = ("user", "artist")
