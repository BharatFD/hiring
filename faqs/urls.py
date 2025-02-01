from django.urls import path
from .views import FAQListCreateAPIView, FAQRetrieveUpdateDestroyAPIView

urlpatterns = [
    path('faqs/', FAQListCreateAPIView.as_view(), name='faq-list-create'),
    path('faqs/<int:pk>/', FAQRetrieveUpdateDestroyAPIView.as_view(), name='faq-detail'),
]
