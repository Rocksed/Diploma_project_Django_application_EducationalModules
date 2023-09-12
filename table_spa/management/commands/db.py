from django.core.management.base import BaseCommand
from faker import Faker
from table_spa.models import Table


class Command(BaseCommand):
    help = 'Populate database with random data'

    def handle(self, *args, **kwargs):
        fake = Faker()

        for _ in range(10):  # Нужное количество записей
            data = {
                'date': fake.date_this_year(),
                'name': fake.name(),
                'quantity': fake.random_int(min=1, max=100),
                'distance': fake.random_int(min=1, max=1000),
            }
            Table.objects.create(**data)
