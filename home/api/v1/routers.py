from rest_framework.routers import SimpleRouter

from home.api.v1.viewsets import (
    SignupViewSet,
    LoginViewSet
)

router = SimpleRouter()
router.register(r"signup", SignupViewSet, basename="signup")
router.register(r"login", LoginViewSet, basename="login")