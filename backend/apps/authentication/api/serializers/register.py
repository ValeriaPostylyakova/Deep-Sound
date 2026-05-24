from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.validators import MinLengthValidator
from rest_framework import serializers

from ..utils.utils import generate_username_from_email

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        validators=[
            validate_password,
            MinLengthValidator(
                8,
                message="Слишком короткий пароль. Пожалуйста, проверьте правильность ввода и попробуйте ещё раз.",
            ),
        ],
    )
    confirm_password = serializers.CharField(write_only=True)
    username = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "username",
            "avatar",
            "is_active",
            "created_at",
            "updated_at",
            "confirm_password",
        )

        read_only_fields = ("created_at", "updated_at")

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError(
                {
                    "confirm_password": "Пароли не совпадают. Пожалуйста, проверьте правильность ввода и попробуйте ещё раз."
                }
            )
        return data

    def create(self, validated_data):
        validated_data.pop("confirm_password", None)

        if not validated_data.get("username"):
            validated_data["username"] = generate_username_from_email(
                validated_data["email"]
            )

        return User.objects.create_user(**validated_data)
