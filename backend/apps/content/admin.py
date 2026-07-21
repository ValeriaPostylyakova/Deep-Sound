from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import gettext_lazy as _

from .models import (
    Category, Album, Track, TrackText
)


class TrackInline(admin.TabularInline):
    model = Track
    extra = 0
    fields = ('title', 'status', 'category')
    readonly_fields = ('title', 'status', 'category')
    can_delete = False


@admin.register(TrackText)
class TrackTextAdmin(admin.ModelAdmin):
    list_display = ('id', 'text_excerpt')
    search_fields = ('text', 'track__title')

    @admin.display(description=_("Отрывок текста"))
    def text_excerpt(self, obj):
        return obj.text[:50] + "..." if len(obj.text) > 50 else obj.text


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name',)
    readonly_fields = ('slug', 'created_at', 'updated_at')


@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('image_preview', 'name', 'author', 'category', 'status', 'created_at')
    list_display_links = ('image_preview', 'name')
    list_filter = ('status', 'category', 'created_at')
    search_fields = ('name', 'author__name')
    list_select_related = ('author', 'category')
    autocomplete_fields = ('author',)
    readonly_fields = ('id', 'created_at', 'updated_at', 'image_preview_detail')
    inlines = [TrackInline]

    fieldsets = (
        (None, {
            'fields': ('id', 'name', 'author', 'category')
        }),
        (_('Медиа'), {
            'fields': ('image', 'image_preview_detail')
        }),
        (_('Модерация'), {
            'fields': ('status', 'rejection_message')
        }),
        (_('Даты'), {
            'fields': ('created_at', 'updated_at')
        }),
    )

    @admin.display(description=_("Обложка"))
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;" />',
                obj.image.url)
        return format_html('<div style="width: 40px; height: 40px; border-radius: 4px; background-color: #ddd;"></div>')

    @admin.display(description=_("Текущая обложка"))
    def image_preview_detail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-width: 200px; max-height: 200px; border-radius: 6px;" />',
                               obj.image.url)
        return _("Обложка не загружена")


@admin.register(Track)
class TrackAdmin(admin.ModelAdmin):
    list_display = ('image_preview', 'title', 'author', 'album', 'category', 'status', 'duration')
    list_display_links = ('image_preview', 'title')
    list_filter = ('status', 'category', 'created_at')
    search_fields = ('title', 'author__name', 'album__name')
    list_select_related = ('author', 'category', 'album')
    autocomplete_fields = ('author', 'album', 'text')
    readonly_fields = ('id', 'created_at', 'image_preview_detail')

    fieldsets = (
        (None, {
            'fields': ('id', 'title', 'author', 'album', 'category', 'text')
        }),
        (_('Файлы'), {
            'fields': ('audio', 'duration', 'image', 'image_preview_detail')
        }),
        (_('Модерация'), {
            'fields': ('status', 'rejection_message')
        }),
        (_('Даты'), {
            'fields': ('created_at',)
        }),
    )

    @admin.display(description=_("Обложка"))
    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 40px; height: 40px; border-radius: 4px; object-fit: cover;" />',
                obj.image.url)
        return format_html('<div style="width: 40px; height: 40px; border-radius: 4px; background-color: #ddd;"></div>')

    @admin.display(description=_("Текущая обложка"))
    def image_preview_detail(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-width: 200px; max-height: 200px; border-radius: 6px;" />',
                               obj.image.url)
        return _("Обложка не загружена")
