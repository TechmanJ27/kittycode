import { str, char, choice } from 'arcsecond';
import { value, identifier } from './main.js';
import {expect} from './errors.js';

export const returnStatement = str('gbt').chain(() =>
  expect(char('('), "Expected '(' after 'gbt'").chain(() =>
  expect(choice([value, identifier]), "Expected a value or variable inside gbt( )").chain(v =>
  expect(char(')'), "Missing closing ')' in gbt(...)").map(() => `return ${v};`))));
