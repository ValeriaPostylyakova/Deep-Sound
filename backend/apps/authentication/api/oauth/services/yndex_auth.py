import requests
from django.conf import settings

TOKEN_URL = "https://oauth.yandex.ru/token"
USER_INFO_URL = "https://login.yandex.ru/info"


def exchange_code_for_token(code):
    response = requests.post(
        TOKEN_URL,
        data={
            "grant_type": "authorization_code",
            "code": code,
            "client_id": settings.YANDEX_CLIENT_ID,
            "client_secret": settings.YANDEX_CLIENT_SECRET,
            "redirect_uri": settings.YANDEX_REDIRECT_URI,
        },
        timeout=10,
    )

    response.raise_for_status()

    return response.json()["access_token"]


def get_user_info(access_token):
    response = requests.get(
        USER_INFO_URL,
        headers={
            "Authorization": f"OAuth {access_token}"
        },
        timeout=10,
    )

    response.raise_for_status()

    return response.json()
