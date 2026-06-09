from rest_framework import viewsets, permissions

from apps.music.models import Category
from .serializers.read import CategoryShortSerializer, CategoryStandardSerializer
from ..paginations.number_paginations import CategoriesSetNumberPagination


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [permissions.AllowAny]
    pagination_class = CategoriesSetNumberPagination
    lookup_field = "slug"

    def get_queryset(self):
        if self.action == "retrieve":
            return (Category.objects.prefetch_related("albums")
                    .prefetch_related('tracks').all())
        return Category.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return CategoryShortSerializer
        return CategoryStandardSerializer
