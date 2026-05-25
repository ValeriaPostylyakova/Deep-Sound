import hashlib
import re
import secrets

from django.utils import timezone


def generate_username_from_email(email):
    base = email.split("@")[0].lower()
    base = re.sub(r"[^a-z0-9]", "", base)
    base = base if base else "user"

    random_suffix = secrets.randbelow(9000) + 1000
    return f"{base}_{random_suffix}"


def generate_resed_password_token():
    return secrets.token_urlsafe(48)


def hash_token(token):
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def current_device_info(request):
    current_time = timezone.now().strftime("%d.%m.%Y %H:%M:%S %Z")

    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip_address = x_forwarded_for.split(",")[0].strip()
    else:
        ip_address = request.META.get("REMOTE_ADDR")

    ua = request.user_agent
    device_os = ua.os.family
    device_browser = ua.browser.family
    device_info = f"{device_os}, {device_browser}"

    return {
        "current_time": current_time,
        "ip_address": ip_address,
        "device_info": device_info,
    }
