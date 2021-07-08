from django.contrib import admin
from .models import Industry, Client

class ClientAdmin(admin.ModelAdmin):
    pass

# Register your models here.
class IndustryAdmin(admin.ModelAdmin):
    pass

admin.site.register(Client, ClientAdmin)
admin.site.register(Industry, IndustryAdmin)

