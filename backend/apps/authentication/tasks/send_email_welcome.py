import requests
from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


@shared_task(
    name="auth.send_email_welcome",  # Понятное фиксированное имя
    autoretry_for=(
        requests.exceptions.RequestException,
    ),  # Повтор только при ошибках сети
    retry_backoff=True,  # Увеличивать паузу между попытками
    retry_backoff_max=600,  # Максимальная пауза — 10 минут
    max_retries=5,  # Не более 5 попыток
    ignore_result=True,  # Результат функции сохранять не нужно
    soft_time_limit=30,  # Не даем задаче висеть дольше 30 сек
)
def send_email_welcome(email, username):
    html_content = render_to_string(
        "emails/welcome.html",
        {"username": username},
    )

    msg = EmailMultiAlternatives(
        subject="Welcome to the site",
        body="Welcome to the site",
        to=[email],
    )

    msg.attach_alternative(html_content, "text/html")

    msg.send()
