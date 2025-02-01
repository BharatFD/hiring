from django.db import models
from ckeditor.fields import RichTextField
from googletrans import Translator
from django.core.cache import cache

# Initialize the translator (note: googletrans may be unstable in production)
translator = Translator()

class FAQ(models.Model):
    question = models.TextField()
    answer = RichTextField()

    # Language-specific fields
    question_hi = models.TextField(blank=True, null=True)
    answer_hi = RichTextField(blank=True, null=True)

    question_bn = models.TextField(blank=True, null=True)
    answer_bn = RichTextField(blank=True, null=True)

    def get_translated_question(self, lang='en'):
        if lang == 'hi' and self.question_hi:
            return self.question_hi
        elif lang == 'bn' and self.question_bn:
            return self.question_bn
        else:
            return self.question

    def get_translated_answer(self, lang='en'):
        if lang == 'hi' and self.answer_hi:
            return self.answer_hi
        elif lang == 'bn' and self.answer_bn:
            return self.answer_bn
        else:
            return self.answer

    def translate_fields(self):
        """
        Automatically translates the question and answer to Hindi and Bengali
        if the respective translation fields are empty.
        """
        if not self.question_hi:
            try:
                translation_hi = translator.translate(self.question, dest='hi')
                self.question_hi = translation_hi.text
            except Exception:
                self.question_hi = self.question  # fallback to default

        if not self.question_bn:
            try:
                translation_bn = translator.translate(self.question, dest='bn')
                self.question_bn = translation_bn.text
            except Exception:
                self.question_bn = self.question

        if not self.answer_hi:
            try:
                translation_hi_ans = translator.translate(self.answer, dest='hi')
                self.answer_hi = translation_hi_ans.text
            except Exception:
                self.answer_hi = self.answer

        if not self.answer_bn:
            try:
                translation_bn_ans = translator.translate(self.answer, dest='bn')
                self.answer_bn = translation_bn_ans.text
            except Exception:
                self.answer_bn = self.answer

    def save(self, *args, **kwargs):
        # Auto-translate if translations are empty.
        self.translate_fields()
        super().save(*args, **kwargs)
        # Invalidate any cached data for this FAQ.
        cache.delete(f'faq_{self.pk}')

    def __str__(self):
        return self.question
