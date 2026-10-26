import { Parser } from 'arcsecond';

export class KittyError extends Error {
  constructor(message: string, public index: number) { super(message); }
}

export const expect = <T>(p: Parser<T>, msg: string) =>
  p.errorMap(({ index }): string => { throw new KittyError(msg, index); });

export function formatError(err: KittyError, source: string, file: string) {
  const before = source.slice(0, err.index);
  const line = before.split('\n').length;
  const col = err.index - (before.lastIndexOf('\n') + 1) + 1;
  return `${file}:${line}:${col} - ${err.message}`;
}