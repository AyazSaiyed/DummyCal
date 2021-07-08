from django.db import models
from django.utils.translation import gettext_lazy as _
from core.models import CommonMeta

# Create your models here.
class Supplier(CommonMeta):
    name = models.CharField(_("Name"), max_length=255)
    notes = models.TextField(_('Note'), null=True, blank=True)
    # client_rfxs = models.ManyToManyField('client_rfxs.ClientRfx')
    # services
    # rfxs

    class Meta:
        app_label = 'suppliers'
        verbose_name = _('Supplier')
        verbose_name_plural = _('Suppliers')

class Question(CommonMeta):
    name = models.CharField(_("Name"), max_length=255)
    question = models.TextField(_("Question"))
    status = models.CharField(_("Status"), max_length=20)
    # service & building
    service_by_building = models.ForeignKey("services.ServiceByBuilding", 
        on_delete=models.CASCADE, 
        related_name="supplier_questions")

    class Meta:
        app_label = 'question'
        verbose_name = _('Question')
        verbose_name_plural = _('Questions')