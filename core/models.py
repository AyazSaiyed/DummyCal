from django.db import models


class CommonMeta(models.Model):
    class Meta:
        abstract = True

    def __str__(self):
        return f'{self.name}'
