from django.db import models
from django.utils.translation import gettext_lazy as _
from core.models import CommonMeta

class Industry(CommonMeta):
    name = models.CharField(_("Client Industry"), max_length=255)
    # Client Profile

    class Meta:
        app_label = 'clients'
        verbose_name = _('Industry')
        verbose_name_plural = _('Industries')

class Client(CommonMeta):
    name = models.CharField(_("Name"), max_length=255)
    industry = models.ForeignKey(
        Industry, 
        null=True, blank=True,
        verbose_name=_("Industry"),
        on_delete=models.SET_NULL,
        related_name='clients'
    )

    class Meta:
        app_label = 'clients'
        verbose_name = _('Client')
        verbose_name_plural = _('Clients')