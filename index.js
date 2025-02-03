import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import faqRoutes from "./routes/faqRoutes.js";
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/faqs", faqRoutes);
app.get('/', (req, res) => {
  res.send("APP is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`server is running on ${PORT}`);
});

// Export app to be used in the test file
export default app;
