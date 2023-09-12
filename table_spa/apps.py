from django.apps import AppConfig
from django.db.utils import ProgrammingError


class TableSpaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'table_spa'

    def ready(self):
        from django.core.management import call_command

        try:
            call_command('db')
        except ProgrammingError:
            pass
