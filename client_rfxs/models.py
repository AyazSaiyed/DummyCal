from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.postgres.fields import JSONField


# Create your models here for RFX Profile.
class ClientRfx(models.Model):
    generation_of_outsourcing = models.CharField(_("Generation of Outsourcing"), max_length=255, blank=True)
    # region = models.CharField(_("Region"), max_length=255, blank=True)
    region = JSONField(_("Region"), blank=True)
    lead_region = models.CharField(_("Lead Region"), max_length=255, blank=True)
    type = models.CharField(_("ClientRfx Type"), max_length=50, blank=True)
    contract_term = models.CharField(_("Contract term"), max_length=255, blank=True)
    submittal_phase = models.CharField(_("Submittal phase"), max_length=255, blank=True)
    commercial_model = models.CharField(_("Commercial model"), max_length=255, blank=True)
    settings = JSONField(_("Settings"), null=True)

    # total_square_footage = models.CharField(_("Total Square Footage"), max_length=255, blank=True)
    # total_headcount = models.CharField(_("Total Headcount"), max_length=255, blank=True)
    # competitors = models.CharField(_("Competitors"), max_length=255, blank=True)
    client = models.ForeignKey(
        "clients.Client",
        on_delete=models.CASCADE,
        related_name='client_rfx'
    )
    status = models.CharField(_("Client status"), max_length=10, blank=True)
    next_milestone = models.CharField(_("Next Milestone"), max_length=50, blank=True)
    date_created = models.DateTimeField(_("Date Created"), auto_now_add=True)
    date_updated = models.DateTimeField(_("Date updated"), auto_now=True, db_index=True)

    note_created = models.CharField(_("Note Created"), max_length=50, null=True, blank=True)  # For debug purpose

    class Meta:
        app_label = 'client_rfxs'
        verbose_name = _('ClientRfx')
        verbose_name_plural = _('ClientRfxs')

    def __str__(self):
        return f'{self.client} - {self.date_created.year}'


class ClientRfxSchedule(models.Model):
    name = models.CharField(_("Name"), max_length=255)
    client_rfx = models.ForeignKey(
        ClientRfx,
        on_delete=models.CASCADE,
        related_name='dates'
    )
    date = models.DateTimeField(_("Date"), null=False, blank=False)
    activity = models.CharField(_("Activity"), max_length=255, blank=True)
    notes = models.TextField(_('Note'), null=True, blank=True)
    isDueDate = models.BooleanField(_("Due Date"), default=False)

    # Field 6

    class Meta:
        app_label = 'client_rfxs'
        verbose_name = _('ClientRfxSchedule')
        verbose_name_plural = _('ClientRfxSchedules')


class ClientRfxTeam(models.Model):
    name = models.CharField(_("Name"), max_length=255)
    role = models.CharField(_("Role"), max_length=50, blank=True, )
    person = models.CharField(_("Person"), max_length=255, null=True, blank=True)
    region = models.CharField(_("Region"), max_length=255, null=True, blank=True)
    client_rfx = models.ForeignKey(
        ClientRfx,
        on_delete=models.CASCADE,
        related_name='team'
    )

    class Meta:
        app_label = 'client_rfxs'
        verbose_name = _('ClientRfxTeam')
        verbose_name_plural = _('ClientRfxTeams')
