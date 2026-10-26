import fs, { mkdirSync, readFileSync } from 'fs';
import path from 'path';
import { choice, digit, char, letters, sequenceOf, many, optionalWhitespace } from 'arcsecond';
import { variableParser } from './varParser.js';
import { returnStatement } from './returnParser.js';
export const value = choice([
    digit,
    sequenceOf([
        char('\''),
        letters,
        char('\''),
    ]),
]);
const statement = choice([
    variableParser,
    returnStatement
]);
const fileParser = many(sequenceOf([
    optionalWhitespace,
    statement,
    optionalWhitespace
]).map(([_, stmt]) => stmt)).map(statements => statements.join('\n'));
export function getKittyConfig() {
    const jsonConfig = readFileSync('./kittyconfig.json', 'utf-8');
    return JSON.parse(jsonConfig);
}
export const kittyConfig = getKittyConfig().compilerOptions;
export function* readAllFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const resPath = path.join(dir, file.name);
        if (kittyConfig.outDir && resPath.includes(kittyConfig.outDir))
            continue;
        if (file.isDirectory()) {
            yield* readAllFiles(resPath);
        }
        else {
            yield resPath;
        }
    }
}
export default function compileKittyCode() {
    for (const file of readAllFiles(kittyConfig.rootDir ?? process.cwd())) {
        if (getKittyConfig().compilerOptions.exclude?.includes(file))
            continue;
        if (path.extname(file) === '.myaw') {
            const raw = readFileSync(file, 'utf-8');
            const dirName = path.resolve(path.dirname(file), kittyConfig.outDir ?? './dist');
            mkdirSync(dirName, { recursive: true });
            const content = kittyCodeParse(raw);
            const outputFileName = path.basename(file, '.myaw') + '.js';
            const destination = path.join(dirName, outputFileName);
            fs.writeFile(destination, content, err => {
                if (err) {
                    console.error(`Failed to write to ${destination}:`, err);
                }
            });
        }
    }
}
export function kittyCodeParse(raw) {
    return fileParser.fork(raw, (errorMsg, parsingState) => {
        console.error("Compilation Error:\n", errorMsg);
        console.error("State at failure:\n", parsingState);
        return `/* Compilation failed due to parsing error */`;
    }, (result) => {
        return result;
    });
}
//# sourceMappingURL=main.js.map