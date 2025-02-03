import { Request, Response } from 'express';
import  { prismaClient } from '../db/prismaClient'; 
import translateText from '../services/translateService'; // Helps to translate text

// Fetch FAQs with optional language translation 
const getFaqs = async (req: Request, res: Response) => {
  try {
    const lang = req.query.lang || 'en'; // Default to 'en' (English)

    // Fetch FAQs from the database
    const faqs = await prismaClient.fAQ.findMany();

    // Translate FAQs if requested language is not 'en'
    const translatedFaqs = await Promise.all(
      faqs.map(async (faq) => {
        let translatedQuestion = faq.question;
        let translatedAnswer = faq.answer;

        // Translate if the lang is not 'en'
        if (lang !== 'en') {
          translatedQuestion = lang === 'hi' ? faq.questionHi || await translateText(faq.question, lang) : lang === 'bn' ? faq.questionBn || await translateText(faq.question, lang) : faq.question;
          translatedAnswer = lang === 'hi' ? faq.answerHi || await translateText(faq.answer, lang) : lang === 'bn' ? faq.answerBn || await translateText(faq.answer, lang) : faq.answer;
        }

        return {
          question: translatedQuestion,
          answer: translatedAnswer,
        };
      })
    );

    res.json(translatedFaqs);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Failed to fetch FAQs', error: errorMessage });
  }
};

// Create a new FAQ with automatic translation (POST request)
const createFaq = async (req: Request, res: Response) => {
  try {
    const { question, answer } = req.body;

    // Automatically translate the question and answer into Hindi and Bengali
    const questionHi = await translateText(question, 'hi');
    const answerHi = await translateText(answer, 'hi');
    const questionBn = await translateText(question, 'bn');
    const answerBn = await translateText(answer, 'bn');

    // Save the FAQ with translations in the database
    const newFaq = await prismaClient.fAQ.create({
      data: {
        question,
        answer,
        questionHi,
        answerHi,
        questionBn,
        answerBn,
      },
    });

    res.status(201).json(newFaq);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Failed to create FAQ', error: errorMessage });
  }
};

// Fetch FAQs in English (default)
const getFaqsInEnglish = async (req: Request, res: Response) => {
  try {
    const faqs = await prismaClient.fAQ.findMany();
    res.json(faqs);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Failed to fetch FAQs in English', error: errorMessage });
  }
};

// Fetch FAQs in Hindi
const getFaqsInHindi = async (req: Request, res: Response) => {
  try {
    const faqs = await prismaClient.fAQ.findMany();

    const translatedFaqs = await Promise.all(
      faqs.map(async (faq) => {
        const translatedQuestion = faq.questionHi || await translateText(faq.question, 'hi');
        const translatedAnswer = faq.answerHi || await translateText(faq.answer, 'hi');
        return {
          question: translatedQuestion,
          answer: translatedAnswer,
        };
      })
    );

    res.json(translatedFaqs);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Failed to fetch FAQs in Hindi', error: errorMessage });
  }
};

// Fetch FAQs in Bengali
const getFaqsInBengali = async (req: Request, res: Response) => {
  try {
    const faqs = await prismaClient.fAQ.findMany();

    const translatedFaqs = await Promise.all(
      faqs.map(async (faq) => {
        const translatedQuestion = faq.questionBn || await translateText(faq.question, 'bn');
        const translatedAnswer = faq.answerBn || await translateText(faq.answer, 'bn');
        return {
          question: translatedQuestion,
          answer: translatedAnswer,
        };
      })
    );

    res.json(translatedFaqs);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Failed to fetch FAQs in Bengali', error: errorMessage });
  }
};

export { getFaqs, createFaq, getFaqsInEnglish, getFaqsInHindi, getFaqsInBengali };
