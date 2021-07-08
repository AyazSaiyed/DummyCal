from django.db import models
from django.contrib.postgres.fields import JSONField
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
import datetime
from django.conf import settings
import secrets
# Create your models here.

class Webhook(models.Model):
    RFX_UPLOAD = "RFX_UPLOAD_FLATFILE"
    BUILDING_INFO_UPLOAD_FLATFILE = "BUILDING_INFO_UPLOAD_FLATFILE"
    SERVICE_UPLOAD_FLATFILE = "SERVICE_UPLOAD_FLATFILE"
    type = models.CharField(_("Webhook Type"), max_length=50)
    token = models.CharField(_("Webhook Token"), max_length=255, default=secrets.token_urlsafe)
    metadata = JSONField(null=True, blank=True)
    date_created = models.DateTimeField(verbose_name=_('Date Created'),
                                   auto_now_add=True)

    def key_expired(self):
        expiration_date = (
            self.date_created + datetime.timedelta(
                days=settings.WEBHOOK_EXPIRY))
        return expiration_date <= timezone.now()

    class Meta:
        app_label = 'webhooks'
        verbose_name = _('Webhook')
        verbose_name_plural = _('Webhooks')