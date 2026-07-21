from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from apps.listeners.models import ListenerPlaylist, FavoriteArtist, FavoriteTrack, FavoriteAlbum, ListenerProfile


@admin.register(ListenerProfile)
class ListenerProfileAdmin(admin.ModelAdmin):
    list_display = ('avatar_preview', 'user', 'created_at')
    list_display_links = ('avatar_preview', 'user')
    list_filter = ('created_at',)
    search_fields = ('user__email', 'user__username')
    list_select_related = ('user',)
    readonly_fields = ('id', 'created_at', 'updated_at', 'avatar_preview_detail')

    fieldsets = (
        (None, {
            'fields': ('id', 'user')
        }),
        (_('Медиа'), {
            'fields': ('avatar', 'avatar_preview_detail')
        }),
        (_('Даты'), {
            'fields': ('created_at', 'updated_at')
        }),
    )

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

    @admin.display(description=_("Текущий аватар"))
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


@admin.register(ListenerPlaylist)
class PlaylistAdmin(admin.ModelAdmin):
    list_display = ('image_preview', 'name', 'author', 'category', 'created_at')
    list_display_links = ('image_preview', 'name')
    list_filter = ('category', 'created_at')
    search_fields = ('name', 'author__user__email', 'author__user__username')
    list_select_related = ('author', 'author__user', 'category')
    autocomplete_fields = ('author', 'category', 'tracks')
    readonly_fields = ('id', 'created_at', 'updated_at', 'image_preview_detail')

    fieldsets = (
        (None, {
            'fields': ('id', 'name', 'author', 'category')
        }),
        (_('Содержимое'), {
            'fields': ('tracks',)
        }),
        (_('Медиа'), {
            'fields': ('image', 'image_preview_detail')
        }),
        (_('Даты'), {
            'fields': ('created_at', 'updated_at')
        }),
    )

    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('tracks')

    @admin.display(description=_("Обложка"))
    def image_preview(self, obj):
        try:
            if obj.image and obj.image.url:
                return format_html(
                    '<img src="{}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;" />',
                    obj.image.url
                )
        except ValueError:
            pass
        return format_html('<div style="width: 40px; height: 40px; border-radius: 4px; background-color: #ddd;"></div>')

    @admin.display(description=_("Текущая обложка"))
    def image_preview_detail(self, obj):
        try:
            if obj.image and obj.image.url:
                return format_html(
                    '<img src="{}" style="max-width: 200px; max-height: 200px; border-radius: 6px;" />',
                    obj.image.url
                )
        except ValueError:
            pass
        return _("Обложка не загружена")


@admin.register(FavoriteAlbum)
class FavoriteAlbumAdmin(admin.ModelAdmin):
    list_display = ('user_profile', 'album', 'created_at')
    list_select_related = ('user_profile', 'user_profile__user', 'album')
    search_fields = ('user_profile__user__email', 'album__name')
    readonly_fields = ('id', 'created_at')


@admin.register(FavoriteTrack)
class FavoriteTrackAdmin(admin.ModelAdmin):
    list_display = ('user_profile', 'track', 'created_at')
    list_select_related = ('user_profile', 'user_profile__user', 'track')
    search_fields = ('user_profile__user__email', 'track__title')
    readonly_fields = ('id', 'created_at')


@admin.register(FavoriteArtist)
class FavoriteArtistAdmin(admin.ModelAdmin):
    list_display = ('user_profile', 'artist', 'created_at')
    list_select_related = ('user_profile', 'user_profile__user', 'artist')
    search_fields = ('user_profile__user__email', 'artist__name')
    readonly_fields = ('id', 'created_at')
