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

export const getFaqs = asyncHandler(async (req, res) => {
  const lang = req.query.lang || 'en'; // Default to 'en' if no language is provided
  const faqs = await Faq.find();

  // If no FAQs are found, return an empty array
  if (!faqs.length) {
    return res.json(new ApiResponse(200, [], `No FAQs available.`));
  }

  const transformedFaqs = faqs.map((faq) => {
    const translationsObj = faq.translations || {}; // Ensure translations object exists
    const translation = translationsObj[lang] || {}; // Get the translation for the requested language

    console.log(`Translations for FAQ '${faq.question}':`, translationsObj);

    // Return the FAQ with translation, falling back to original if no translation found
    return {
      lang, // Include the requested language in the response
      question: translation.question || faq.question, 
      answer: translation.answer || faq.answer,
    };
  });

  // Respond with the transformed FAQ list
  res.json(new ApiResponse(200, transformedFaqs, `FAQs fetched successfully for language ${lang}.`));
});
