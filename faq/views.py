from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from .models import FAQ
from rest_framework.views import APIView
from .serializers import FAQSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework.generics import ListAPIView

class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    def get(self, request, *args, **kwargs):
        lang_code = request.GET.get("lang", "en")  # Get language from query param
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True, context={"lang_code": lang_code})
        return Response(serializer.data)

class FAQListAPIView(APIView):
    def get(self, request):
        lang = request.GET.get("lang", "en")  # Default to English
        faqs = FAQ.objects.all()
        
        # Modify response based on language selection
        for faq in faqs:
            if lang != "en":
                translated_question = getattr(faq, f"question_{lang}", faq.question)
                faq.question = translated_question  # Override for response
        
        serializer = FAQSerializer(faqs, many=True)
        return Response(serializer.data)

class FAQDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            faq = FAQ.objects.get(pk=pk)
        except FAQ.DoesNotExist:
            return Response({"error": "FAQ not found"}, status=404)

        lang = request.GET.get("lang", "en")
        if lang != "en":
            faq.question = getattr(faq, f"question_{lang}", faq.question)

        serializer = FAQSerializer(faq)
        return Response(serializer.data)
    
    
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')

        if category:
            queryset = queryset.filter(category__icontains=category)
        if search:
            queryset = queryset.filter(question__icontains=search)

        return queryset
    
    
class FAQListAPIView(ListAPIView):
    """
    API to retrieve all FAQs.
    """
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    @swagger_auto_schema(
        operation_description="Get a list of all FAQs",
        responses={200: FAQSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)
    class FAQListCreateView(generics.ListCreateAPIView):
        queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

class FAQRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


