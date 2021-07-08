from rest_framework.routers import SimpleRouter

from .viewsets import (ClientRfxViewSet, ClientRfxScheduleViewSet, ClientRfxTeamViewSet, ClientRfxBuildingViewSet)

router = SimpleRouter()
router.register(r"client_rfxs", ClientRfxViewSet, basename="client_rfxs")
router.register(r"client_rfxs/(?P<client_rfx_id>\d+)/dates", ClientRfxScheduleViewSet, basename="client_rfx-dates")
router.register(r"client_rfxs/(?P<client_rfx_id>\d+)/team", ClientRfxTeamViewSet, basename="client_rfx-team")
router.register(r"client/building", ClientRfxBuildingViewSet, basename='client_buildings')
router.register(r"client_rfxs/(?P<client_id>\d+)/buildings", ClientRfxBuildingViewSet, basename='client_buildings')