from django.contrib import admin
from .models import Supplier

class SupplierAdmin(admin.ModelAdmin):
    pass

admin.site.register(Supplier, SupplierAdmin)