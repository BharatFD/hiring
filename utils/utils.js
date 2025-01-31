const tr = require("googletrans").default;

const supportedLanguages = ['hi', 'mr', 'bn'];

async function translateTo(text) {
    // console. log(text);
    // console.log(lang);
    const translations = {};
    for(const lang of supportedLanguages) {

        try {
            const response = await tr(text, {to: lang});
            translations[lang] = response.text;
        } catch(e) {
            console.log("Translation error: ",e);
            return text;
        }
    }
    return translations;
}


module.exports = {
    translateTo,
    supportedLanguages
}