# faq/serializers.py

from rest_framework import serializers
from .models import FAQ

class FAQSerializer(serializers.ModelSerializer):
    translated_question = serializers.SerializerMethodField()

    class Meta:
        model = FAQ
        fields = ["id", "question", "answer", "translated_question"]

    def get_translated_question(self, obj):
        lang_code = self.context.get("lang_code", "en")
        return obj.get_translated_question(lang_code)
