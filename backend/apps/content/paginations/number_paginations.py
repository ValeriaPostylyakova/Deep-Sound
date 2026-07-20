from common.paginations import BaseNumberPagination


class CategoriesSetNumberPagination(BaseNumberPagination):
    pass


class TracksNumberPagination(BaseNumberPagination):
    page_size = 8
