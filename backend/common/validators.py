from rest_framework import serializers


def validate_avatar(avatar):
    if avatar.size > 5 * 1024 * 1024:
        raise serializers.ValidationError(
            {"message": "Размер изображения не должен превышать 5 МБ."}
        )

    if avatar.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise serializers.ValidationError(
            {"message": "Допустимые форматы изображений: JPEG, PNG, WEBP."}
        )
    return avatar
