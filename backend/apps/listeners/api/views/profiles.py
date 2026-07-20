from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

from apps.listeners.api.serializers.profiles.read import ListenerProfileSerializer
from apps.listeners.api.serializers.profiles.write import ListenerProfileWriteSerializer

User = get_user_model()


class ListenerProfileView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ListenerProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

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

    def perform_destroy(self, instance):
        outstanding_tokens = OutstandingToken.objects.filter(user=instance)
        for token in outstanding_tokens:
            BlacklistedToken.objects.get_or_create(token=token)
        instance.delete()

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)

        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        instance.refresh_from_db()

        read_serializer = ListenerProfileSerializer(
            instance, context=self.get_serializer_context()
        )

        return Response(read_serializer.data, status=status.HTTP_200_OK)
