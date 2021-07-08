from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils.translation import gettext_lazy as _
from utils.fields import (
    MainRegionMixin, SubRegionMixin, OwnershipTypeMixin,
    LeaseTypeMixin, ServiceLevelMixin
)
from core.models import CommonMeta


class Country(CommonMeta):
    name = models.CharField(_("Field 1"), max_length=255)
    main_region = models.CharField(
        _("Main Region"),
        max_length=5,
        choices=MainRegionMixin.MAIN_REGION_CHOICES,
        blank=True
    )

    sub_region = models.CharField(
        _("Sub Region"),
        max_length=50,
        choices=SubRegionMixin.SUB_REGION_CHOICES,
        blank=True
    )
    fx_code = models.CharField(_("FX Code"), max_length=50)
    delivery_model = models.CharField(_("Delivery Model"), max_length=50, blank=True)
    risk_level = models.CharField(_("Risk Level"), max_length=50, blank=True)

    # country city tier
    class Meta:
        app_label = 'buildings'
        verbose_name = _('Country')
        verbose_name_plural = _('Countries')


class CountryMetropolitanTier(models.Model):
    country = models.ForeignKey(Country,
                                on_delete=models.SET_NULL,
                                related_name="metropolitan_tier",
                                null=True
                                )
    metropolitan_area = models.TextField(_("Metropolitan Area"))
    standard_metropolitan_area = models.TextField(_("Standardised Metropolitan Area"))
    tier = models.CharField(_("Tier"), max_length=255, blank=True)

    class Meta:
        app_label = 'buildings'
        verbose_name = _('CountryMetropolitanTier')
        verbose_name_plural = _('CountryMetropolitanTiers')

    def __str__(self):
        return f'{self.country} - {self.metropolitan_area}'


class BuildingType(models.Model):
    building_type = models.CharField(_("JLL Building Type"), max_length=50)
    sqft_per_person = models.IntegerField(_("SqFt per person"), default=0)

    class Meta:
        app_label = 'buildings'
        verbose_name = _('BuildingType')
        verbose_name_plural = _('BuildingTypes')

    def __str__(self):
        return f'{self.building_type}'


class ClientBuildingTypeMapping(models.Model):
    client_building_type = models.CharField(_("Client Building Type"), max_length=50)
    building_type = models.ForeignKey(BuildingType, on_delete=models.CASCADE, related_name="client_building_types")

    class Meta:
        app_label = 'buildings'
        verbose_name = _('ClientBuildingTypeMapping')
        verbose_name_plural = _('ClientBuildingTypeMapping')

    def __str__(self):
        return f'{self.client_building_type}'

class Building(models.Model, MainRegionMixin, OwnershipTypeMixin, LeaseTypeMixin,
    ServiceLevelMixin):

    building_type = models.ForeignKey(BuildingType, on_delete=models.SET_NULL, related_name="buildings", null=True, blank=True)
    main_region = models.CharField(_("Main Region"), max_length=50, choices=MainRegionMixin.MAIN_REGION_CHOICES, blank=True)
    sub_region = models.CharField(_("Sub Region"), max_length=50, choices=SubRegionMixin.SUB_REGION_CHOICES, blank=True)
    country = models.CharField(_("Country"), max_length=50, blank=True)
    state = models.CharField(_("Governing District"), max_length=255, blank=True)
    city = models.CharField(_("City"), max_length=255, blank=True)
    site_id = models.CharField(_("Client Site ID"), max_length=255, blank=True)
    floor = models.IntegerField(_("Floor"), default=0)
    floor_sub_area = models.CharField(_("Floor Sub-Area"), max_length=255, blank=True)
    building_area_type = models.ForeignKey(BuildingType, on_delete=models.SET_NULL, related_name="client_buildings", null=True, blank=True)
    ownership_type = models.CharField(_("Ownership Type"), max_length=20,
        choices=OwnershipTypeMixin.OWNERSHIP_TYPE_CHOICES, blank=True)
    lease_type = models.CharField(
        _("Lease Type"), max_length=20,
        choices=LeaseTypeMixin.LEASE_TYPE_CHOICES, blank=True
    )
    headcount = models.IntegerField(
        _("Headcount"), default=0
    )
    gross_floor_area = models.IntegerField(
        _("Gross Floor Area"), default=0
    )
    gross_floor_area_units = models.CharField(
        _("Gross Floor Area Units"), max_length=50, blank=True
    )
    green_area = models.IntegerField(
        _("Green Area"), default=0
    )    
    green_area_units = models.CharField(
        _("Green Area Units"), max_length=50, blank=True
    )    
    service_level = models.CharField(
        _("Service Level"),
        max_length=20,
        choices=ServiceLevelMixin.SERVICE_LEVEL_CHOICES,
        blank=True
    )    
    go_live_date = models.DateField(
        _("Go-Live Date"),
        null=True
    )
    scope_pursuit = models.CharField(
        _("IN SCOPE OF PURSUIT?"), max_length=1, default="N"
    )
    days_operation = JSONField(_("Days of Operation"), blank=True, null=True)
    hours_operation = JSONField(_("Hours of Operation"), blank=True, null=True)
    worker_shifts = models.IntegerField(_("How Many Work Shifts?"), default=0)
    client_rfx = models.ForeignKey(
        "client_rfxs.ClientRfx",  on_delete=models.CASCADE, related_name="buildings"
    )
    note_created = models.CharField(_("Note Created"), max_length=50, null=True, blank=True) # For debug purpose
    building_name = models.CharField(
        _("Building Name"),
        max_length=255,
        blank=True
    )
    # =================
    # property_name = models.CharField(
    #     _("Property Name/Address"),
    #     max_length=255,
    #     blank=True
    # )
    # zipcode = models.CharField(
    #     _("Postal Area"),
    #     max_length=64,
    #     null=True
    # )
    # metropolitan_tier = models.ForeignKey(
    #     CountryMetropolitanTier,
    #     on_delete=models.CASCADE,
    #     related_name="buildings"
    # )
    # metropolitan_area = models.CharField(
    #     _("Metropolitan Area"),
    #     max_length=255,
    #     null=True
    # )
    # client_building_type = models.ForeignKey(
    #     ClientBuildingTypeMapping,
    #     on_delete=models.SET_NULL,
    #     related_name="buildings",
    #     null=True
    # )
    # calculated_headcount = models.IntegerField(_("Calculated Headcount"), default=0)

    class Meta:
        app_label = 'buildings'
        verbose_name = _('Building')
        verbose_name_plural = _('Buildings')

    def __str__(self):
        return f'{self.building_type} - {self.city}'


# class BuildingFloor(models.Model):
#     name = models.CharField(_("Name"), max_length=255, blank=True)
#     floor = models.CharField(_("Floor"), max_length=255, blank=True)
#     building = models.ForeignKey(
#         Building,
#         on_delete=models.CASCADE,
#         related_name="floors"
#     )  # (multiple per building)

#     class Meta:
#         app_label = 'buildings'
#         verbose_name = _('BuildingFloor')
#         verbose_name_plural = _('BuildingFloors')


# class BuildingFloorArea(models.Model):
#     name = models.CharField(_("Area Name"), max_length=255)
#     building_floor = models.ForeignKey(
#         BuildingFloor,
#         on_delete=models.CASCADE,
#         related_name="floor_areas"
#     )  # (multiple per floor)

#     class Meta:
#         app_label = 'buildings'
#         verbose_name = _('BuildingFloorArea')
#         verbose_name_plural = _('BuildingFloorAreas')
