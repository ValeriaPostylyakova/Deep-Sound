from rest_framework.permissions import BasePermission


class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser


class IsModerator(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == "modarator"


class IsArtist(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == "artist"
