from django.test import TestCase

from table_spa.models import Table
from datetime import date

from table_spa.serializers import TableSerializers


class TableTests(TestCase):
    def setUp(self):
        # Создаем тестовые записи в базе данных
        Table.objects.create(date=date.today(), name='Test Item 1', quantity=10, distance=50.5)
        Table.objects.create(date=date.today(), name='Test Item 2', quantity=5, distance=30.0)

    def test_table_entries_created(self):
        # Проверяем, что записи созданы корректно
        item_1 = Table.objects.get(name='Test Item 1')
        item_2 = Table.objects.get(name='Test Item 2')
        self.assertEqual(item_1.quantity, 10)
        self.assertEqual(item_2.distance, 30.0)

    def test_table_entries_count(self):
        # Проверяем, что количество записей считается верно
        count = Table.objects.count()
        self.assertEqual(count, 2)


class TableSerializersTests(TestCase):
    def setUp(self):
        # Подготавливаем данные и сериализатор для тестов
        self.item_data = {'date': '2023-09-05', 'name': 'Test Item', 'quantity': 5, 'distance': 30.0}
        self.serializer = TableSerializers(data=self.item_data)

    def test_serializer_valid(self):
        # Проверяем, что сериализатор считает данные валидными
        self.assertTrue(self.serializer.is_valid())

    def test_serializer_invalid(self):
        # Проверяем, что сериализатор считает невалидные данные невалидными
        invalid_item_data = {'date': '2023-09-05', 'quantity': 5, 'distance': 30.0}
        serializer = TableSerializers(data=invalid_item_data)
        self.assertFalse(serializer.is_valid())

    def test_serializer_save(self):
        # Проверяем, что данные можно успешно сохранить с использованием сериализатора
        self.assertTrue(self.serializer.is_valid())
        item = self.serializer.save()
        self.assertEqual(item.name, 'Test Item')
