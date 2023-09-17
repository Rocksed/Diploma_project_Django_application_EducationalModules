from django.contrib import admin

from table_spa.models import Table


@admin.register(Table)
class HabitAdmin(admin.ModelAdmin):
    list_display = ['date', 'name', 'quantity', 'distance']
