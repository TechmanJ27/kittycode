import { str, optionalWhitespace, sequenceOf, char, many, recursiveParser } from 'arcsecond'; 
import { value, comparisonOperator, statements } from './main.js'; 

export const booleanExpression = recursiveParser(() => sequenceOf([ 
  value, 
  comparisonOperator, 
  value 
]));

export const ifStatementParser = sequenceOf([ 
  str('twink'), 
  optionalWhitespace, 
  char('('), 
  booleanExpression, 
  char(')'), 
  optionalWhitespace, 
  char('{'), 
  statements, 
  char('}') 
]).map(([
  _twink, _ws1, _openParen, 
  boolExp,
  _closeParen, _ws2, _openBrace, 
  parsedStatements,
  _closeBrace
]) => {
  return `if (${boolExp}) { ${parsedStatements} }`;
});
