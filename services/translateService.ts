import axios from 'axios';

const translateText = async (text: string, targetLang: string) => {
  try {
    const response = await axios.post('http://localhost:5000/translate', {
      q: text,
      source: 'en',
      target: targetLang,
      format: 'text',
    });

    return response.data.translatedText;
  } catch (error) {
    console.error('Translation Error:', error);
    throw new Error('Error translating text');
  }
};

export default translateText;
