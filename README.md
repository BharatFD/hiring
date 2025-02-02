# BharatFD Backend

A robust Node.js backend for the Multilingual FAQ Management System. This service provides RESTful APIs for managing FAQs with support for multiple languages using Google Translate.

## 📁 Project Structure

```
backend/
├── config/           # Configuration files
├── controllers/      # Request handlers
├── models/          # Database models
├── routes/          # API routes
├── services/        # Business logic
├── tests/           # Test files
├── .env             # Environment variables
├── .env.example     # Example environment variables
├── .eslintrc        # ESLint configuration
├── index.ts           # Application entry point
├── server.ts           # Application entry point
└── package.json     # Project metadata and dependencies
```



## 🚀 Features

- RESTful API endpoints for FAQ management (CRUD operations)
- MongoDB integration for data persistence
- Redis caching for improved performance
- Multilingual support using Google Translate API
- CORS enabled for frontend integration
- Comprehensive test suite using Mocha and Chai
- ESLint for code quality

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Caching**: Redis
- **Testing**: Mocha, Chai
- **Translation**: Google Translate API
- **Other Tools**: ESLint, Nodemon

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB
- Redis Server
- npm 

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tivarii/BackendAssignment
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```


## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Running Tests
```bash
npm test
```

### Linting
```bash
npm run lint       # Check for linting issues
npm run lint:fix   # Fix linting issues
```

## 📚 API Documentation

### FAQ Endpoints

#### Get all FAQs
- **GET** `/api/faqs`
- Returns a list of all FAQs

- **GET** `/api/faqs?lang=hi`
- Returns a list of all FAQs in hindi

#### Create a new FAQ
- **POST** `/api/faqs`
- Creates a new FAQ
- Body:
  ```json
  {
    "question": "What is Nodejs?",
    "answer": "Nodejs is a javascript runtime environment"
  }
  ```

## 🔒 Environment Variables

#### REDIS_PASSWORD = 
#### REDIS_USER = 
#### REDIS_HOST = 
#### REDIS_PORT = 
#### MONGO_URI = 
