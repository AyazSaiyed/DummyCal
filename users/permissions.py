from rest_framework import permissions

class IsCaltanaCustomer(permissions.BasePermission):
    message = 'Managing client_rfxs not allowed.'

    def has_permission(self, request, view):
        user = request.user
        return user.is_superuser or user.is_staff or user.groups.filter(name="Caltana Customer").exists()