from django.utils import timezone


def get_device_info(request):
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
