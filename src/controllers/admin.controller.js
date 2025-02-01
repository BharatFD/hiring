import { ApiError, ApiResponse } from '../utils/utils.js'; 
import Faq from '../models/faq.model.js'; 

// Get all FAQs
export const getAllFaqs = async (req, res, next) => {
  try {
    const faqs = await Faq.find();
    if (!faqs || faqs.length === 0) {
      throw new ApiError(404, 'No FAQs found'); 
    }
    const response = new ApiResponse(200, faqs); 
    res.status(200).json(response); 
  } catch (error) {
    next(error); 
  }
};

// Create a new FAQ
export const createFaq = async (req, res, next) => {
  const { question, answer, translations } = req.body;


  if (!question || !answer) {
    throw new ApiError(400, 'Question and answer are required'); 
  }

  try {
    const faq = new Faq({ question, answer, translations });
    await faq.save();
    const response = new ApiResponse(201, faq); 
    res.status(201).json(response); 
  } catch (error) {
    next(error); 
  }
};

// Update an existing FAQ
export const updateFaq = async (req, res, next) => {
  const { question, answer, translations } = req.body;

  try {
    const faq = await Faq.findByIdAndUpdate(
      req.params.id,
      { question, answer, translations },
      { new: true }
    );
    if (!faq) {
      throw new ApiError(404, 'FAQ not found'); 
    }
    const response = new ApiResponse(200, faq); 
    res.status(200).json(response); 
  } catch (error) {
    next(error); 
  }
};

// Delete a FAQ
export const deleteFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);
    if (!faq) {
      throw new ApiError(404, 'FAQ not found'); 
    }
    const response = new ApiResponse(200, { message: 'FAQ deleted successfully' }); 
    res.status(200).json(response); 
  } catch (error) {
    next(error); 
  }
};
