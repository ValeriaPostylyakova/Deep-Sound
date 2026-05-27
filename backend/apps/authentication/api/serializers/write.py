from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.validators import MinLengthValidator
from rest_framework import serializers

from ..utils.generate_username_from_email import generate_username_from_email

User = get_user_model()


class RegisterWriteSerializer(serializers.ModelSerializer):
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
            "id",
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


class LoginWriteSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), username=email, password=password
            )

            if not user:
                raise serializers.ValidationError(
                    {
                        "message": "Неправильный логин или пароль. Пожалуйста, проверьте правильность ввода данных и попробуйте ещё раз или зарегистрируйтесь."
                    }
                )

            data["user"] = user

            if not user.is_active:
                raise serializers.ValidationError(
                    {
                        "message": "Пользователь заблокирован за нарушение правил. Пожалуйста, свяжитесь с администратором."
                    }
                )

        else:
            raise serializers.ValidationError(
                {"message": "Пожалуйста, введите данные для входа."}
            )

        return data


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
