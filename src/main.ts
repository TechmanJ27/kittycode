import fs, { mkdirSync, readFileSync } from 'fs';
import path from 'path';

export function getKittyConfig() {
  const jsonConfig = readFileSync('./kittyconfig.json', 'utf-8');
  return JSON.parse(jsonConfig);
}

export function* readAllFiles(dir: string): Generator<string> {
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    if (getKittyConfig().compilerOptions.exclude.includes(''))
    if (file.isDirectory()) {
      yield* readAllFiles(path.join(dir, file.name));
    } else {
      yield path.join(dir, file.name);
    }
  }
}

for (const file of readAllFiles('./kittycode/')) {
  if (path.extname(file) === '.myaw') {
    const raw = readFileSync(file);
    const dirName = path.dirname(file);
    mkdirSync(dirName);

  }
}