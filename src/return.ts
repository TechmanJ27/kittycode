import { str, char, choice } from 'arcsecond';
import { value, identifier } from './main.js';
import {expect} from './errors.js';

export const returnStatement = str('laser').chain(() =>
  expect(char('('), "Expected '(' after 'laser'").chain(() =>
  expect(choice([value, identifier]), "Expected a value or variable inside laser( )").chain(v =>
  expect(char(')'), "Missing closing ')' in laser(...)").map(() => `return ${v};`))));
