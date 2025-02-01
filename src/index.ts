import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import RedisService from "./utils/redis-client";
import PrismaSingleton from "./utils/prisma-client";
import { deleteFaqs, getFaqs, postFaqs } from "./controller/faqs-controller";
import validateRequest from "./middleware/validator";


dotenv.config();
const app = express();

if (!process.env.GOOGLE_TRANSLATE_API_KEY) {
  console.error("GOOGLE_TRANSLATE_API_KEY is required.");
  process.exit(1);
}

app.use(cors());


const PORT = process.env.PORT || 3000;

app.get('/',(req:Request,res:Response)=>{
  res.status(200).json({message:"Server is up and running!"});
})

app.get('/api/faqs',getFaqs);

app.post("/api/faqs",validateRequest(["question","answer"]),postFaqs);

app.delete("/api/faqs/:id",deleteFaqs);

app.use(
    (err: unknown, req: Request, res: Response, next: NextFunction): Response | any => {
      const error = err instanceof Error ? err : new Error('Unknown error');
      console.error(error.stack);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  );
  

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await PrismaSingleton.getInstance().$disconnect();
  await RedisService.getInstance().quit();
  process.exit(0);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;