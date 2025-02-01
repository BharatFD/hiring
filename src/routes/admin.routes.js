import express from 'express';
import {
  getAllFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  deleteAllFaqs
} from '../controllers/admin.controller.js';
import { asyncHandler } from '../utils/utils.js'; 

const router = express.Router();

router.get('/faqs', asyncHandler(getAllFaqs));
router.post('/faqs', asyncHandler(createFaq));
router.put('/faqs/:id', asyncHandler(updateFaq));
router.delete('/faqs/:id', asyncHandler(deleteFaq));
router.delete('/faqs/', asyncHandler(deleteAllFaqs));

export default router;
