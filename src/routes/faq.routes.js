import express from 'express';
import cacheMiddleware from '../middlewares/cache.middleware.js';
import { asyncHandler } from '../utils/utils.js'; 
import { getFaqs, createFaq } from '../controllers/faq.controller.js';

const router = express.Router();

router.get('/faqs', cacheMiddleware(900), asyncHandler(getFaqs)); 
router.post('/faqs', asyncHandler(createFaq)); 

export default router;
