from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired
from rest_framework.exceptions import ValidationError

from apps.authentication.tasks.send_verification_email_register import send_verification_email_register

User = get_user_model()


def send_verification_link(user_email):
    signer = TimestampSigner()
    token = signer.sign(user_email)
    verification_link = f"{settings.FRONTEND_URL}/verify-email?token={token}"

    send_verification_email_register.delay(user_email, verification_link)


def verify_email_token(token):
    signer = TimestampSigner()
    try:
        email = signer.unsign(token, max_age=settings.EMAIL_VERIFICATION_TTL)
        user = User.objects.get(email=email)

        if not user.is_active:
            user.is_active = True
            user.is_verified = True
            user.save(update_fields=["is_active", "is_verified"])


    except SignatureExpired:
        raise ValidationError({"token": "Срок действия ссылки подтверждения истек."})

    except (BadSignature, User.DoesNotExist):
        raise ValidationError({"token": "Недействительная или измененная ссылка подтверждения."})
