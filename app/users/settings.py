from django.core.exceptions import ImproperlyConfigured


settings = {
    'ACTIVATION_URL': 'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL': True,
    'SEND_CONFIRMATION_EMAIL': True,
    'SET_PASSWORD_RETYPE': False,
    'SET_USERNAME_RETYPE': False,
    'PASSWORD_RESET_CONFIRM_URL': 'password/reset/confirm/{uid}/{token}',
    'PASSWORD_RESET_CONFIRM_RETYPE': True,
    'PASSWORD_RESET_SHOW_EMAIL_NOT_FOUND': False,
    'ROOT_VIEW_URLS_MAPPING': {},
    'PASSWORD_VALIDATORS': [],
}


def get(key):
    try:
        return settings[key]
    except KeyError:
        raise ImproperlyConfigured('Missing settings: {}'.format(key))
