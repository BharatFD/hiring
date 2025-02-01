# FAQ API - README

## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setting Up Locally](#setting-up-locally)
- [Setting Up with Docker](#setting-up-with-docker)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Running Tests](#running-tests)
- [License](#license)

## Introduction
This is a **FAQ API** built with **Node.js, Express, PostgreSQL, and Redis**, featuring multi-language support and caching. It allows users to fetch, create, and delete FAQs efficiently.

## Prerequisites
Ensure you have the following installed before setting up the project:
- [Node.js (LTS)](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [PostgreSQL](https://www.postgresql.org/) (for local setup, optional if using Docker)
- [Redis](https://redis.io/) (for local setup, optional if using Docker)

## Setting Up Locally
1. Clone the repository:
   ```sh
   git clone https://github.com/saqib001-github/backend-node-faq.git
   cd backend-node-faq
   ```
2. Install dependencies:
   ```sh
   npm install or pnpm install
   ```
3. Configure environment variables:
   - Create a `.env` file in the project root and add the following variables:
     ```env
     DATABASE_URL=postgresql://user:password@localhost:5432/faqdb
     REDIS_URL=redis://localhost:6379
     PORT=3000
     ```
4. Start PostgreSQL and Redis locally (if not using Docker):
   ```sh
   sudo systemctl start postgresql
   redis-server
   ```
5. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```
6. Start the application:
   ```sh
   npm run dev
   ```

## Setting Up with Docker
1. Ensure Docker and Docker Compose are installed.
2. Build and start the containers:
   ```sh
   docker-compose up --build
   ```
   This will start:
   - PostgreSQL on port `5432`
   - Redis on port `6379`
   - The Express API on port `3000`
3. Stop the containers:
   ```sh
   docker-compose down (or ctrl + c)
   ```

## Running the Application
- **Locally**: `npm run dev`
- **With Docker**: `docker-compose up`
- The API will be available at: `http://localhost:3000`

## API Endpoints

### Get FAQs
```http
GET /api/faqs?lang={language}
```
#### Response:
```json
[
  {
    "id": 1,
    "question": "What is this API?",
    "answer": "It provides FAQs",
    "translations": { "es": { "question": "¿Qué es esta API?", "answer": "Proporciona preguntas frecuentes" } }
  }
]
```

### Create FAQ
```http
POST /api/faqs
```
#### Request Body:
```json
{
  "question": "How does caching work?",
  "answer": "It uses Redis for fast retrieval."
}
```
#### Response:
```json
{
  "id": 2,
  "question": "How does caching work?",
  "answer": "It uses Redis for fast retrieval.",
  "translations": { }
}
```

### Delete FAQ
```http
DELETE /api/faqs/{id}
```
#### Response:
```json
{ "message": "FAQ deleted" }
```

## Environment Variables
| Variable      | Description                    |
|--------------|--------------------------------|
| DATABASE_URL | PostgreSQL connection string  |
| REDIS_URL    | Redis connection string       |
| PORT         | Server port (default: 3000)   |

## Running Tests
1. Ensure your database and Redis are running (or use Docker):
   ```sh
   docker-compose up -d
   ```
2. Run tests:
   ```sh
   npm test
   ```

## License
This project is licensed under the MIT License.

