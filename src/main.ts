import fs, { mkdirSync, readFileSync } from 'fs';
import path from 'path';
import {choice, digit, char, letters, sequenceOf} from 'arcsecond';

export const value = choice([
  digit,
  sequenceOf([
    char('\''),
    letters,
    char('\''), 
  ]),
])

export function getKittyConfig() {
  const jsonConfig = readFileSync('./kittyconfig.json', 'utf-8');
  return JSON.parse(jsonConfig);
}

export const kittyConfig = getKittyConfig().compilerOptions;

export function* readAllFiles(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

export default function compileKittyCode() {
  for (const file of readAllFiles(kittyConfig.rootDir ?? process.cwd())) {
    if (getKittyConfig().compilerOptions.exclude.includes(file)) continue;
    if (path.extname(file) === '.myaw') {
      const raw = readFileSync(file);
      const dirName = path.resolve(path.dirname(file), kittyConfig.outDir);
      const content = kittyCodeParse(raw);
      mkdirSync(dirName);
        fs.writeFile(path.join(dirName, file), content, err => {
        if (err) {
          console.error(err);
        }});
    }
  }
}

export function kittyCodeParse(raw) {
  
}
