from rest_framework import generics

from table_spa.models import Table
from table_spa.serializers import TableSerializers


class TableListCreateView(generics.ListCreateAPIView):
    queryset = Table.objects.all()
    serializer_class = TableSerializers
