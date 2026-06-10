from rest_framework import serializers

from apps.artists.api.serializers.read import ArtistProfileStandardSerializer
from apps.music.api.albums.serializers.read import AlbumListSerializer
from apps.music.api.tracks.serializers.read import TrackShortSerializer
from apps.music.models import FavoriteTrack, FavoriteAlbum, FavoriteArtist


class FavoriteBaseSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        fields = ("id", "user")
        read_only_fields = ("id", "user")


class FavoriteTrackSerializer(FavoriteBaseSerializer):
    track = TrackShortSerializer(read_only=True)

    class Meta:
        model = FavoriteTrack
        fields = FavoriteBaseSerializer.Meta.fields + ("track",)


class FavoriteAlbumSerializer(FavoriteBaseSerializer):
    album = AlbumListSerializer(read_only=True)

    class Meta:
        model = FavoriteAlbum
        fields = FavoriteBaseSerializer.Meta.fields + ("album",)


class FavoriteArtistSerializer(FavoriteBaseSerializer):
    artist = ArtistProfileStandardSerializer(read_only=True)

    class Meta:
        model = FavoriteArtist
        fields = FavoriteBaseSerializer.Meta.fields + ("artist",)
