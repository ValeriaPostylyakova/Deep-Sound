from django.conf import settings
from google.auth.transport import requests
from google.oauth2 import id_token


def verify_google_token(token):
    try:
        return id_token.verify_oauth2_token(
            token, requests.Request(), settings.GOOGLE_CLIENT_ID
        )
    except ValueError:
        return None
