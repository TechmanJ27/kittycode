import { str, optionalWhitespace, sequenceOf, regex } from 'arcsecond';

export const commentMarker = str('Nya!');
const commentText = regex(/^[\s\S]*?(?=~)/);

export const commentParser = sequenceOf([
  commentMarker,
  optionalWhitespace,
  commentText
]).map(([marker, whitespace, text]) => `\\\\${text}`);

export const multilineCommentMarker = str('Nya~');

export const multilineCommentText = regex(/^[\s\S]*?(?=~)/); 

export const multilineCommentParser = sequenceOf([
  multilineCommentMarker,
  optionalWhitespace,
  multilineCommentText
]).map(([marker, whitespace, text]) => `/*\n${text}\n*/`);

