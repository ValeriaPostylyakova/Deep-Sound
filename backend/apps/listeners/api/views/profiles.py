from django.contrib.auth import get_user_model
from rest_framework import permissions, status
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from apps.listeners.api.serializers.profiles.read import ListenerProfileSerializer
from apps.listeners.api.serializers.profiles.write import ListenerProfileWriteSerializer
from apps.listeners.models import ListenerProfile

User = get_user_model()


class ListenerProfileView(GenericAPIView):
    serializer_class = ListenerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ListenerProfile.objects.filter(user=self.request.user)

    def get_object(self):
        obj = self.get_queryset().first()
        if not obj:
            from django.http import Http404
            raise Http404("Профиль пользователя не найден")
        return obj

    def get_serializer_class(self):
        if self.request.method == "PATCH":
            return ListenerProfileWriteSerializer

        if self.request.method == 'GET':
            view_mode = self.request.query_params.get('view')
            serializers_map = {
                'short': ListenerProfileSerializer,
                'detail': ListenerProfileSerializer
            }
            return serializers_map.get(view_mode, ListenerProfileSerializer)
        return ListenerProfileSerializer

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

        read_serializer = ListenerProfileSerializer(
            instance, context=self.get_serializer_context()
        )

        return Response(read_serializer.data, status=status.HTTP_200_OK)
