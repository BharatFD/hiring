import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import faqRoutes from "./routes/faqRoutes";

import "dotenv/config"

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/v1/faqs", faqRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` khul gaye ghode @ PORT ${PORT}`));
