# Hiring Test for Backend Developers
- NOTE : You can use NodeJs/Python/ (Django/ExpressJS or any other framework of your choice as well)

## **Objective**
The objective of this test is to evaluate the candidate’s ability to:
- Design and implement Django models with **WYSIWYG editor support**.
- Store and manage **FAQs with multi-language translation**.
- Follow **PEP8 conventions** and best practices.
- Write a **clear and detailed README**.
- Use **proper Git commit messages**.

---

## **Task Requirements**

### **1. Model Design**
- Create a model to store **FAQs**.
- Each FAQ should have:
  - A **question** (TextField)
  - An **answer** (RichTextField for WYSIWYG editor support)
  - Language-specific translations (`question_hi`, `question_bn`, etc.).
- Implement a **model method** to retrieve translated text dynamically.

### **2. WYSIWYG Editor Integration**
- Use **django-ckeditor** to allow users to format answers properly.
- Ensure that the WYSIWYG editor supports **multilingual content**.

### **3. API Development**
- Create a ** REST API** for managing FAQs.
- Support **language selection** via `?lang=` query parameter.
- Ensure responses are **fast and efficient** using pre-translation.

### **4. Caching Mechanism**
- Implement ** cache framework** to store translations.
- Use **Redis** for improved performance.

### **5. Multi-language Translation Support**
- Use **Google Translate API** or `googletrans`.
- Automate translations during object creation.
- Provide **fallback to English** if translation is unavailable.

### **6.  Admin Panel**
- Register the **FAQ model** in the  Admin site or create one seperately.
- Enable a **user-friendly admin interface** for managing FAQs.

### **7. Unit Tests & Code Quality**
- Write **unit tests** using `pytest` or `mocha`/`chai`.
- Ensure tests cover **model methods and API responses**.
- Follow **PEP8/ES6 guidelines** and use `flake8/JS tools` for linting.

### **8. Documentation**
- Write a **detailed README** with:
  - Installation steps
  - API usage examples
  - Contribution guidelines
- Ensure the **README is well-structured and easy to follow**.

### **9. Git & Version Control**
- Use **Git for version control**.
- Follow **conventional commit messages**:
  - `feat: Add multilingual FAQ model`
  - `fix: Improve translation caching`
  - `docs: Update README with API examples`
- Ensure **atomic commits** with clear commit messages.

### **10. Deployment & Docker Support (Bonus)**
- Provide a **Dockerfile** and **docker-compose.yml**.
- Deploy the application to **Heroku** or **AWS** (optional).

---

## **Evaluation Criteria**
Candidates will be evaluated based on:
1. **Code Quality** (PEP8 compliance, readability, and modularity).
2. **Functionality** (API correctness, multilingual support, and caching efficiency).
3. **Documentation** (README completeness and clarity).
4. **Testing** (Coverage and effectiveness of unit tests).
5. **Git Best Practices** (Commit messages and branching strategy).

---

## **Submission Instructions**
- **Attempt the assignment** and complete your solution.
- **Open an issue** in our repository with the relevant tag (`backend` or `frontend`, depending on the test you're applying for).
- **Once done, tag @theakshaydhiman** in the issue, and we will review your code.
- **Include the link to your GitHub repository**, which must be **publicly accessible**.

---
## **Example API Usage**
```bash
# Fetch FAQs in English (default)
curl http://localhost:8000/api/faqs/

# Fetch FAQs in Hindi
curl http://localhost:8000/api/faqs/?lang=hi

# Fetch FAQs in Bengali
curl http://localhost:8000/api/faqs/?lang=bn
```

---

This test ensures the candidate demonstrates **full-stack Django development skills**, covering **models, APIs, caching, internationalization, and documentation**. 🚀

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.core.cache import cache
from ckeditor.fields import RichTextField
from googletrans import Translator

translator = Translator()

class FAQ(models.Model):
    question = models.TextField(_('Question'))
    answer = RichTextField(_('Answer'))
    question_hi = models.TextField(_('Question in Hindi'), blank=True, null=True)
    question_bn = models.TextField(_('Question in Bengali'), blank=True, null=True)

    def save(self, *args, **kwargs):
        if not self.question_hi:
            self.question_hi = translator.translate(self.question, dest='hi').text
        if not self.question_bn:
            self.question_bn = translator.translate(self.question, dest='bn').text
        super().save(*args, **kwargs)

    def get_translated_question(self, lang):
        cache_key = f'faq_{self.id}_question_{lang}'
        cached_translation = cache.get(cache_key)
        if cached_translation:
            return cached_translation
        
        translated_text = getattr(self, f'question_{lang}', self.question)
        cache.set(cache_key, translated_text, timeout=86400)
        return translated_text

    def __str__(self):
        return self.question

from rest_framework import serializers, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

class FAQSerializer(serializers.ModelSerializer):
    translated_question = serializers.SerializerMethodField()
    
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'translated_question', 'answer']
    
    def get_translated_question(self, obj):
        request = self.context.get('request')
        lang = request.GET.get('lang', 'en')
        return obj.get_translated_question(lang)

class FAQViewSet(viewsets.ModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

    @action(detail=False, methods=['get'])
    def by_language(self, request):
        lang = request.GET.get('lang', 'en')
        faqs = FAQ.objects.all()
        data = [
            {
                'id': faq.id,
                'translated_question': faq.get_translated_question(lang),
                'answer': faq.answer
            }
            for faq in faqs
        ]
        return Response(data)

# settings.py configuration
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'ckeditor',
    'faq',  # Assuming app name
]

# Redis Caching
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}


