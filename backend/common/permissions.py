from rest_framework import permissions


class IsSuperUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser


class IsModerator(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role.filter(name="moderator").exists()


class IsArtist(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.role.filter(name="artist").exists()

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user.artist


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and obj.author == request.user


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user and obj.author == request.user
