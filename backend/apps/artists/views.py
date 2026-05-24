from django.db import transaction
from rest_framework import permissions, status, viewsets
from rest_framework.response import Response

from ..authentication.permissions import IsArtist
from .models import Artist
from .serializers import ArtistProfileReadSerializer, ArtistProfileWriteSerializer


class ArtistProfileViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistProfileReadSerializer
    permission_classes = [IsArtist]

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "PUT"]:
            return ArtistProfileWriteSerializer
        return ArtistProfileReadSerializer

    def get_permissions(self):
        if self.request.method in ["GET", "PATCH", "PUT"]:
            self.permission_classes = [IsArtist]
        if self.request.method == "POST":
            self.permission_classes = [permissions.IsAuthenticated]
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        with transaction.atomic():
            user = request.user
            user.role = "artist"
            user.save()

            serializer.save(user=user)

        return Response(
            {
                "message": "Профиль исполнителя успешно создан",
                "artist": serializer.data,
            },
            status=status.HTTP_201_CREATED,
        )
