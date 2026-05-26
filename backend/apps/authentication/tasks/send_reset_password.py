import requests
from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


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
