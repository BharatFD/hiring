import { Request, Response } from "express";
import FAQ from "../models/FAQ";
import { translateText } from "../utils/translate";
export const createFAQ = async (req: Request, res: Response): Promise<void> => {
  try {
    const { question, answer } = req.body;

   
    const translations = await translateText(question);

    const newFAQ = new FAQ({
      question,
      answer,
      translations, 
    });

    await newFAQ.save();

    res.status(201).json(newFAQ);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getFAQs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, lang = "en" } = req.query; 

    if (id) {
  
      const faq = await FAQ.findById(id);
      if (!faq) {
        res.status(404).json({ error: "FAQ not found" });
        return;
      }

      
      const translatedFAQ = {
        //@ts-ignore
        question: faq.translations?.[lang] || faq.question,
        answer: faq.answer,
      };

      res.json(translatedFAQ);
    } else {
    
      const faqs = await FAQ.find({});

      const translatedFAQs = faqs.map((faq) => ({
        id: faq._id,
        //@ts-ignore
        question: faq.translations?.[lang] || faq.question,
        answer: faq.answer,
      }));

      res.json(translatedFAQs);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};