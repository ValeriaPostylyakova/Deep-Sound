from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User, Role


@admin.register(Role)
class RoleAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = (
        'email',
        'username',
        'is_staff',
        'is_active',
        'created_at',
    )
    list_display_links = ('email', 'username')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'roles')
    search_fields = ('email', 'username')
    ordering = ('-created_at',)
    filter_horizontal = ('roles', 'groups', 'user_permissions')
    readonly_fields = ('id', 'created_at', 'updated_at')

    fieldsets = (
        (None, {
            'fields': ('id', 'username', 'password')
        }),
        (_('Персональная информация'), {
            'fields': ('first_name', 'last_name', 'email')
        }),
        (_('Роли проекта'), {
            'fields': ('roles',)
        }),
        (_('Права доступа Django'), {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        (_('Важные даты'), {
            'fields': ('last_login', 'created_at', 'updated_at')
        }),
    )
