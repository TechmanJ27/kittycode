import { str, optionalWhitespace, sequenceOf, regex, char } from 'arcsecond';

export const commentMarker = str('Nya!');
const commentText = regex(/^[\s\S]*?(?=\n)/);

export const commentParser = sequenceOf([
  commentMarker,
  optionalWhitespace,
  commentText
]).map(([marker, whitespace, text]) => `//${text}`);

export const multilineCommentMarker = str('Nya~');

export const multilineCommentText = regex(/^[\s\S]*?(?=~)/); 

export const multilineCommentClose = char('~');

export const multilineCommentParser = sequenceOf([
  multilineCommentMarker,
  optionalWhitespace,
  multilineCommentText,
  multilineCommentClose
]).map(([marker, whitespace, text, close]) => `/*\n${text}*/`);

