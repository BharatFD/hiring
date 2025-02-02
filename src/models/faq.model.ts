import mongoose, { Document, Schema, Model } from 'mongoose';

interface Translation {
  question?: string;
  answer?: string;
}

interface IFAQ extends Document {
  question: string;
  answer: string;
  translations: {
    hi?: Translation;
    bn?: Translation;
  };
  getTranslatedText(lang: string): { question: string; answer: string };
}

const faqSchema: Schema<IFAQ> = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    hi: { question: String, answer: String },
    bn: { question: String, answer: String },
  },
});

// Method for the schema to get translated text
faqSchema.methods.getTranslatedText = function (lang: string) {
  const translation = this.translations[lang as keyof typeof this.translations];
  return {
    question: translation?.question || this.question,
    answer: translation?.answer || this.answer,
  };
};

const FAQ: Model<IFAQ> = mongoose.model<IFAQ>('FAQ', faqSchema);
export default FAQ;