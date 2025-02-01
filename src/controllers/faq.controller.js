import Faq from '../models/faq.model.js';
import { translateText } from '../services/translationservice.js';
import {  ApiResponse, asyncHandler } from '../utils/utils.js';

// Create a new FAQ with translations
export const createFaq = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;
  const faq = new Faq({ question, answer });

  // Supported languages for translation
  const supportedLanguages = ['hi', 'bn', 'ur', 'kn', 'gu'];
  const translations = new Map();

  for (const lang of supportedLanguages) {
    const translatedQuestion = await translateText(question, lang);
    const translatedAnswer = await translateText(answer, lang);
    translations.set(lang, { question: translatedQuestion, answer: translatedAnswer });
  }

  faq.translations = translations;
  await faq.save();

  res.status(201).json(new ApiResponse(201, faq, 'FAQ created successfully'));
});

// Get all FAQs with translation based on language query
export const getFaqs = asyncHandler(async (req, res) => {
  const lang = req.query.lang || 'en';
  const faqs = await Faq.find();

  const transformedFaqs = faqs.map((faq) => {
    const translationsObj = faq.translations ? Object.fromEntries(faq.translations) : {};

    const translation = translationsObj[lang];

    return {
      question: translation?.question || faq.question,
      answer: translation?.answer || faq.answer,
    };
  });

  res.json(new ApiResponse(200, transformedFaqs));
});

