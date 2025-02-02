# faq/urls.py

from django.urls import path
from .views import FAQListView
from .views import FAQListAPIView, FAQDetailAPIView
urlpatterns = [
    path("faqs/", FAQListView.as_view(), name="faq-list"),
     path("api/faqs/", FAQListAPIView.as_view(), name="faq-list"),
    path("api/faqs/<int:pk>/", FAQDetailAPIView.as_view(), name="faq-detail"),
]
