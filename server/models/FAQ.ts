import mongoose, { Schema, Document } from "mongoose";

interface IFAQ extends Document {
  question: string;
  answer: string;
  translations: {
    kannada: string;
    punjabi: string;
    hindi: string;
    bangali: string;
  };
}

const FAQSchema = new Schema<IFAQ>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    kannada: { type: String, default: "" },
    punjabi: { type: String, default: "" },
    hindi: { type: String, default: "" },
    bangali: { type: String, default: "" },
  },
});

export default mongoose.model<IFAQ>("FAQ", FAQSchema);
