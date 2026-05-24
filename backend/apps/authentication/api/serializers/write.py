from django.contrib.auth import get_user_model
from django.core.validators import MinLengthValidator
from rest_framework import serializers

User = get_user_model()


class UserWriteSerializer(serializers.ModelSerializer):
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

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
