import express from 'express';
import cacheMiddleware from '../middlewares/cache.middleware.js';
import { asyncHandler } from '../utils/utils.js'; 
import { getFaqs, createFaq } from '../controllers/faq.controller.js';

const router = express.Router();

router.get('/', cacheMiddleware(900), asyncHandler(getFaqs)); 
router.post('/', asyncHandler(createFaq)); 

export default router;
