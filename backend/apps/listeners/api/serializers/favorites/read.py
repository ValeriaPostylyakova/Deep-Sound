from rest_framework import serializers

from apps.artists.api.serializers.read import ArtistProfileStandardSerializer
from apps.content.api.albums.serializers.read import AlbumListSerializer
from apps.content.api.tracks.serializers.read import TrackShortSerializer
from apps.listeners.api.serializers.profiles.read import ListenerProfileDefault
from apps.listeners.models import FavoriteTrack, FavoriteAlbum, FavoriteArtist


class FavoriteBaseSerializer(serializers.ModelSerializer):
    user_profile = serializers.HiddenField(default=ListenerProfileDefault())

    class Meta:
        fields = ("id", "user_profile")
        read_only_fields = ("id", "user_profile")


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
