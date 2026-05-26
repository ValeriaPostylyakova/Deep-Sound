from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import BlacklistedToken, OutstandingToken

from ..tasks.optimize_avatar import optimize_avatar
from .serializers.read import ProfileReadSerializer
from .serializers.write import (
    ProfileWriteSerializer,
)

User = get_user_model()


class UserProfileView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfileReadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):

        if self.request.method == "PATCH":
            return ProfileWriteSerializer
        return ProfileReadSerializer

    def perform_update(self, serializer):
        user = serializer.save()

        if "avatar" in self.request.FILES:
            optimize_avatar.delay(user.id)

    def perform_destroy(self, instance):
        outstanding_tokens = OutstandingToken.objects.filter(user=instance)
        for token in outstanding_tokens:
            BlacklistedToken.objects.get_or_create(token=token)
        instance.delete()

    def patch(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        if self.get_serializer_class() != ProfileReadSerializer:
            instance = self.get_object()
            serializer = ProfileReadSerializer(
                instance, context=self.get_serializer_context()
            )
            return Response(serializer.data, status=status.HTTP_200_OK)

        return response
