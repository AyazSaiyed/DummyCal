from django.contrib import admin

from .models import (
    Building, BuildingType, CountryMetropolitanTier, Country,
    ClientBuildingTypeMapping
)


@admin.register(Building, BuildingType, CountryMetropolitanTier, Country,
                ClientBuildingTypeMapping)
class BuildingAdmin(admin.ModelAdmin):
    pass
