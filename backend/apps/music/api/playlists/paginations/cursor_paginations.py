from rest_framework.pagination import CursorPagination

class PlaylistTracksCursorPagination(CursorPagination):
    cursor_query_param = 'cursor'
    page_size = 5
    ordering = ('-created_at', '-id')
    cursor_query_param = "cursor"