from rest_framework.pagination import PageNumberPagination

class CustomPaginationForChats(PageNumberPagination):
    page_size = 20
    max_page_size = 100

class CustomPaginationForUsers(PageNumberPagination):
    page_size = 50
    max_page_size = 50