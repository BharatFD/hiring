import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import express, { Application } from 'express';
import faqRoute from "./routes/faq.route"
export const app: Application = express();
const PORT: number = Number(process.env.PORT) || 5000;


// Middleware
app.use(cors({
//   origin: 'http://localhost:5173', // 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow cookies and credentials
}));
app.use(express.json());

// Routes
app.use('/api/faqs', faqRoute);

