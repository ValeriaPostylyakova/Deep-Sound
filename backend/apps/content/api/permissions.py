from rest_framework import permissions


class IsAlbumAndTrackAuthor(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        author = getattr(obj, 'author', None)
        if author and hasattr(author, 'user'):
            return author.user == request.user
        return False
