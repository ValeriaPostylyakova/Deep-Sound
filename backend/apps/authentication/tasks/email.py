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


@shared_task(
    name="auth.send_reset_password",
    autoretry_for=(requests.exceptions.RequestException,),
    retry_backoff=True,
    retry_backoff_max=600,
    max_retries=5,
    ignore_result=True,
    soft_time_limit=30,
)
def send_reset_password(email, link):
    html_content = render_to_string("emails/reset_password.html", {"link": link})

    msg = EmailMultiAlternatives(
        subject="Сброс пароля",
        body="Сброс пароля",
        to=[email],
    )

    msg.attach_alternative(html_content, "text/html")

    msg.send()


@shared_task(name="auth.send_change_password", ignore_result=True)
def send_change_password(user_email, username, event_time, ip_address, device_info):
    html_content = render_to_string(
        "emails/change_password.html",
        {
            "username": username,
            "event_time": event_time,
            "ip_address": ip_address,
            "device_info": device_info,
        },
    )

    msg = EmailMultiAlternatives(
        subject="Изменение пароля",
        body="Изменение пароля",
        to=[user_email],
    )

    msg.attach_alternative(html_content, "text/html")

    msg.send()
