export interface FaqTranslation {
  question: string;
  answer: string;
}

export interface Faq {
  id: number;
  question: string;
  answer: string;
  translations: any;
}
