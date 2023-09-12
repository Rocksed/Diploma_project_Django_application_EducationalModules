from rest_framework import serializers

from table_spa.models import Table


class TableSerializers(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = '__all__'
