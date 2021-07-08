from django.urls import path
from .views import FlatFileWebhook

urlpatterns = [
    path('flatfile', FlatFileWebhook.as_view(), name='flatfile-webhook'),
]