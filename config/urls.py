from __future__ import unicode_literals

from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings

from rest_framework import routers

from app.views import IndexView

router = routers.DefaultRouter(trailing_slash=False)

urlpatterns = [
    url(settings.ADMIN_URL, admin.site.urls),
    url(r'^api/(?P<version>v[0-9]+)/', include(router.urls)),
    url(r'', include('app.users.urls', namespace='users')),
    url(r'^.*$', IndexView.as_view(), name='page-index'),
]

if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
