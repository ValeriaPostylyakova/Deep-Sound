from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

User = get_user_model()


class LoginSerializer(serializers.Serializer):
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
