from django.urls import path

from table_spa.apps import TableSpaConfig
from table_spa.views import TableListCreateView

app_name = TableSpaConfig.name

urlpatterns = [
    path('api/table/', TableListCreateView.as_view(), name='table-list-create')
]
