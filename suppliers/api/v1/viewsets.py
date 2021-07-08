from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser
from suppliers.models import Supplier
from .serializers import SupplierSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend

class SupplierViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing and editing suppliers.
    """
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAdminUser]
    authentication_classes = (TokenAuthentication,)
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ['name']
    ordering_fields = '__all__'
    filterset_fields = [
        'name'
    ]