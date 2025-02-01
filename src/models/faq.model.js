import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    translations: {
      type: Map,
      of: {
        question: String,
        answer: String,
      },
    },
  },
  { timestamps: true }
);

faqSchema.methods.getTranslation = function (lang) {
  if (lang === 'en' || !this.translations.has(lang)) {
    return {
      question: this.question,
      answer: this.answer,
    };
  }
  return this.translations.get(lang);
};

const Faq = mongoose.model('Faq', faqSchema);

export default Faq;
