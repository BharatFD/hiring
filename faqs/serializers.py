from rest_framework import serializers
from .models import FAQ

class FAQSerializer(serializers.ModelSerializer):
    # Use SerializerMethodField to return the translation dynamically
    question = serializers.SerializerMethodField()
    answer = serializers.SerializerMethodField()

    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer']

    def get_question(self, obj):
        request = self.context.get('request')
        lang = request.query_params.get('lang', 'en') if request else 'en'
        return obj.get_translated_question(lang)

    def get_answer(self, obj):
        request = self.context.get('request')
        lang = request.query_params.get('lang', 'en') if request else 'en'
        return obj.get_translated_answer(lang)
