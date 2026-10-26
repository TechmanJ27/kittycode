import { str, char, sequenceOf, recursiveParser } from 'arcsecond';
import { value } from './main.js';
export const returnStatement = sequenceOf([
    str('gbt'),
    char('('),
    recursiveParser(() => value),
]).map(elements => {
    const val = elements;
    const formattedValue = Array.isArray(val) ? val.join('') : val;
    return `return ${formattedValue};`;
});
//# sourceMappingURL=returnParser.js.map