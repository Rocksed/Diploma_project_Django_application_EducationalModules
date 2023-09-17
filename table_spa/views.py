from rest_framework import generics
from table_spa.models import Table
from table_spa.serializers import TableSerializers


class TableListCreateView(generics.ListCreateAPIView):
    """
    API view для списка и создания объектов Table.

    При GET-запросе возвращает список всех объектов Table.
    При POST-запросе создает новый объект Table.

    Атрибуты:
        - queryset: Запрос к базе данных для получения объектов Table.
        - serializer_class: Сериализатор для преобразования данных.
    """
    queryset = Table.objects.all()
    serializer_class = TableSerializers
