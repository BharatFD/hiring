# BharatFD Hiring Challenge - Backend

Welcome to the backend of the **BharatFD Hiring Challenge** repository. This project is designed to evaluate backend development skills, focusing on creating a **multilingual FAQ management system**.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Redis**
- **Google Translate API**

---

## ✨ Features

- **Multilingual FAQ management**
- **REST API for managing FAQs**
- **Language selection via query parameters**
- **Caching for improved performance**
- **Unit tests for API endpoints**

---

## 📂 Project Structure

- `database/db.js` - Mongoose schema and model for FAQs
- `index.js` - Main entry point for the backend server
- `routes/faq.js` - Express routes for managing FAQs
- `middlewares/cacheMiddleware.js` - Middleware for caching responses
- `utils/redis.js` - Redis client setup
- `utils/sanitize.js` - Utility for sanitizing input
- `utils/utils.js` - Utility functions for translation
- `package.json` - Backend dependencies and scripts

---

## 🛠️ Project Setup

### Prerequisites

- **Node.js**
- **MongoDB**
- **Redis**

### Setup Steps

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/bharatfd-hiring-challenge.git
    cd bharatfd-hiring-challenge/backend
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Create a `.env` file** with the following content:
    ```env
    MONGO_URL=mongodb://localhost:27017/your-db-name
    REDIS_URL=redis://localhost:6379
    ```

4. **Start the Redis server using Docker**:
    ```sh
    docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
    ```

5. **Start the backend server**:
    ```sh
    npm run dev
    ```

---

## 📌 API Endpoints

### ➕ Add a new FAQ
**POST** `/api/faqs/add-faq`  
Adds a new FAQ with translations.

### 📖 Fetch FAQs
**GET** `/api/faqs/get-faq`  
Fetches FAQs in the specified language.

### ❌ Delete an FAQ
**DELETE** `/api/faqs/delete-faq/:id`  
Deletes an FAQ by ID.

---

## 📌 API Usage Examples

### Fetch FAQs in English (default)
```sh
curl http://localhost:3000/api/faqs/get-faq
```

### Fetch FAQs in Hindi
```sh
curl http://localhost:3000/api/faqs/get-faq?lang=hi
```

### Fetch FAQs in Bengali
```sh
curl http://localhost:3000/api/faqs/get-faq?lang=bn
```

### Add a New FAQ
```sh
curl -X POST http://localhost:3000/api/faqs/add-faq \
    -H "Content-Type: application/json" \
    -d '{"question": "What is Node.js?", "answer": "Node.js is a JavaScript runtime."}'
```

### Delete an FAQ
```sh
curl -X DELETE http://localhost:3000/api/faqs/delete-faq/{id}
```

---

## 🤝 Contribution Guidelines

1. **Fork the repository**.
2. **Create a new branch**:
    ```sh
    git checkout -b feature-branch
    ```
3. **Make your changes and commit them**:
    ```sh
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**:
    ```sh
    git push origin feature-branch
    ```
5. **Open a pull request**.

---

## 🎉 Happy Coding! 🚀
