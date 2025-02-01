import express, { NextFunction, Request, Response } from "express";
import RedisService from "../utils/redis-client";
import PrismaSingleton from "../utils/prisma-client";
import { Faq } from "../types/types";
import { translateText } from "../services/translate";

export const getFaqs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | any> => {
  try {
    const rawLang = req.query.lang;
    const language: string = typeof rawLang === "string" ? rawLang : "en";

    const cacheKey = language ? `faqs_${language}` : "faqs_en";
    const cachedFaqs = await RedisService.getInstance().get(cacheKey);
    if (cachedFaqs) return res.json(JSON.parse(cachedFaqs));

    const faqs: Faq[] = await PrismaSingleton.getInstance().faq.findMany();

    if (language && language !== "en") {
      await Promise.all(
        faqs.map(async (faq: Faq) => {
          if (faq.translations && faq.translations[language]) {
            faq.question = faq.translations[language].question;
            faq.answer = faq.translations[language].answer;
          } else {
            faq.question = await translateText(faq.question, language);
            faq.answer = await translateText(faq.answer, language);
          }
        })
      );
    }

    await RedisService.getInstance().set(cacheKey, JSON.stringify(faqs), 86400);
    return res.json(faqs);
  } catch (error) {
    return next(error);
  }
};

export const postFaqs = async (req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
    try {
      const { question, answer } = req.body;
      const translations: Record<string, any> = {};
      const languages = ["hi", "bn", "es", "fr"];

      await Promise.all(
        languages.map(async (lang) => {
          translations[lang] = {
            question: await translateText(question, lang),
            answer: await translateText(answer, lang),
          };
        })
      );

      const newFaq = await PrismaSingleton.getInstance().faq.create({ data: { question, answer, translations } });
      res.status(201).json(newFaq);
    } catch (error) {
      next(error);
    }
  }

  export const deleteFaqs = async ( req: Request, res: Response, next: NextFunction): Promise<Response | any> => {
    try {
      await PrismaSingleton.getInstance().faq.delete({ where: { id: Number(req.params.id) } });
      res.json({ message: "FAQ deleted" });
    } catch (error) {
      next(error);
    }
  }