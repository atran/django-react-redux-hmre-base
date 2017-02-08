from django.conf.urls import include, url
from django.contrib import admin

from .views import ProtectedDataView, IndexView

urlpatterns = [
    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/getdata/', ProtectedDataView.as_view(), name='protected_data'),
    url(r'^admin/', admin.site.urls),

    url(r'', IndexView.as_view(), name='index'),
]
