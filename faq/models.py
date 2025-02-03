from django.db import models
from ckeditor.fields import RichTextField  
from googletrans import Translator  # Ensure you have googletrans installed

class FAQ(models.Model):
    question = models.CharField(max_length=200)
    answer = RichTextField()  
    language = models.CharField(
        max_length=50, choices=[('EN', 'English'), ('FR', 'French')], default='EN'
    )  # ✅ Add language field
    created_at = models.DateTimeField(auto_now_add=True)  # ✅ Add created_at field
    
    # Translations
    question_hi = models.TextField(blank=True, null=True)
    question_bn = models.TextField(blank=True, null=True)

    def get_translated_question(self, lang_code):
        """
        Returns the translated question based on language code.
        Defaults to English if translation is not available.
        """
        return getattr(self, f"question_{lang_code}", self.question)

    def save(self, *args, **kwargs):
        # If the question or answer is not provided in the current language, translate them
        if self.language != 'EN':
            self.translate_to_default_language()
        super().save(*args, **kwargs)

    def translate_to_default_language(self):
        translator = Translator()
        self.question = translator.translate(self.question, src=self.language, dest='en').text
        self.answer = translator.translate(self.answer, src=self.language, dest='en').text

    def __str__(self):
        return self.question
