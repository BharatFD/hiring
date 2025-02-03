import express from "express";
import { createFAQ, getFAQs } from "../controllers/faqController";

const router = express.Router();

router.post("/", createFAQ);
router.get("/", getFAQs);

export default router;
