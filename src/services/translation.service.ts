import { translate } from '@vitalets/google-translate-api';

// Translate text to the specified language
const translateText = async (text: string, lang: string): Promise<string> => {
  try {
    const res = await translate(text, { to: lang });
    return res.text; // Return the translated text
  } catch (err: any) {
    console.error(`Translation error (${lang}):`, err.message);
    return text; // Fallback to the original text if translation fails
  }
};

export { translateText };
