from rest_framework.pagination import CursorPagination

from common.paginations import BaseNumberPagination


class ListenerPlaylistsSetNumberPagination(BaseNumberPagination):
    page_size = 5


class ListenerPlaylistCursorPagination(CursorPagination):
    cursor_query_param = 'cursor'
    page_size = 5
    ordering = ('-created_at', '-id')
    cursor_query_param = "cursor"


class FavoritesNumberPagination(BaseNumberPagination):
    page_size = 8
