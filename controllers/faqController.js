import FAQ from "../models/faqModel.js";
import redis from "../config/redis.js";
import { translateFAQ } from "../services/translationService.js";
import mongoose from "mongoose";

// Create FAQ
export const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: "Question and answer are required" });
    }

    console.log("Received:", { question, answer });

    // Translate question and answer to Hindi & Bengali
    const translated_hi = await translateFAQ(question, answer, "hi");
    const translated_bn = await translateFAQ(question, answer, "bn");

    console.log("Translated (hi):", translated_hi);
    console.log("Translated (bn):", translated_bn);

    // Create FAQ entry
    const newFAQ = await FAQ.create({
      question,
      answer,
      translations: { hi: translated_hi, bn: translated_bn },
    });

    console.log("FAQ Created:", newFAQ);

    // Clear cache
    if (redis) {
      await redis.del("faqs");
      console.log("Cache cleared");
    }

    res.status(201).json(newFAQ);
  } catch (error) {
    console.error("Error in createFAQ:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Get FAQs with optional language parameter
export const getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en"; // Default to English
    const cacheKey = `faqs_${lang}`;

    console.log("Requested language:", lang);

    // Check Redis cache
    const cachedFAQs = await redis.get(cacheKey);
    if (cachedFAQs) {
      console.log("✅ Returning cached FAQs");
      return res.status(200).json(JSON.parse(cachedFAQs));
    }

    // Fetch FAQs from DB
    const faqs = await FAQ.find();
    if (!faqs.length) {
      return res.status(404).json({ error: "No FAQs found" });
    }

    // Format FAQs correctly
    const translatedFAQs = faqs.map((faq) => {
      const translation = faq.translations[lang];

      return {
        id: faq._id,
        question: translation?.question || faq.question, // Extract question correctly
        answer: translation?.answer || faq.answer, // Extract answer correctly
      };
    });

    // Cache the translated FAQs for 1 hour
    await redis.setex(cacheKey, 3600, JSON.stringify(translatedFAQs));
    console.log(`✅ FAQs cached successfully for language: ${lang}`);

    res.status(200).json(translatedFAQs);
  } catch (error) {
    console.error("❌ Error in getFAQs:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// Update FAQ
export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid FAQ ID" });
    }

    const { question, answer } = req.body;

    // Find the FAQ by ID
    const faq = await FAQ.findById(id);
    if (!faq) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    // Update fields if provided
    if (question) {
      faq.question = question;
      const updated_hi = await translateFAQ(question, faq.answer, "hi");
      const updated_bn = await translateFAQ(question, faq.answer, "bn");
      faq.translations.hi = updated_hi;
      faq.translations.bn = updated_bn;
    }
    if (answer) {
      faq.answer = answer;
      const updated_hi = await translateFAQ(faq.question, answer, "hi");
      const updated_bn = await translateFAQ(faq.question, answer, "bn");
      faq.translations.hi = updated_hi;
      faq.translations.bn = updated_bn;
    }

    await faq.save();
    redis.del("faqs"); // Clear cache

    res.status(200).json(faq);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Delete FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid FAQ ID" });
    }

    // Find the FAQ and delete it
    const deletedFAQ = await FAQ.findByIdAndDelete(id);
    if (!deletedFAQ) {
      return res.status(404).json({ error: "FAQ not found" });
    }

    redis.del("faqs"); // Clear cache
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
