import express from 'express';
import  mongoose from "mongoose";
import  dotenv from 'dotenv';
import { faqRouter } from './routes/faq.js';
import  { redisClient } from './utils/redis.js';
import cors from 'cors';


dotenv.config();


export const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/faqs", faqRouter);

async function main() {
    app.listen(3000, (req, res)=> {
        console.log("Server started on port 3000");
    })
    await mongoose.connect(process.env.MONGO_URL);
    await redisClient.connect()
}

main();
