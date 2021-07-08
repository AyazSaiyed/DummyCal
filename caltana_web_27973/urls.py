"""caltana_web_27973 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.views.generic import TemplateView
from django.contrib import admin
from django.urls import path, include
# from django.views.generic.base import TemplateView
from allauth.account.views import confirm_email
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .routers import router_urlpatterns
from home.api.v1.viewsets import LogoutView



urlpatterns = [

    path("accounts/", include("allauth.urls")),
    path("modules/", include("modules.urls")),
    path("api/v1/", include(router_urlpatterns)),
    path("api/v1/logout/", LogoutView.as_view()),
    path("api/v1/reset_password/", include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('api/v1/', include([
        path("", include("services.api.v1.urls")),
    ])),
    path("admin/", admin.site.urls),
    path("users/", include("users.urls", namespace="users")),
    path("rest-auth/", include("rest_auth.urls")),
    # Override email confirm to use allauth's HTML view instead of rest_auth's API view
    path("rest-auth/registration/account-confirm-email/<str:key>/", confirm_email),
    path("rest-auth/registration/", include("rest_auth.registration.urls")),
    path("webhooks/", include("webhooks.urls")),
    path("", TemplateView.as_view(template_name='index.html')),
    path("products", TemplateView.as_view(template_name='products.html')),
    path("solutions", TemplateView.as_view(template_name='solutions.html')),
    path("customers", TemplateView.as_view(template_name='customers.html')),
    path("about", TemplateView.as_view(template_name='about.html')),
    path("auth/login", TemplateView.as_view(template_name='auth/login.html')),
    path("auth/signup", TemplateView.as_view(template_name='auth/signup.html')),
    path("auth/confirm", TemplateView.as_view(template_name='auth/confirm.html')),
    path("auth/reset", TemplateView.as_view(template_name='auth/reset.html')),
    path("pursuits/dashboard", TemplateView.as_view(template_name='pursuits/dashboard.html')),
    path("pursuits/new", TemplateView.as_view(template_name='pursuits/new.html')),
]

admin.site.site_header = "caltana_web"
admin.site.site_title = "caltana_web Admin Portal"
admin.site.index_title = "caltana_web Admin"

# swagger
api_info = openapi.Info(
    title="caltana_web API",
    default_version="v1",
    description="API documentation for caltana_web App",
)

schema_view = get_schema_view(
    api_info,
    public=True,
    permission_classes=(permissions.IsAuthenticated,),
)

urlpatterns += [
    path("api-docs/", schema_view.with_ui("swagger", cache_timeout=0), name="api_docs")
]

