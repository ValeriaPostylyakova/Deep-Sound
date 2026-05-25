from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
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


class ForgotPasswordWriteSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate(self, data):
        user = User.objects.filter(email=data["email"]).first()
        if not user:
            raise serializers.ValidationError(
                {"message": "Пользователь с такой почтой не зарегистрирован."}
            )

        if not user.is_active:
            raise serializers.ValidationError(
                {
                    "message": "Пользователь заблокирован за нарушение правил. Пожалуйста, свяжитесь с администратором."
                }
            )
        data["user"] = user
        return data


class ResetPasswordWriteSerializer(serializers.Serializer):
    token = serializers.CharField()
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


class ChangePasswordWriteSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(
        write_only=True, validators=[validate_password, MinLengthValidator(8)]
    )

    def validate(self, data):
        user = self.context.get("request").user
        if not user.check_password(data["old_password"]):
            raise serializers.ValidationError(
                {
                    "message": "Неверный пароль. Пожалуйста, проверьте правильность ввода и попробуйте ещё раз."
                }
            )
        if not user.is_active:
            raise serializers.ValidationError(
                {
                    "message": "Пользователь заблокирован за нарушение правил. Пожалуйста, свяжитесь с администратором."
                }
            )

        if data["new_password"] == data["old_password"]:
            raise serializers.ValidationError(
                {
                    "message": "Новый пароль совпадает со старым. Пожалуйста, введите новый пароль и попробуйте ещё раз."
                }
            )
        return data

    def save(self, **kwargs):
        user = self.context.get("request").user

        user.set_password(self.validated_data["new_password"])
        user.save(update_fields=["password"])
