from django.db.models import Prefetch
from rest_framework import status, viewsets, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.artists.models import ArtistProfile
from apps.content.models import Album, Track
from .serializers.read import ArtistProfileStandardSerializer
from .serializers.write import ArtistProfileWriteSerializer


class ArtistProfileReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = ArtistProfileStandardSerializer

    def get_queryset(self):
        return ArtistProfile.objects.prefetch_related(
            Prefetch('albums', queryset=Album.objects.select_related('category')),
            Prefetch('tracks', queryset=Track.objects.select_related('album', 'category', 'text')),
        )


class ArtistProfileView(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ArtistProfile.objects.filter(user=self.request.user)

    def get_object(self):
        obj = self.get_queryset().first()
        if not obj:
            from django.http import Http404
            raise Http404("Профиль артиста не найден")
        return obj

    def get_serializer_class(self):
        if self.request.method in ["PATCH"]:
            return ArtistProfileWriteSerializer
        return ArtistProfileStandardSerializer

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        instance.refresh_from_db()

        read_serializer = ArtistProfileStandardSerializer(
            instance, context=self.get_serializer_context()
        )

        return Response(read_serializer.data, status=status.HTTP_200_OK)
