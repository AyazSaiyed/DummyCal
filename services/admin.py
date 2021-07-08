from django.contrib import admin
from .models import (
    ClientService, Assumption, ProductCatalog, ServiceByBuilding,
    DeliveryModel, Service, JLLEstimate, SupplierPrice
)


@admin.register(Service, ClientService, Assumption, 
ProductCatalog, ServiceByBuilding, DeliveryModel, JLLEstimate, SupplierPrice)
class ServiceAdmin(admin.ModelAdmin):
    pass
