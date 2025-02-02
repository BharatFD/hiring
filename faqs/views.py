from rest_framework import generics
from rest_framework.response import Response
from .models import FAQ
from .serializers import FAQSerializer
from django.core.cache import cache

class FAQListCreateAPIView(generics.ListCreateAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    def list(self, request, *args, **kwargs):
        lang = request.query_params.get('lang', 'en')
        cache_key = f'faqs_list_{lang}'
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)
        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, 60)  # Cache for 60 seconds
        return response

class FAQRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    def retrieve(self, request, *args, **kwargs):
        lang = request.query_params.get('lang', 'en')
        pk = self.kwargs.get('pk')
        cache_key = f'faq_{pk}_{lang}'
        cached_data = cache.get(cache_key)
        if cached_data:
            return Response(cached_data)
        response = super().retrieve(request, *args, **kwargs)
        cache.set(cache_key, response.data, 60)
        return response
