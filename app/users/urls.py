from django.conf.urls import url, include
from django.views.generic import TemplateView

from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token, verify_jwt_token

from . import views
from app.views import IndexView

api_urlpatterns = [
    url(r'^login', obtain_jwt_token, name='users-api-login'),
    url(r'^token-refresh', refresh_jwt_token, name='users-api-token_refresh'),
    url(r'^token-verify', verify_jwt_token, name='users-api-token-verify'),
    url(r'^register$', views.RegistrationView.as_view(), name='users-api-register'),
    url(r'^me$', views.UserView.as_view(), name='users-api-me'),
    url(r'^activate$', views.ActivationView.as_view(), name='users-api-activate'),
    url(r'^password/reset$', views.PasswordResetView.as_view(), name='users-api-password-reset'),
    url(r'^password/reset/confirm$',
        views.PasswordResetConfirmView.as_view(),
        name='users-api-password-reset-confirm'),
]

urlpatterns = [
    url(r'^login$', IndexView.as_view(), name='users-login'),
    url(r'^register$', IndexView.as_view(), name='users-register'),
    url(r'^activate/(?P<uid>[\w.-]+)/(?P<token>[\w.-]+)',
        TemplateView.as_view(template_name='users/activate.html'), name='users-activate'),
    url(r'^password/reset/confirm/(?P<uid>[\w.-]+)/(?P<token>[\w.-]+)',
        TemplateView.as_view(template_name='users/password_reset.html'), name='users-password-reset'),
    url(r'^api/(?P<version>v[0-9]+)/', include(api_urlpatterns)),
]
