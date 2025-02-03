# 📌 FAQ Management System (Multilingual + Dockerized)

🚀 A backend FAQ management system with **React, Node.js, Express, MongoDB**, and **Google Translation API** for multilingual support. The project supports **CRUD operations**, **caching**, and is **containerized with Docker**.

## 🌟 Features

- ✅ **CRUD operations** for FAQ management.
- 🌍 **Multilingual Support** (Google Translate API).
- 🛢️ **MongoDB Database** for storing FAQs.
- ⚡ **Fast performance** with caching.
- 🧪 **Unit Tests** with Chai & SuperTest.
- 🐳 **Dockerized** for easy deployment.
- 🔍 **RESTful API** for easy integration.

---

## 📷 Screenshots of API Endpoints

### **1️⃣ Create FAQ**
![Create FAQ](https://github.com/user-attachments/assets/194f8c95-2d27-4828-a07e-239a78b13ca6)


### **2️⃣ Get All FAQs**
![Get all FAQ](https://github.com/user-attachments/assets/67f404a4-95a8-4a3c-95f3-e1bdfaa6c676)

### **4️⃣ Get FAQ in Bengali**
![Get FAQ in Bengali](https://github.com/user-attachments/assets/9ad00337-8262-42c8-a4ea-797cc4895d46)

### **5️⃣ Update FAQ**
![Update FAQ](https://github.com/user-attachments/assets/f6a2e206-c797-4888-ad09-2bcd86556a9e)


### **6️⃣ Delete FAQ**
![Delete FAQ](https://github.com/user-attachments/assets/51dbbff6-bdd2-4b6e-89fe-38f8c1b6aeb7)

---

## 📥 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Ayush-kumar-bajwan/backend-assignment-bharatFD.git



2️⃣ Setup Environment Variables
Create a .env file inside the faq-backend directory:

PORT=8000
MONGO_URI=mongodb+srv://your-mongodb-uri
REDIS_HOST=redis
REDIS_PORT=6379

3️⃣ Install Dependencies
Run the following commands inside the backend and frontend folders:

# Install backend dependencies
npm install


4️⃣ Run the Application
Without Docker

# Start Backend
npm  run dev

With Docker
docker-compose up --build
