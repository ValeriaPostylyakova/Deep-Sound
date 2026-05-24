from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


@shared_task(
    autoretry_for=(Exception,),
    retry_backoff=True,
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
