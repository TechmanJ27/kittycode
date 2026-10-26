import { str, char, letters, sequenceOf, digits, fail} from 'arcsecond';
import {value} from './main.js';

export const varDeclare = sequenceOf([
  str('meow'),
  char(' '),
]).map(x => ({
  value: 'let '
}));

export const varName = regex(/^[a-zA-Z_][a-zA-Z_0-9]*$/);

export const variableParser = varDeclare.chain(matchedValue => {
  const variableParser = varName.chain(matchedValue => {
    return value;
  });
});

export function variableParserFn(raw) {
  variableParser.fork(
    raw,
    (errorMsg, parsingState) => {
      console.log(errorMsg);
      console.log(parsingState);
      return;
    },
    (result, parsingState) => {
      console.log(parsingState);
      return result.value;
    }
  );
}
