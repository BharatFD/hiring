import translate from "google-translate-api-next";

export const translateFAQ = async (question, answer, targetLang) => {
  try {
    const translatedQuestion = await translate(question, { to: targetLang });
    const translatedAnswer = await translate(answer, { to: targetLang });

    return {
      question: translatedQuestion.text,
      answer: translatedAnswer.text,
    };
  } catch (error) {
    console.error(`Translation Error (${targetLang}):`, error);
    return { question, answer }; // Return original text if translation fails
  }
};
