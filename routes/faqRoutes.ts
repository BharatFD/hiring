import { Router } from 'express';
import {
  getFaqs,
  createFaq,
  getFaqsInEnglish,
  getFaqsInHindi,
  getFaqsInBengali
} from '../controllers/faqController';

const router = Router();

// Fetch FAQs with language query (default is English)
router.get('/faqs', getFaqs);

// Fetch FAQs in English
router.get('/faqs/?lang=en', getFaqsInEnglish);

// Fetch FAQs in Hindi
router.get('faqs/?lang=hi', getFaqsInHindi);

// Fetch FAQs in Bengali
router.get('/faqs/?lang=bn', getFaqsInBengali);

// Create a new FAQ (POST request)
router.post('/faqs', createFaq);

export default router;
