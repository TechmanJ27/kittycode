import { str, char, letters, sequenceOf, digits, fail} from 'arcsecond';

const varDeclare = sequenceOf([
  str('meow'),
  char(' '),
]).map(x => ({
  value: 'let '
}));

const varName = regex(/^[a-zA-Z_][a-zA-Z_0-9]*$/);

const variableParser = varDeclare.chain(matchedValue => {
  const variableParser = varName.chain(matchedValue => {
    return choice([
        digit,
        sequenceOf([
          char('\''),
          letters,
          char('\''), 
        ]),
      ]);
  });
});

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
