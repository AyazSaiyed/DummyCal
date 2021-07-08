from decimal import Decimal
from django.db import models
from django.utils.translation import gettext_lazy as _

from core.models import CommonMeta
from utils.fields import SourceMixin


class DeliveryModel(CommonMeta):
    name = models.CharField(max_length=120, unique=True)


class Assumption(models.Model):
    name = models.CharField(max_length=120, default='')
    value = models.CharField(max_length=120, default='')
    unit = models.CharField(max_length=50, default="", blank=True)
    source = models.CharField(max_length=40, choices=SourceMixin.SOURCE_CHOICES, null=True, )
    service_by_building = models.ForeignKey("services.ServiceByBuilding", on_delete=models.CASCADE,
                                            related_name="assumptions", null=True)

    def __str__(self):
        return f'{self.service_by_building} - {self.details}'


class ProductCatalog(models.Model):
    level_1 = models.CharField(_("Level 1"), max_length=255, blank=True)
    level_2 = models.CharField(_("Level 2"), max_length=255, blank=True)
    level_3 = models.CharField(_("Level 3"), max_length=255, blank=True)
    suppliers = models.ManyToManyField("suppliers.Supplier", blank=True)

    class Meta:
        app_label = 'services'
        verbose_name = _('ProductCatalog')
        verbose_name_plural = _('ProductCatalogs')

    def __str__(self):
        return f'{self.level_1}'


class Service(models.Model):
    value = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.value}'


class ClientService(models.Model):
    city = models.CharField(max_length=100, default='')
    inScope = models.BooleanField(_("In Scope"), default=False)
    deliveryModel = models.ForeignKey(DeliveryModel, on_delete=models.CASCADE, related_name="client_service",
                                      null=True)
    services = models.ManyToManyField(Service)
    assumption = models.ForeignKey(Assumption, on_delete=models.CASCADE, related_name="client_service", blank=True,
                                   null=True)
    service_name = models.CharField(_("Client Service Name"), max_length=255)
    client_rfx = models.ForeignKey("client_rfxs.ClientRfx", on_delete=models.CASCADE, related_name="client_service")

    client_service_number = models.CharField(_("Client Service Number"), max_length=255, blank=True)
    other_service_data = models.TextField(_("Other Service from Client"), blank=True)
    client_verified = models.BooleanField(_("Client Verified"), default=False)
    note_created = models.CharField(_("Note Created"), max_length=50, null=True, blank=True)  # For debug purpose

    class Meta:
        app_label = 'services'
        verbose_name = _('ClientService')
        verbose_name_plural = _('ClientServices')

    def __str__(self):
        return f'{self.service_name}'


class ServiceByBuilding(models.Model):
    building = models.ForeignKey("buildings.Building", on_delete=models.CASCADE, related_name="services_by_building")
    client_service = models.ForeignKey(ClientService, on_delete=models.CASCADE, related_name="services_by_building")
    deliveryModel = models.ForeignKey(DeliveryModel, on_delete=models.CASCADE, related_name="services_by_building",
                                      null=True)
    inScope = models.BooleanField(_("In Scope"), default=False)
    baseline_cost = models.DecimalField(_("Baseline Cost"), max_digits=5, decimal_places=2, default=Decimal(0.00))
    pricing_type = models.CharField(_("Pricing Type"), max_length=50, blank=True) # total, rate

    year_1_cost = models.DecimalField(_("Year 1 Cost"), max_digits=5, decimal_places=2, default=Decimal(0.00))
    year_2_cost = models.DecimalField(_("Year 2 Cost"), max_digits=5, decimal_places=2, default=Decimal(0.00))
    year_3_cost = models.DecimalField(_("Year 3 Cost"), max_digits=5, decimal_places=2, default=Decimal(0.00))
    cost_per_sq_ft = models.DecimalField(_("Cost per sq ft"), max_digits=5, decimal_places=2, default=Decimal(0.00))
    currency = models.CharField(_("Currency"), max_length=20, blank=True)
    pricing_source = models.CharField(_("Pricing source"), max_length=255, blank=True)
    supplier_name = models.CharField(_("Supplier Name"), max_length=255, blank=True)

    class Meta:
        app_label = 'services'
        verbose_name = _('ServiceByBuilding')
        verbose_name_plural = _('ServiceByBuildings')
        unique_together = [['client_service', 'building']]

    def __str__(self):
        return f'{self.client_service} - {self.building}'


class JLLEstimate(models.Model):
    service_by_building = models.ForeignKey("services.ServiceByBuilding", on_delete=models.CASCADE,
                                            related_name="estimates")
    estimate = models.DecimalField(_("Estimate"), max_digits=5, decimal_places=2, default=Decimal(0.00))
    notes = models.TextField(_("Notes"), blank=True)

    class Meta:
        app_label = 'services'
        verbose_name = _('JLLEstimate')
        verbose_name_plural = _('JLLEstimates')

class SupplierPrice(models.Model):
    service_by_building = models.ForeignKey("services.ServiceByBuilding", on_delete=models.CASCADE,
                                        related_name="supplier_prices")
    supplier = models.ForeignKey("suppliers.Supplier", on_delete=models.CASCADE,
                                        related_name="servicebybuilding_prices")
    price = models.DecimalField(_("Price"), max_digits=5, decimal_places=2, default=Decimal(0.00))

    class Meta:
        app_label = 'services'
        verbose_name = _('SupplierPrice')
        verbose_name_plural = _('SupplierPrices')