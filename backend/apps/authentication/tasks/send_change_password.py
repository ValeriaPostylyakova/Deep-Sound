from celery import shared_task
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


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
