from rest_framework.pagination import PageNumberPagination


class MyPagination(PageNumberPagination):
    page_size = 50  # Количество элементов на странице