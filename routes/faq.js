const Router = require('express');
const { translateTo, supportedLanguages } = require('../utils/utils');
const { faqModel } = require('../db');

const faqRouter = Router();




faqRouter.post("/add-faq", async (req, res) => {
    const { question, answer } = req.body;
    try {
        const translatedQuestions = await translateTo(question);
        const tranlatedAnswers = await translateTo(answer);

        const translations = {};
        for (const lang of supportedLanguages) {
            translations[lang] = {
                question: translatedQuestions[lang],
                answer: tranlatedAnswers[lang],
            }
        }

        await faqModel.create({
            question,
            answer,
            translations
        })
        res.status(200).json({
            message: "FAQ added successfully"
        })
        return;
    } catch (e) {
        res.status(500).json({
            message: "Error adding FAQ" + e,
        })
        return;
    }
})




module.exports = {
    faqRouter
}