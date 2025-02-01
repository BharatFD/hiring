import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { errorHandler } from './utils/utilshandler.js';
import connectDB from "./config/database.js";
import adminRoutes from "./routes/admin.routes.js";
import faqRoutes from './routes/faq.routes.js';



dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Default route for company message
app.get("/", (req, res) => {
  res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h1 style="color: #007bff;">Welcome to <a href="https://www.bharatfd.com/" target="_blank">BharatFD! </a></h1>
        <p style="font-size: 18px;">Backend Assignment by <strong>Umakant Shinde</strong></p>
      </div>
    `);
});

// Routes
app.use("/api/admin", adminRoutes);
app.use('/api/users', faqRoutes);

// Error handling middleware (must be placed after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);

export default app;
