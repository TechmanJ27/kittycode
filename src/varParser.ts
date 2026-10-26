import { str, char, sequenceOf, regex, optionalWhitespace, recursiveParser } from 'arcsecond';
import { value } from './main.js';

export const varDeclare = sequenceOf([
  str('meow'),
]);

export const varName = regex(/^[a-zA-Z_][a-zA-Z_0-9]*/);

const assignment = sequenceOf([
  optionalWhitespace,
  char('~'),
  optionalWhitespace,
]);

export const variableParser = varDeclare.chain(() => {
  return varName.chain(name => {
    return assignment.chain(() => {
      
      return recursiveParser(() => value).map(val => {

        const formattedValue = Array.isArray(val) ? val.flat(Infinity).join('') : val;
        return `let ${name} = ${formattedValue};`;
      });
    });
  });
});