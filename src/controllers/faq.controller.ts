import { Request, Response } from 'express';
import FAQ from '../models/faq.model';
import { translateText } from '../services/translation.service';
import { getFromCache, setToCache } from '../services/cache.service';

// Get all FAQs from the database or cache [/api/faqs/?lang=hi]
const getFAQs = async (req: Request, res: Response): Promise<void> => {
  const { lang = 'en' } = req.query as { lang?: string };
  const cacheKey = `faqs_${lang}`;

  try {
    let cachedData;
    try {
      cachedData = await getFromCache(cacheKey);
    } catch (err: any) {
      console.error('Cache fetch error:', err.message);
      cachedData = null;
    }

    if (cachedData) {
      console.log('Cache hit:', cachedData);
      res.json(cachedData);
      return;
    }

    console.log('Cache miss or timeout. Fetching FAQs from database...');
    const faqs = await FAQ.find({});
    console.log('FAQs fetched from database:', faqs);
    const translatedFAQs = faqs.map((faq) => faq.getTranslatedText(lang));

    try {
      await setToCache(cacheKey, translatedFAQs);
      console.log('Cache set successfully.');
    } catch (err: any) {
      console.error('Cache set error:', err.message);
    }

    res.json(translatedFAQs);
  } catch (err: any) {
    console.error('Error in getFAQs:', err);
    res.status(500).json({ message: err.message });
  }
};

// Create a new FAQ [/api/faqs]
const createFAQ = async (req: Request, res: Response): Promise<void> => {
  const { question, answer } = req.body;

  try {
    const faq = new FAQ({ question, answer });

    // Translate to Hindi and Bengali
    faq.translations.hi = {
      question: await translateText(question, 'hi'),
      answer: await translateText(answer, 'hi'),
    };
    faq.translations.bn = {
      question: await translateText(question, 'bn'),
      answer: await translateText(answer, 'bn'),
    };

    await faq.save();
    res.status(201).json(faq);
  } catch (err: any) {
    console.error('Error creating FAQ:', err);
    res.status(400).json({ message: err.message });
  }
};

export { getFAQs, createFAQ };
