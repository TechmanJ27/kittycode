import { Command } from 'commander';
const program = new Command();

program
  .name('meowcode')
  .description('CLI for Meowcode')
  .version('0.8.0');

program.command('compile')
  .description('Compile the .myaw files from the configured folder to .js files')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();