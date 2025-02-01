import Faq from '../models/faq.model.js';
import { translateText } from '../services/translationservice.js';
import { ApiResponse, asyncHandler } from '../utils/utils.js';

// Create a new FAQ with translations
export const createFaq = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    throw new ApiError(400, 'Question and answer are required to create a new FAQ.');
  }

  const faq = new Faq({ question, answer });

  // Supported languages for translation
  const supportedLanguages = ['hi', 'bn', 'ur', 'kn', 'gu'];
  const translations = {};

  for (const lang of supportedLanguages) {
    try {
      const translatedQuestion = await translateText(question, lang);
      const translatedAnswer = await translateText(answer, lang);
      
      
      translations[lang] = { question: translatedQuestion, answer: translatedAnswer };
    } catch (error) {
      console.error(`Translation failed for ${lang}:`, error);
      translations[lang] = { question, answer }; // Fallback to original if translation fails
    }
  }

  faq.translations = translations;
  await faq.save();

  res.status(201).json(new ApiResponse(201, faq, 'FAQ created successfully with translations.'));
});

// Get all FAQs with translation based on language query
export const getFaqs = asyncHandler(async (req, res) => {
  const lang = req.query.lang || 'en'; // Default to 'en' if no language is provided
  const faqs = await Faq.find();

  const transformedFaqs = faqs.map((faq) => {
    const translationsObj = faq.translations || {}; // Ensure translations object exists
    const translation = translationsObj[lang];

    // Log the available translations for the FAQ
    console.log(`Translations for FAQ '${faq.question}':`, translationsObj);

    // If the translation for the requested language exists, return it, else fall back to the original question/answer
    return {
      question: translation?.question || faq.question,
      answer: translation?.answer || faq.answer,
    };
  });

  // Respond with the transformed FAQ list
  res.json(new ApiResponse(200, transformedFaqs, `FAQs fetched successfully for language ${lang}.`));
});
