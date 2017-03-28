from django.views.generic import TemplateView
from meta.views import MetadataMixin

class IndexView(MetadataMixin, TemplateView):
    title = 'Home'
    description = 'Homepage decsription'
    image = 'img/some_page_thumb.jpg'
    url = 'some/page/'
    template_name = 'pages/index.html'
