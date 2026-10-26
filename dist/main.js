import fs, { mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { choice, digit, char, many, optionalWhitespace, regex, sequenceOf, endOfInput, recursiveParser, str, Parser } from 'arcsecond';
import { variableParser } from './variables.js';
import { returnStatement } from './return.js';
import { commentParser, multilineCommentParser } from './comments.js';
import { ifStatementParser } from './ifStatements.js';
import { expect, KittyError, formatError } from './errors.js';
export const identifier = regex(/^[a-zA-Z_][a-zA-Z0-9_]*/);
export const value = recursiveParser(() => choice([
    digit,
    sequenceOf([
        char('\''),
        regex(/^[^']*/),
        char('\''),
    ]).map(([_, text]) => `'${text}'`),
]));
export const comparisonOperator = choice([
    str('=='),
    str('!='),
    str('>='),
    str('<='),
    char('>'),
    char('<'),
]);
export const logicalOperator = choice([
    str('and'),
    str('or'),
]);
export const statement = choice([
    variableParser,
    returnStatement,
    commentParser,
    multilineCommentParser,
    ifStatementParser
]);
export const statements = recursiveParser(() => many(statement));
const fileParser = many(sequenceOf([
    optionalWhitespace,
    statement,
    optionalWhitespace
]).map(([_, stmt]) => stmt)).map(statements => statements.join('\n'));
const program = sequenceOf([
    fileParser,
    optionalWhitespace,
    expect(endOfInput, "Unrecognized statement"),
]).map(([code]) => code);
export function getKittyConfig() {
    const jsonConfig = readFileSync('./kittyconfig.json', 'utf-8');
    return JSON.parse(jsonConfig);
}
export const kittyConfig = getKittyConfig().compilerOptions;
export function* readAllFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        const resPath = path.join(dir, file.name);
        if (kittyConfig?.outDir && resPath.includes(kittyConfig.outDir))
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
    const excludeList = kittyConfig?.exclude ?? [];
    let failed = 0;
    const projectRoot = process.cwd();
    const rootDirAbs = path.resolve(projectRoot, kittyConfig?.rootDir ?? './src');
    const outDirAbs = path.resolve(projectRoot, kittyConfig?.outDir ?? './dist');
    for (const file of readAllFiles(rootDirAbs)) {
        if (excludeList.includes(file))
            continue;
        if (path.extname(file) === '.myaw') {
            const raw = readFileSync(file, 'utf-8');
            const relativeToRoot = path.relative(rootDirAbs, path.dirname(file));
            const dirName = path.resolve(outDirAbs, relativeToRoot);
            const result = kittyCodeParse(raw, file);
            if (!result.ok) {
                console.error(result.message);
                failed++;
                continue;
            }
            mkdirSync(dirName, { recursive: true });
            const outputFileName = path.basename(file, '.myaw') + '.js';
            const destination = path.join(dirName, outputFileName);
            try {
                writeFileSync(destination, result.code, 'utf-8');
            }
            catch (err) {
                console.error(`Failed to write to ${destination}:`, err);
            }
            return failed === 0;
        }
    }
}
export function kittyCodeParse(raw, file = '<input>') {
    try {
        return program.fork(raw, (errorMsg) => ({ ok: false, message: `${file} - ${errorMsg}` }), (code) => ({ ok: true, code }));
    }
    catch (err) {
        if (err instanceof KittyError)
            return { ok: false, message: formatError(err, raw, file) };
        throw err;
    }
}
//# sourceMappingURL=main.js.map