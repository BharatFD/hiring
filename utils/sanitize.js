const createDOMPurify  = require('dompurify');
const {JSDOM} = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

function sanitize(unSafeText) {
    const response = DOMPurify.sanitize(unSafeText);
    return response;
}

module.exports={
    sanitize
}
