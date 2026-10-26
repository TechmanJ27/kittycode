import { Command } from 'commander';
const program = new Command();
import compileKittyCode from './main.js';
program
    .name('kittycode')
    .description('CLI for KittyCode')
    .version('0.8.0');
program.command('compile')
    .description('Compile the .myaw files from the configured folder to .js files')
    .action(() => {
    if (compileKittyCode())
        console.log('KittyCode Compiled Successfully');
    else {
        console.error('Compilation failed.');
        process.exitCode = 1;
    }
});
program.parse();
//# sourceMappingURL=compiler.js.map