import { Command } from 'commander';
const program = new Command();
import {compileKittyCode} from 'main.js';

program
  .name('meowcode')
  .description('CLI for Meowcode')
  .version('0.8.0');

program.command('compile')
  .description('Compile the .myaw files from the configured folder to .js files')
  .action((str, options) => {
    compileKittyCode();
    console.log('KittyCode Compiled Successfully');
  });

program.parse();
