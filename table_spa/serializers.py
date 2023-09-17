from rest_framework import serializers
from table_spa.models import Table


class TableSerializers(serializers.ModelSerializer):
    """
    Сериализатор для модели Table.

    Определяет как поля модели будут преобразованы в JSON-формат.

    Атрибуты:
        - model: Модель, которая будет сериализована.
        - fields: Список полей, которые будут включены в сериализацию.

    """

    class Meta:
        model = Table
        fields = '__all__'
