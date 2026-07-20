from rest_framework import serializers

from apps.listeners.models import ListenerProfile
from common.validators import validate_avatar


class ListenerProfileWriteSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(required=False, write_only=True)

    class Meta:
        model = ListenerProfile
        fields = ("avatar",)

    def validate(self, data):
        user = self.context.get("request").user
        if not user.is_active:
            raise serializers.ValidationError(
                {
                    "message": "Пользователь заблокирован за нарушение правил. Пожалуйста, свяжитесь с администратором."
                }
            )
        return data

    def validate_avatar(self, avatar):
        return validate_avatar(avatar)
