class FavoriteBaseViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin, mixins.ListModelMixin,
                          mixins.DestroyModelMixin):
    pagination_class = TracksNumberPagination
    permission_classes = [permissions.IsAuthenticated]

    read_serializer_class = None
    write_serializer_class = None

    on_create_message = "Объект успешно добавлен в избранное."

    def get_serializer_class(self):
        if self.request.method in ["POST"]:
            return self.write_serializer_class
        return self.read_serializer_class

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        response.data['message'] = self.on_create_message
        return response


class FavoriteTrackViewSet(FavoriteBaseViewSet):
    def get_queryset(self):
        return FavoriteTrack.objects.filter(
            user=self.request.user
        ).select_related('track', 'track__author')

    read_serializer_class = FavoriteTrackSerializer
    write_serializer_class = FavoriteWriteTrackSerializer

    on_create_message = "Трек успешно добавлен в избранное."


class FavoriteAlbumViewSet(FavoriteBaseViewSet):
    def get_queryset(self):
        return FavoriteAlbum.objects.filter(
            user=self.request.user
        ).select_related('album', 'album__author')

    read_serializer_class = FavoriteAlbumSerializer
    write_serializer_class = FavoriteWriteAlbumSerializer

    on_create_message = "Альбом успешно добавлен в избранное."


class FavoriteArtistViewSet(FavoriteBaseViewSet):
    def get_queryset(self):
        return FavoriteArtist.objects.filter(
            user=self.request.user
        )

    read_serializer_class = FavoriteArtistSerializer
    write_serializer_class = FavoriteWriteArtistSerializer

    on_create_message = "Исполнитель успешно добавлен в избранное."
