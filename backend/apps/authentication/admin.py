from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from .models import User, Role


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = (
        'avatar_preview',
        'email',
        'username',
        'is_staff',
        'is_active',
        'created_at',
    )
    list_display_links = ('avatar_preview', 'email')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'role')
    search_fields = ('email', 'username')
    ordering = ('-created_at',)
    filter_horizontal = ('role', 'groups', 'user_permissions')
    readonly_fields = ('id', 'created_at', 'updated_at', 'avatar_preview_detail')

    fieldsets = (
        (None, {
            'fields': ('id', 'username', 'password')
        }),
        (_('Персональная информация'), {
            'fields': ('first_name', 'last_name', 'email')
        }),
        (_('Медиа'), {
            'fields': ('avatar', 'avatar_preview_detail')
        }),
        (_('Роли проекта'), {
            'fields': ('role',)
        }),
        (_('Права доступа Django'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        (_('Важные даты'), {
            'fields': ('last_login', 'created_at', 'updated_at')
        }),
    )

    @admin.display(description=_("Аватар"))
    def avatar_preview(self, obj):
        if obj.avatar:
            return format_html(
                '<img src="{}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;" />',
                obj.avatar.url
            )
        return format_html(
            '<div style="width: 40px; height: 40px; border-radius: 50%; background-color: #ddd; display: inline-block;"></div>'
        )

    @admin.display(description=_("Текущий аватар (просмотр)"))
    def avatar_preview_detail(self, obj):
        if obj.avatar:
            return format_html(
                '<img src="{}" style="max-width: 200px; max-height: 200px; border-radius: 8px; object-fit: contain;" />',
                obj.avatar.url
            )
        return _("Аватар не загружен")
