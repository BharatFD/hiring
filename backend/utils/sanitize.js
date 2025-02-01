import createDOMPurify from 'dompurify';
import {JSDOM} from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

export function sanitize(unSafeText) {
    const response = DOMPurify.sanitize(unSafeText);
    return response;
}


