from config.settings.base import *  # NOQA (ignore all errors on this line)

# DEBUG
# ------------------------------------------------------------------------------
DEBUG = env.bool('DJANGO_DEBUG', default=True)
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG

# CACHING
# ------------------------------------------------------------------------------
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        'LOCATION': ''
    }
}

ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOSTS', default=['*'])

INTERNAL_IPS = ('127.0.0.1', '10.0.2.2',)

# django-extensions
# ------------------------------------------------------------------------------
INSTALLED_APPS += ('django_extensions', )

# Mail
EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

TEST_RUNNER = 'django.test.runner.DiscoverRunner'

READ_DOT_ENV_FILE = env('DJANGO_READ_DOT_ENV_FILE', default=True)
