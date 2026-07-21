from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from .models import ArtistProfile


@admin.register(ArtistProfile)
class ArtistAdmin(admin.ModelAdmin):
    list_display = (
        'avatar_preview',
        'name',
        'user',
        'is_verified',
        'created_at',
    )
    list_display_links = ('avatar_preview', 'name')
    list_filter = ('is_verified', 'created_at')
    search_fields = ('name', 'user__username', 'user__email')
    list_select_related = ('user',)
    list_editable = ('is_verified',)
    list_per_page = 25

    fieldsets = (
        (_('Основная информация'), {
            'fields': ('name', 'user', 'bio')
        }),
        (_('Медиа'), {
            'fields': ('avatar', 'avatar_preview_detail')
        }),
        (_('Статусы и доступы'), {
            'fields': ('is_verified',)
        }),
        (_('Даты (Только чтение)'), {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )

    readonly_fields = ('created_at', 'updated_at', 'avatar_preview_detail')
    actions = ['verify_artists', 'unverify_artists']

    @admin.action(description=_("Верифицировать выбранных артистов"))
    def verify_artists(self, request, queryset):
        updated = queryset.update(is_verified=True)
        self.message_user(request, f"Успешно верифицировано артистов: {updated}.")

    @admin.action(description=_("Снять верификацию с выбранных артистов"))
    def unverify_artists(self, request, queryset):
        updated = queryset.update(is_verified=False)
        self.message_user(request, f"Верификация снята у артистов: {updated}.")

    @admin.display(description=_("Аватар"))
    def avatar_preview(self, obj):
        try:
            if obj.avatar and obj.avatar.url:
                return format_html(
                    '<img src="{}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />',
                    obj.avatar.url
                )
        except ValueError:
            pass
        return format_html(
            '<div style="width: 40px; height: 40px; border-radius: 50%; background-color: #ddd; display: inline-block;"></div>'
        )

    @admin.display(description=_("Текущий аватар (просмотр)"))
    def avatar_preview_detail(self, obj):
        try:
            if obj.avatar and obj.avatar.url:
                return format_html(
                    '<img src="{}" style="max-width: 200px; max-height: 200px; border-radius: 8px; object-fit: contain;" />',
                    obj.avatar.url
                )
        except ValueError:
            pass
        return _("Аватар не загружен")
