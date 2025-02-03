import { googletrans } from 'googletrans';


export const supportedLanguages = ['hi', 'mr', 'bn'];

export async function translateTo(text) {
    // console. log(text);
    // console.log(lang);
    const translations = {};
    for(const lang of supportedLanguages) {

        try {
            const response = await googletrans(text, {to: lang});
            translations[lang] = response.text;
        } catch(e) {
            console.log("Translation error: ",e);
            return text;
        }
    }
    return translations;
}

