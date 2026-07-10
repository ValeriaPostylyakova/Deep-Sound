from django.db import transaction
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from apps.artists.models import Artist
from apps.authentication.models import Role
from common.permissions import IsArtist
from .serializers.read import ArtistProfileStandardSerializer
from .serializers.write import ArtistProfileWriteSerializer, BecomeArtistWriteSerializer


class ArtistProfileViewSet(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistProfileStandardSerializer
    permission_classes = [IsArtist]

    def get_queryset(self):
        return Artist.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ["PATCH"]:
            return ArtistProfileWriteSerializer
        return ArtistProfileStandardSerializer

    def get_permissions(self):
        if self.request.method in ["GET", "PATCH"]:
            self.permission_classes = [IsArtist]
        return super().get_permissions()

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        instance.refresh_from_db()

        read_serializer = ArtistProfileStandardSerializer(
            instance, context=self.get_serializer_context()
        )

        return Response(read_serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def become_artist(request):
    user = request.user

    if user.is_artist:
        return Response(
            {"message": "Вы уже являетесь исполнителем"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        with transaction.atomic():
            role, _ = Role.objects.get_or_create(name="artist")
            user.role.add(role)

            serializer = BecomeArtistWriteSerializer(
                data={"name": user.username}, context={"request": request}
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(
                {"message": "Вы успешно стали исполнителем"},
                status=status.HTTP_200_OK,
            )

    except Exception as e:
        return Response(
            {
                "message": "Что-то пошло не так. Пожалуйста, попробуйте ещё раз или повторите попытку позже.",
                "error_type": e.__class__.__name__,
                "error_details": str(e),
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
