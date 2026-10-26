import { str, char, letters, sequenceOf, digits, fail} from 'arcsecond';
import {value} from './main.js';

const returnStatement = sequenceOf([
  str('gbt'),
  char('('),
  value,
  char(')')
]).map(x => x[2]);

export function returnParserFn(raw) {
  returnStatement.fork(
    raw,
    (errorMsg, parsingState) => {
      console.log(errorMsg);
      console.log(parsingState);
      return;
    },
    (result, parsingState) => {
      console.log(parsingState);
      return result;
    }
  );
}
