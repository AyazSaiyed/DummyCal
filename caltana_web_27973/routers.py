from home.api.v1.routers import router as home_router
from client_rfxs.api.v1.routers import router as client_rfx_router
from clients.api.v1.routers import router as client_router
from suppliers.api.v1.routers import router as supplier_router
from webhooks.api.v1.routers import router as webhook_router
from buildings.api.v1.routers import router as building_router

router_urlpatterns = []
router_urlpatterns += home_router.urls
router_urlpatterns += client_rfx_router.urls
router_urlpatterns += client_router.urls
router_urlpatterns += supplier_router.urls
router_urlpatterns += webhook_router.urls
router_urlpatterns += building_router.urls