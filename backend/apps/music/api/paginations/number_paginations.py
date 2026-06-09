from rest_framework.pagination import PageNumberPagination


class BaseNumberPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 20


class PlaylistsSetNumberPagination(BaseNumberPagination):
    page_size = 5


class CategoriesSetNumberPagination(BaseNumberPagination):
    pass


class FavoritesTracksNumberPagination(BaseNumberPagination):
    page_size = 8
