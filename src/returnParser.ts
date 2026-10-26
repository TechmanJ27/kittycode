import { str, char, letters, sequenceOf, digits, fail} from 'arcsecond';

export const value = choice([
  digit,
  sequenceOf([
    char('\''),
    letters,
    char('\''), 
  ]),
]);

const returnStatement = sequenceOf([
  str('gbt'),
  char('('),
  value,
  char(')')
]).map(x => x[2]);

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
