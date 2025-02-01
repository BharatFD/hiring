# FAQ Project

This project is a Django-based FAQ management system that supports multi-language translations, rich text editing with CKEditor, and caching with Redis for improved performance. A REST API built with Django REST Framework allows for CRUD operations and language-specific data retrieval.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Usage](#api-usage)
- [Running Tests](#running-tests)
- [Contribution Guidelines](#contribution-guidelines)
- [License](#license)

## Features

- **CRUD Operations:** Create, retrieve, update, and delete FAQs.
- **Automatic Translation:** FAQs are automatically translated to Hindi (`hi`) and Bengali (`bn`) using the googletrans API upon creation.
- **Rich Text Editing:** The answer field utilizes CKEditor for a WYSIWYG editing experience.
- **REST API:** Endpoints support language selection via a query parameter (e.g., `?lang=hi`).
- **Redis Caching:** API responses are cached using Redis to improve performance.
- **Admin Panel:** Manage FAQs using Django's built-in admin interface.

## Prerequisites

Before running the project, ensure you have the following installed:

- **Python 3.8+**
- **pip** (Python package installer)
- **Virtualenv** (optional but recommended)
- **Redis Server**  
  - For Ubuntu/Debian: `sudo apt-get install redis-server`
  - For macOS: `brew install redis`
  - For Windows: Use a Redis installer or run via Docker

## Installation

Follow these steps to install and set up the project:

1. **Clone the Repository:**

   ```bash
   git clone <repository_url>
   cd faq_project
