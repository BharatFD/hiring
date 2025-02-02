import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from .models import FAQ

@pytest.mark.django_db
def test_faq_creation_and_translation():
    # Create a FAQ without providing translations.
    faq = FAQ.objects.create(
        question="What is your name?",
        answer="<p>My name is FAQ Bot.</p>"
    )
    # The save() method should auto-populate the translation fields.
    assert faq.question_hi is not None
    assert faq.question_bn is not None
    assert faq.answer_hi is not None
    assert faq.answer_bn is not None

@pytest.mark.django_db
def test_api_faq_list():
    client = APIClient()
    # Create a FAQ entry.
    FAQ.objects.create(
        question="How are you?",
        answer="<p>I am fine.</p>"
    )
    url = reverse('faq-list-create')
    response = client.get(url, {'lang': 'hi'})
    assert response.status_code == 200
    data = response.json()
    assert len(data) > 0
    # Check that the returned question is in Hindi if translation succeeded.
    # (In a real test you might compare against expected output.)
    assert data[0]['question'] != "How are you?"
