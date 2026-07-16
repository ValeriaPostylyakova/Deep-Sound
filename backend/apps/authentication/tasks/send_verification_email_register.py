import requests
from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


@shared_task(
    name='auth.send_verification_email_register',
    autoretry_for=(requests.exceptions.RequestException,),
    retry_backoff=True,
    retry_backoff_max=600,
    max_retries=5,
    ignore_result=True,
    soft_time_limit=30,
)
def send_verification_email_register(email, link):
    html_content = render_to_string("emails/verification_email.html", {"link": link})

    msg = EmailMultiAlternatives(
        subject="Подтверждение регистрации",
        body="Подтверждение регистрации",
        to=[email],
    )

    msg.attach_alternative(html_content, "text/html")

    msg.send()
