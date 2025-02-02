import express, { Router } from 'express';
import { getFAQs, createFAQ } from '../controllers/faq.controller';

const router: Router = express.Router();

// Routes
router.get('/', getFAQs);
router.post('/', createFAQ);

export default router;