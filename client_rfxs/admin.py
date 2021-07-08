from django.contrib import admin
from .models import ClientRfx, ClientRfxSchedule, ClientRfxTeam

class ClientRfxAdmin(admin.ModelAdmin):
    pass

class ClientRfxScheduleAdmin(admin.ModelAdmin):
    pass

class ClientRfxTeamAdmin(admin.ModelAdmin):
    pass

admin.site.register(ClientRfx, ClientRfxAdmin)
admin.site.register(ClientRfxSchedule, ClientRfxScheduleAdmin)
admin.site.register(ClientRfxTeam, ClientRfxTeamAdmin)