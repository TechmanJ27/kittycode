import { str, char, sequenceOf, regex, optionalWhitespace, recursiveParser } from 'arcsecond';
import { value } from './main.js';
import { expect } from './errors.js';
export const varDeclare = sequenceOf([
    str('meow'),
]);
export const varName = regex(/^[a-zA-Z_][a-zA-Z_0-9]*/);
const assignment = sequenceOf([
    optionalWhitespace,
    char('~'),
    optionalWhitespace,
]);
const keywordGap = regex(/^\s+/);
export const variableParser = varDeclare.chain(() => expect(keywordGap, "'meow' must be followed by a space and a variable name").chain(() => expect(varName, "Expected a variable name after 'meow'").chain(name => expect(assignment, `Expected '~' after '${name}' (e.g. meow ${name}~5)`).chain(() => expect(value, "Expected a digit or a 'quoted string' after '~'")
    .map(val => `let ${name} = ${val};`)))));
//# sourceMappingURL=varParser.js.map