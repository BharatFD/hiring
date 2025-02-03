#!/bin/bash

# Define the README content
cat <<EOL > README.md
# MAQ Model Design - FAQ System

## Overview
This project implements an FAQ system with multilingual support using Django and Google Translate.

## Features
- Stores FAQs with **questions and answers**.
- Supports **multiple languages** (Hindi, Bengali, etc.).
- Uses **Google Translate API** (`googletrans`) for automatic translations.
- Includes **Django Admin Panel** for easy management.

## Installation

### 1. Install Dependencies
Run the following command to install the required packages:
\`\`\`bash
pip install django googletrans==4.0.0-rc1
\`\`\`
*(Optional: Install CKEditor for rich text editing)*
\`\`\`bash
pip install django-ckeditor
\`\`\`

### 2. Setup Django Project
Run the following commands to create and set up the project:
\`\`\`bash
django-admin startproject faq_project
cd faq_project
python manage.py startapp faq
\`\`\`

### 3. Database Migrations
\`\`\`bash
python manage.py makemigrations
python manage.py migrate
\`\`\`

## Model Design

### `models.py`
\`\`\`python
from django.db import models
from googletrans import Translator

class FAQ(models.Model):
    question = models.TextField("Question")
    answer = models.TextField("Answer")  # Use RichTextField if using CKEditor

    # Translated fields
    question_hi = models.TextField("Question in Hindi", blank=True, null=True)
    question_bn = models.TextField("Question in Bengali", blank=True, null=True)

    def save(self, *args, **kwargs):
        """Automatically translates the question before saving."""
        translator = Translator()
        if not self.question_hi:
            self.question_hi = translator.translate(self.question, dest="hi").text
        if not self.question_bn:
            self.question_bn = translator.translate(self.question, dest="bn").text
        super().save(*args, **kwargs)

    def __str__(self):
        return self.question
\`\`\`

## Admin Configuration

### `admin.py`
\`\`\`python
from django.contrib import admin
from .models import FAQ

@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "question_hi", "question_bn")
    search_fields = ("question", "question_hi", "question_bn")
\`\`\`

## Running the Project

### 1. Start the Django Development Server
\`\`\`bash
python manage.py runserver
\`\`\`

### 2. Access the Admin Panel
- Create a superuser:
  \`\`\`bash
  python manage.py createsuperuser
  \`\`\`
- Visit: [http://127.0.0.1:8000/admin](http://127.0.0.1:8000/admin)

## Testing FAQ Translations
Use Django shell:
\`\`\`bash
python manage.py shell
\`\`\`
\`\`\`python
from faq.models import FAQ
faq = FAQ.objects.create(question="What is Django?", answer="Django is a web framework.")
print(faq.question_hi)  # Output: "Django क्या है?"
print(faq.question_bn)  # Output: "Django কি?"
\`\`\`

## Notes
- `googletrans` **does not require an API key**.
- If `googletrans` stops working, consider using **Google Cloud Translate API**.

## Author
Developed by **Venkatesh Megavath** 🚀

EOL

# Make README.md executable
chmod +x README.md

echo "README.md has been generated successfully!"
