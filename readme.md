# **BharatFD Hiring Challenge**

Welcome to the **BharatFD Hiring Challenge** repository! This project is a submission for evaluating backend development skills, focusing on creating a **multilingual FAQ management system**.

---

## 🚀 Tech Stack

### Backend:

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Redis**
- **Google Translate API**

### Frontend:

- **React.js**
- **Vite**
- **Axios**
- **CKEditor**

### Caching:

- **Redis**

---

## ✨ Features

- **Multilingual FAQ Management**
- **REST API for Managing FAQs**
- **Language Selection via Query Parameters**
- **Caching for Improved Performance**
- **WYSIWYG Editor for Rich Text Formatting**

---

## 📂 Project Structure

### Backend:

- `database/db.js` - Mongoose schema and model for FAQs
- `index.js` - Main entry point for the backend server
- `routes/faq.js` - Express routes for managing FAQs
- `middlewares/cacheMiddleware.js` - Middleware for caching responses
- `utils/redis.js` - Redis client setup
- `utils/sanitize.js` - Utility for sanitizing input
- `utils/utils.js` - Utility functions for translation
- `package.json` - Backend dependencies and scripts

### Frontend:

- `index.html` - Main HTML file
- `vite.config.js` - Vite configuration
- `src/main.jsx` - Entry point for the React application
- `src/App.jsx` - Main application component
- `src/components/` - React components for the application
- `package.json` - Frontend dependencies and scripts

---

## 🛠️ Project Setup

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js**
- **MongoDB**
- **Redis**

### Backend Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-repo/bharatfd-hiring-challenge.git
   cd bharatfd-hiring-challenge/backend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Create a `.env` file with the following content:

   ```env
   MONGO_URL=mongodb://localhost:27017/FAQS
   ```

4. Start the Redis server using Docker:

   ```sh
   docker run -d --name redis-stack-server -p 6379:6379 redis/redis-stack-server:latest
   ```

5. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd ../frontend
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the frontend server:
   ```sh
   npm run dev
   ```

---

## 📌 API Usage Examples

### Fetch FAQs

#### Request:

```sh
curl http://localhost:3000/api/faqs/get-faq
```

#### Response:

```json
[
  {
    "question": "What is BharatFD?",
    "answer": "BharatFD is a platform for FAQ management.",
    "language": "en"
  }
]
```

```sh
curl http://localhost:3000/api/faqs/get-faq?lang=hi
```

#### Response:

```json
[
  {
      "hi": {
        "question": "React क्या है?"
        "answer": "<p>React एक JavaScript लाइब्रेरी है जिसका <strong>उपयोग यूज़र इंटरफ़ेस</strong> (UI) बनाने के लिए किया जाता है। यह कम्पोनेंट्स आधारित है, जो UI के पुनः उपयोग करने योग्य हिस्से होते हैं, और इनका उपयोग बड़ी और जटिल<em><strong> एप्लिकेशन</strong></em> को आसानी से विकसित करने के लिए किया जाता है।</p>",
    }
  }
]
```

```sh
curl http://localhost:3000/api/faqs/get-faq?lang=bn
```

#### Response:

```json
[
  {
    "bn": {
        "question": "প্রতিক্রিয়া কি?"
        "answer": "<html><head></head><body><p>প্রতিক্রিয়া একটি জাভাস্ক্রিপ্ট লাইব্রেরি যার<strong>ব্যবহারকারী ইন্টারফেস ব্যবহার করুন</strong>(ইউআই) তৈরি করার জন্য করা হয়। এটি ভিত্তিক উপাদানগুলির উপর ভিত্তি করে, যা ইউআইয়ের পুনরায় ব্যবহারযোগ্য অংশ এবং তাদের ব্যবহার বড় এবং জটিল<em><strong>আবেদন</strong></em>সহজেই বিকাশের জন্য করা হয়।</p></body></html>",
    }
  }
]
```

### Add an FAQ

#### Request:

```sh
curl -X POST http://localhost:3000/api/faqs/add-faq \
    -H "Content-Type: application/json" \
    -d '{"question": "What is Node.js?", "answer": "Node.js is a JavaScript runtime."}'
```

```json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime.",
  "language": "en"
}
```

#### Response:

```json
{
  "message": "FAQ added successfully",
  "data": {
    "question": "What is Node.js?",
    "answer": "Node.js is a JavaScript runtime.",
    "language": "en"
  }
}
```

### Delete an FAQ

#### Request:

```sh
curl -X DELETE http://localhost:3000/api/faqs/delete-faq/{id}
```

#### Response:

```json
{
  "message": "FAQ deleted successfully"
}
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
