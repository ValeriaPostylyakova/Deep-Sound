from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.cache import cache

from apps.authentication.tasks.send_reset_password import send_reset_password
from apps.authentication.utils.generate_tokens import generate_resed_password_token, hash_token

User = get_user_model()


def forgot_password(user):
    raw_token = generate_resed_password_token()
    hashed_token = hash_token(raw_token)

    cache_key = f"reset_password_{hashed_token}"
    cache.set(cache_key, user.id, timeout=settings.PASSWORD_RESET_TTL)

    reset_link = f"{settings.FRONTEND_URL}/reset-password?token={raw_token}"
    send_reset_password.delay(user.email, reset_link)


def reset_password(token, password):
    hashed_token = hash_token(token)
    cache_key = f"reset_password_{hashed_token}"

    user_id = cache.get(cache_key)

    if not user_id:
        return False

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return False

    user.set_password(password)
    user.save(update_fields=["password"])

    cache.delete(cache_key)

    return True
