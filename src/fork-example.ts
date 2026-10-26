import { str } from 'arcsecond';

const fullParser = str('hello');

const myResult = fullParser.fork(
  // The string to parse
  'goodbye',

  // An error handler
  (error,) => {
    // Here we can throw the error...
    throw new Error(error);
  },

  // A success handler
  (result) => {
    console.log(`The final result: ${result}`);
    return result;
  },
);

console.log(myResult);