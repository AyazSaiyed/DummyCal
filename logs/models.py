from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.postgres.fields import JSONField
from django.conf import settings

# Create your models here.
class Log(models.Model):
    name = models.CharField(_("Log name"), max_length=255, blank=True)
    detail = models.TextField(_("Detail"), blank=True)
    date_created = models.DateTimeField(_("Date Created"), auto_now_add=True)
    metadata = JSONField(_("Meta Data"), blank=True)

    @classmethod
    def dev_logging(cls, name, detail, metadata={}):
        if settings.DEV_DB_LOGGING:
            cls.objects.create(name=name, detail=detail, metadata=metadata)

    class Meta:
        app_label = 'logs'
        verbose_name = _('Log')
        verbose_name_plural = _('Logs')