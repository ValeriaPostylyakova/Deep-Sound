from django.contrib.auth import get_user_model
from django.core.validators import MinLengthValidator
from rest_framework import serializers

from apps.common.validators import validate_avatar

User = get_user_model()


class ProfileWriteSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(
        required=False,
        validators=[
            MinLengthValidator(
                3,
                message="Слишком короткое имя. Пожалуйста, проверьте правильность ввода и попробуйте ещё раз.",
            )
        ],
    )
    last_name = serializers.CharField(
        required=False,
        validators=[
            MinLengthValidator(
                3,
                message="Слишком короткая фамилия. Пожалуйста, проверьте правильность ввода и попробуйте ещё раз.",
            )
        ],
    )

    avatar = serializers.ImageField(required=False, write_only=True)

    class Meta:
        model = User
        fields = ("first_name", "last_name", "avatar")

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
